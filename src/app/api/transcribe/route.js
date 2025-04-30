// src/app/transcribe/route.js
export async function POST(req) {
  const body = await req.json();

  try {
    const response = await fetch("http://localhost:8000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `Failed to transcribe: ${errorText}` }), 
        { 
          status: response.status, 
          headers: { "Content-Type": "application/json" } 
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
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}