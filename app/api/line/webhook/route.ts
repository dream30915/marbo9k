import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

function verifySignature(body: string, signature: string | null): boolean {
  if (!CHANNEL_SECRET || !signature) return false;
  const hash = crypto
    .createHmac("sha256", CHANNEL_SECRET)
    .update(body)
    .digest("base64");
  return hash === signature;
}

async function replyMessage(replyToken: string, text: string) {
  if (!CHANNEL_ACCESS_TOKEN) return;
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-line-signature");
    if (CHANNEL_SECRET && !verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    const body = JSON.parse(rawBody);
    const events = body.events || [];
    for (const event of events) {
      if (event.type === "follow") {
        await replyMessage(
          event.replyToken,
          "สวัสดีครับ ยินดีต้อนรับสู่ Marbo9k 🛒\nกดเมนูล่างเพื่อเข้าหน้าร้านได้เลย"
        );
      } else if (event.type === "message" && event.message?.type === "text") {
        const text = (event.message.text || "").trim();
        const lineUserId = event.source.userId;

        if (text === "ดูออเดอร์ของฉัน" || text === "ออเดอร์") {
          const liffUrl = `https://liff.line.me/${process.env.NEXT_PUBLIC_LIFF_ID}/orders`;
          await replyMessage(
            event.replyToken,
            `คุณสามารถดูรายการสั่งซื้อของคุณได้ที่นี่ครับ:\n${liffUrl}`
          );
        } else if (text === "ติดต่อเรา") {
          await replyMessage(
            event.replyToken,
            "ติดต่อเราได้ที่ LINE OA นี้เลยครับ"
          );
        } else {
          await replyMessage(
            event.replyToken,
            "สวัสดีครับ 😊\nกดเมนู \"หน้าร้าน\" เพื่อเข้าชมสินค้าได้เลย"
          );
        }
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
