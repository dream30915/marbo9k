# Marbo9k E-Commerce

E-Commerce Web Application with LINE LIFF และ Admin Dashboard

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS, shadcn/ui
- **Backend/DB:** Supabase (PostgreSQL)
- **Integrations:** LINE LIFF, LINE Messaging API, Google Maps API
- **Deploy:** Vercel

## โครงสร้างโฟลเดอร์ (Step 1)

```
app/
├── (liff)/          # ฝั่งลูกค้า LIFF (มือถือ)
│   ├── layout.tsx
│   └── liff/
│       └── page.tsx   → /liff
├── (admin)/         # ระบบหลังบ้าน (เดสก์ท็อป)
│   ├── layout.tsx
│   └── admin/
│       └── page.tsx   → /admin
├── globals.css
├── layout.tsx       # Root layout
└── page.tsx         # หน้าแรก /
components/
├── ui/              # shadcn/ui (Button, Card)
lib/
└── utils.ts         # cn() สำหรับ Tailwind
```

## การรันโปรเจกต์

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) — หน้าแรกมีลิงก์ไป /liff และ /admin

## การ Deploy ให้รันออนไลน์ (Vercel)

1. **ใส่โปรเจกต์ใน Git และ push ขึ้น GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   สร้าง repo ใหม่บน [GitHub](https://github.com/new) (ไม่ต้องใส่ README/License) แล้วรัน:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy บน Vercel**
   - ไปที่ [vercel.com](https://vercel.com) แล้วลงชื่อเข้าใช้ (ใช้ GitHub ได้)
   - กด **Add New** → **Project** แล้วเลือก repo ของโปรเจกต์
   - กด **Deploy** (ใช้ค่าเริ่มต้นได้)
   - รอสักครู่ จะได้ URL เช่น `https://marbo9k-ecommerce-xxx.vercel.app`

3. **ตัวแปร Environment (ถ้ามี)**
   - ใน Vercel: โปรเจกต์ → **Settings** → **Environment Variables**
   - ใส่ค่าจาก `.env.local` (เช่น Supabase, LINE LIFF) แล้ว Redeploy

หมายเหตุ: ไฟล์ `.env.local` ไม่ถูก push ขึ้น Git — ต้องไปใส่ใน Vercel เอง

## ขั้นตอนถัดไป (Step 2)

- ตั้งค่า Supabase client
- สคริปต์ SQL สร้างตารางและ Storage
- ไฟล์ `.env.local` สำหรับ API Keys
