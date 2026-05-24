import { startChat } from "@/lib/google-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const chat = startChat(); // ✅ now valid

  const result = await chat.sendMessage(prompt);

  const responseText = result.response.text();

  return NextResponse.json({ text: responseText });
}