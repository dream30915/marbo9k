#!/usr/bin/env node
/**
 * สร้าง repo บน GitHub (ถ้ายังไม่มี) แล้ว push โค้ดขึ้นไป
 * ใช้: สร้าง GitHub Personal Access Token แล้วรัน
 *   GITHUB_TOKEN=ghp_xxx node scripts/create-repo-and-push.js
 * หรือใส่ GITHUB_TOKEN ใน .env.local แล้วรัน
 *   node scripts/create-repo-and-push.js
 */

const https = require('https');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const REPO_NAME = 'marbo9k';
const GITHUB_USER = 'dream30915';

function getToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const m = content.match(/GITHUB_TOKEN\s*=\s*(\S+)/);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  return null;
}

function createRepo(token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      name: REPO_NAME,
      private: false,
      description: 'Marbo9k E-Commerce - Next.js + LINE LIFF + Supabase',
    });
    const opts = {
      hostname: 'api.github.com',
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'marbo9k-setup',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else if (res.statusCode === 422) {
          try {
            const j = JSON.parse(data);
            if (j.message && j.message.includes('name already exists')) {
              resolve({ full_name: `${GITHUB_USER}/${REPO_NAME}` });
              return;
            }
          } catch (_) {}
          reject(new Error(data || `HTTP ${res.statusCode}`));
        } else {
          reject(new Error(data || `HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const token = getToken();
  if (!token) {
    console.log(`
ยังไม่มี GitHub Token — ทำแค่ครั้งเดียว:

1. เปิด: https://github.com/settings/tokens/new
   - Note: marbo9k-deploy
   - เลือก scope: repo (ติ๊กช่อง repo)
   - กด Generate token แล้ว copy

2. รันคำสั่งนี้ (ใส่ token แทน ghp_xxxx):
   GITHUB_TOKEN=ghp_xxxx node scripts/create-repo-and-push.js

   หรือใส่ใน .env.local บรรทัดเดียว:
   GITHUB_TOKEN=ghp_xxxx
   แล้วรัน: node scripts/create-repo-and-push.js
`);
    process.exit(1);
  }

  const repoRoot = path.join(__dirname, '..');
  process.chdir(repoRoot);

  try {
    console.log('กำลังสร้าง repo บน GitHub...');
    await createRepo(token);
    console.log(`Repo https://github.com/${GITHUB_USER}/${REPO_NAME} พร้อมแล้ว`);
  } catch (e) {
    console.error('สร้าง repo ไม่ได้:', e.message);
    process.exit(1);
  }

  try {
    console.log('กำลัง push โค้ด...');
    execSync('git push -u origin main', { stdio: 'inherit', cwd: repoRoot });
    console.log('\nเสร็จแล้ว ไปที่ https://vercel.com/new แล้ว Import repo marbo9k ได้เลย');
  } catch (_) {
    process.exit(1);
  }
}

main();
