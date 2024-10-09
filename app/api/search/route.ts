import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/query?text=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: error });
  }
}

export async function GET() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: error });
  }
}
