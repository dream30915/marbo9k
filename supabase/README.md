# Supabase

## วิธีรัน Migration

1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard) → โปรเจกต์ของคุณ
2. เปิด **SQL Editor** → New query
3. Copy เนื้อหาจาก `migrations/001_initial_schema.sql` ไปวาง แล้วกด Run

## Storage (รูปสินค้า)

หลังรัน migration แล้ว สร้าง bucket สำหรับรูปสินค้า:

1. ไปที่ **Storage** ใน Dashboard
2. New bucket → ชื่อ `products` → Public bucket ติ๊กเปิด (เพื่อให้เข้าถึงรูปจาก URL ได้)
3. ใน Policy ให้เพิ่ม policy อ่าน public: `SELECT` สำหรับ everyone (หรือใช้ policy ที่ Supabase แนะนำสำหรับ public bucket)
