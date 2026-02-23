# Deploy ออนไลน์ (ทำครั้งเดียว)

## 1. สร้าง GitHub Token (ครั้งเดียว)

- เปิด: **https://github.com/settings/tokens/new**
- **Note:** `marbo9k-deploy`
- ติ๊ก scope: **repo**
- กด **Generate token** แล้ว copy (เก็บไว้ที่ปลอดภัย)

## 2. รันคำสั่งเดียว

ในโฟลเดอร์โปรเจกต์ รัน (แทน `ghp_xxxx` ด้วย token ที่ copy):

```bash
GITHUB_TOKEN=ghp_xxxx npm run deploy:github
```

หรือใส่ใน `.env.local` บรรทัดเดียว `GITHUB_TOKEN=ghp_xxxx` แล้วรัน:

```bash
npm run deploy:github
```

สคริปต์จะสร้าง repo **marbo9k** บน GitHub (ถ้ายังไม่มี) แล้ว push โค้ดให้เอง

## 3. Deploy บน Vercel

- ไปที่ **https://vercel.com/new**
- ในรายการ Import เลือก **marbo9k** → กด **Import** → **Deploy**
- ได้ลิงก์เว็บออนไลน์แล้ว
