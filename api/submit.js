import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    // 🔥 HARD CODE TEST DATA
    await sheets.spreadsheets.values.append({
      spreadsheetId: "1hoMj-g6dESp9HJr23VawUHDcC1sikqale482f_G9XY8",
      range: "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          "TEST",
          "TEST",
          "TEST",
          "TEST",
          1,2,3,4,5,6
        ]]
      }
    });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
