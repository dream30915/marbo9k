#!/usr/bin/env node
/**
 * เพิ่มสินค้าตัวอย่างลง Supabase
 * ใช้: node scripts/seed-products.js
 * ต้องมี NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY ใน .env.local
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  content.split("\n").forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("ใส่ NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY ใน .env.local");
  process.exit(1);
}

const products = [
  { name: "สินค้าตัวอย่าง 1", description: "คำอธิบายสินค้า", price: 99, stock: 10 },
  { name: "สินค้าตัวอย่าง 2", description: "สินค้าคุณภาพ", price: 199, stock: 5 },
  { name: "สินค้าตัวอย่าง 3", description: "ขายดี", price: 299, stock: 20 },
];

function insertProduct(product) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(product);
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + "/rest/v1/products",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: "Bearer " + key,
        Prefer: "return=minimal",
      },
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode >= 400) reject(new Error(res.statusCode + " " + data));
        else resolve();
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  for (const p of products) {
    await insertProduct(p);
    console.log("เพิ่ม:", p.name);
  }
  console.log("เสร็จแล้ว");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
