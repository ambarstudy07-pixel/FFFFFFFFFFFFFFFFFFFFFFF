
import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = typeof req.body === "string" 
      ? JSON.parse(req.body) 
      : req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

await sheets.spreadsheets.values.append({
  spreadsheetId: "1hoMj-g6dESp9HJr23VawUHDcC1sikqale482f_G9XY8",
  range: "Sheet1",   // 🔥 remove !A1
  valueInputOption: "USER_ENTERED",
  insertDataOption: "INSERT_ROWS",
  requestBody: {
    values: [[
      body.date,
      body.agency,
      body.omc,
      body.dom_rec,
      body.dom_dis,
      body.com_rec,
      body.com_dis,
      body.ind_rec,
      body.ind_dis
    ]]
  }
});

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
