#!/usr/bin/env node
/**
 * สร้างและตั้งค่า Rich Menu บน LINE
 * ใช้: LINE_CHANNEL_ACCESS_TOKEN=xxx node scripts/line-rich-menu.js [path-to-image.png]
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

function getToken() {
  if (process.env.LINE_CHANNEL_ACCESS_TOKEN) return process.env.LINE_CHANNEL_ACCESS_TOKEN.replace(/^["']|["']$/g, "");
  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    const m = content.match(/LINE_CHANNEL_ACCESS_TOKEN\s*=\s*(\S+)/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return null;
}
const token = getToken();
const richMenuJsonPath = path.join(__dirname, "..", "line", "rich-menu.json");

if (!token) {
  console.error("ใส่ LINE_CHANNEL_ACCESS_TOKEN ใน env");
  process.exit(1);
}

const LIFF_BASE = process.env.LIFF_BASE_URL || "https://marbo9k-supermax.vercel.app";
const richMenuBody = JSON.parse(fs.readFileSync(richMenuJsonPath, "utf8"));
richMenuBody.areas.forEach((a) => {
  if (a.action.type === "uri" && a.action.uri) {
    const u = new URL(a.action.uri);
    u.host = new URL(LIFF_BASE).host;
    u.protocol = new URL(LIFF_BASE).protocol;
    a.action.uri = u.toString();
  }
});

function request(method, pathname, body, contentType) {
  return new Promise((resolve, reject) => {
    if (!contentType) contentType = "application/json";
    const opts = {
      hostname: pathname.startsWith("/v2/bot/richmenu/") && pathname.endsWith("/content") ? "api-data.line.me" : "api.line.me",
      path: pathname,
      method,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    if (body) {
      if (Buffer.isBuffer(body)) {
        opts.headers["Content-Type"] = contentType || "image/png";
        opts.headers["Content-Length"] = body.length;
      } else {
        body = JSON.stringify(body);
        opts.headers["Content-Type"] = "application/json";
        opts.headers["Content-Length"] = Buffer.byteLength(body);
      }
    }
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          console.error(`Error ${res.statusCode} on ${pathname}: ${data}`);
          reject(new Error(res.statusCode + " " + data));
        }
        else resolve(data ? JSON.parse(data) : {});
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  const imagePath = process.argv[2];
  console.log("กำลังสร้าง Rich Menu...");
  const create = await request("POST", "/v2/bot/richmenu", richMenuBody);
  const richMenuId = create.richMenuId;
  console.log("Rich Menu ID:", richMenuId);

  if (imagePath && fs.existsSync(imagePath)) {
    console.log("กำลังอัปโหลดรูป...");
    const image = fs.readFileSync(imagePath);
    const ct = path.extname(imagePath).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
    await request("POST", "/v2/bot/richmenu/" + richMenuId + "/content", image, ct);
    console.log("อัปโหลดรูปเรียบร้อย");
  }

  console.log("กำลังตั้งเป็น Rich Menu หลัก...");
  await request("POST", "/v2/bot/user/all/richmenu", { richMenuId });
  console.log("เสร็จแล้ว");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
