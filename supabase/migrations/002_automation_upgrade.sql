-- Migration 002: Automation & Logistics Upgrade

-- 1. เพิ่มฟิลด์ในตาราง orders เพื่อรองรับระบบอัตโนมัติ
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC(12,2) DEFAULT 0 CHECK (shipping_fee >= 0),
ADD COLUMN IF NOT EXISTS slip_url TEXT,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 2. เพิ่มฟิลด์ role ใน profiles เพื่อแยกสิทธิ์ Admin
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- 3. ตั้งค่า admin เริ่มต้น (ระบุ LINE User ID ของเจ้าของร้าน)
-- UPDATE public.profiles SET role = 'admin' WHERE line_user_id = 'YOUR_LINE_USER_ID';

-- 4. เปิด RLS สำหรับฟิลด์ใหม่ (Policies เดิมยังครอบคลุมอยู่ แต่อาจต้องปรับถ้าต้องการความปลอดภัยสูงขึ้น)
COMMENT ON COLUMN public.orders.shipping_fee IS 'ค่าจัดส่งสินค้า';
COMMENT ON COLUMN public.orders.slip_url IS 'URL รูปสลิปโอนเงินที่ตรวจพบจาก LINE';
COMMENT ON COLUMN public.orders.is_verified IS 'สถานะตรวจสอบสลิปอัตโนมัติสำเร็จ';
COMMENT ON COLUMN public.profiles.role IS 'ระดับสิทธิ์การใช้งาน (user/admin)';
