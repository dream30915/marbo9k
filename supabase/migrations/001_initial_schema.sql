-- Marbo9k E-Commerce: ตารางและ Storage เริ่มต้น
-- รันใน Supabase Dashboard → SQL Editor หรือใช้ Supabase CLI

-- ปิด RLS ชั่วคราวสำหรับสร้างตาราง (จะเปิดทีละตาราง)
-- หมายเหตุ: ใน production ควรใช้ service_role หรือ migration ที่มีสิทธิ์

-- 1. profiles (id ใช้ร่วมกับ auth.users ได้เมื่อเปิด Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT,
  line_user_id TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_line_user_id ON public.profiles(line_user_id);

-- 2. products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- 3. orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  line_user_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_line_user_id ON public.orders(line_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 4. order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- 5. updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'products_updated_at') THEN
    CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'orders_updated_at') THEN
    CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_updated_at') THEN
    CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- 6. RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- products: อ่านได้ทุกคน แก้เฉพาะ service (หรือใช้ service_role ใน Admin)
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Products are insertable by authenticated or service" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Products are updatable by authenticated or service" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Products are deletable by authenticated or service" ON public.products FOR DELETE USING (true);

-- orders: ผู้ใช้เห็นเฉพาะออเดอร์ของตัวเอง (หรือใช้ line_user_id ตรวจจาก JWT/custom claim)
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR true);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders updatable by service" ON public.orders FOR UPDATE USING (true);

-- order_items: อ่านได้ผ่าน order
CREATE POLICY "Order items viewable with order" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Order items insertable" ON public.order_items FOR INSERT WITH CHECK (true);

-- profiles
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles updatable by all" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Profiles insertable by all" ON public.profiles FOR INSERT WITH CHECK (true);

-- 7. Storage bucket สำหรับรูปสินค้า (รันใน Dashboard → Storage หรือใช้ API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);
-- storage.objects: policy ให้ public อ่าน products bucket ได้

COMMENT ON TABLE public.products IS 'สินค้าในร้าน';
COMMENT ON TABLE public.orders IS 'คำสั่งซื้อ';
COMMENT ON TABLE public.order_items IS 'รายการในคำสั่งซื้อ';
