const https = require('https');

exports.handler = async function(event, context) {
  const { password } = JSON.parse(event.body || "{}");
  const VALID_PASSWORD = "trinos5058";

  const ip = event.headers['x-forwarded-for'] || "unknown";
  const timestamp = new Date().toISOString();

  // ✅ 실제 Google Sheets Web App URL
  const webhookUrl = "https://script.google.com/a/macros/swonlaw.com/s/AKfycbwPJYBZWqZbUASnl4cCDf8Lm0qSRgeM6zb5u1ex3YT-J88ROdriVj9xy7Qk1HBBbFKjSQ/exec";
  const logData = JSON.stringify({ ip, timestamp });

  // ✅ Google Sheets로 IP + 시간 전송
  const req = https.request(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': logData.length
    }
  });

  req.on('error', error => {
    console.error("❌ Error logging to Google Sheets:", error);
  });

  req.write(logData);
  req.end();

  // ✅ 비밀번호 확인
  if (password === VALID_PASSWORD) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }
};
