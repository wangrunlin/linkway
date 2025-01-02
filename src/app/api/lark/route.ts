import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { endpoint, method = "GET", headers = {}, data } = body;

  try {
    const response = await fetch(`https://open.larksuite.com${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
