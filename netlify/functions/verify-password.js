
exports.handler = async function(event, context) {
  const { password } = JSON.parse(event.body || "{}");
  const VALID_PASSWORD = "trinos5058";

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
