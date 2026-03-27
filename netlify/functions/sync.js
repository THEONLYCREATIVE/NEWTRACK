// Netlify Function — Cloud Sync via Netlify Blobs
// This stores/retrieves your tracker data in Netlify's built-in database

const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  try {
    const store = getStore("tracker-data");

    // LOAD data
    if (event.httpMethod === "GET") {
      const data = await store.get("main", { type: "json" });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || {}),
      };
    }

    // SAVE data
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);
      if (body.action === "save" && body.data) {
        // Add timestamp
        body.data._lastSync = new Date().toISOString();
        await store.setJSON("main", body.data);

        // Also save a dated backup
        const dateKey = new Date().toISOString().split("T")[0];
        await store.setJSON("backup-" + dateKey, body.data);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ ok: true, synced: body.data._lastSync }),
        };
      }
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid action" }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (err) {
    console.error("Sync error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server error", message: err.message }),
    };
  }
};
