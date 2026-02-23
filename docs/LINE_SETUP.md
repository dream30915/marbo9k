# เชื่อม LINE OA และ LINE Developers

## 1. สร้าง LINE Official Account (OA)

1. ไปที่ [LINE Official Account Manager](https://manager.line.biz/)
2. สมัคร/ลงชื่อเข้าใช้ → สร้าง **Provider** (ถ้ายังไม่มี)
3. สร้าง **Channel** ประเภท **Messaging API**
4. กรอกชื่อช่อง (เช่น Marbo9k), หมวดหมู่, คำอธิบาย
5. หลังสร้างเสร็จ จะได้ **Channel ID** — เก็บไว้

## 2. ตั้งค่า LINE Developers (Channel เดียวกัน)

1. ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
2. เลือก Provider แล้วเลือก Channel ที่สร้าง (Marbo9k)
3. แท็บ **Basic settings**:
   - Copy **Channel ID**, **Channel secret**
4. แท็บ **Messaging API**:
   - ออก **Channel access token** (ระยะยาว) → copy เก็บไว้
   - ใส่ **Webhook URL** ถ้าจะใช้รับเหตุการณ์ (ถ้ามี backend): `https://your-domain.com/api/line/webhook`
   - ปิด **Auto-reply** / เปิด **Webhook** ตามต้องการ

## 3. เพิ่ม LIFF App (ให้ลูกค้าเปิดหน้าร้านใน LINE ได้)

1. ใน Channel เดียวกัน → แท็บ **LIFF**
2. กด **Add** สร้าง LIFF app
   - **LIFF app name:** Marbo9k Shop
   - **Size:** Full
   - **Endpoint URL:** `https://marbo9k.vercel.app/liff` (หรือโดเมนที่ deploy จริง)
   - **Scope:** ติ๊ก `profile` ถ้าต้องใช้ชื่อ/รูป
   - **Optional:** เปิด Scan QR ถ้าต้องการ
3. กด **Create** → ได้ **LIFF ID** (ตัวเลขยาว)

## 4. ใส่ค่าในโปรเจกต์

ใน **.env.local** (และใน Vercel → Settings → Environment Variables):

```
NEXT_PUBLIC_LIFF_ID=1234567890-xxxxxxxx
LINE_CHANNEL_ACCESS_TOKEN=xxxx
LINE_CHANNEL_SECRET=xxxx
```

- `NEXT_PUBLIC_LIFF_ID` = LIFF ID จากขั้นตอนที่ 3  
- `LINE_CHANNEL_ACCESS_TOKEN` = Channel access token (Messaging API)  
- `LINE_CHANNEL_SECRET` = Channel secret  

จากนั้น Redeploy เพื่อให้ env มีผล

## 5. อัปโหลด Rich Menu

รันสคริปต์ (ใส่ token จริง):

```bash
LINE_CHANNEL_ACCESS_TOKEN=xxxx node scripts/line-rich-menu.js
```

หรือดูขั้นตอนใน `line/RICH_MENU_DESIGN.md` แล้วอัปโหลดผ่าน LINE Developers Console เองก็ได้
