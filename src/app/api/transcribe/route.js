// src/app/transcribe/route.js
import { getAuth } from "firebase/auth";

export async function POST(req) {
  const body = await req.json();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = await user.getIdToken();

  try {
    const response = await fetch("http://localhost:8000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send Firebase token
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `Failed to transcribe: ${errorText}` }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in route handler:", error);
    return new Response(
      JSON.stringify({ error: "Server error occurred during transcription" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
