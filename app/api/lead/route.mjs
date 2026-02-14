import { NextResponse } from 'next/server';

export async function POST(req) {
  const payload = await req.json();
  console.log('NEW_LEAD', payload);
  return NextResponse.json({ ok: true });
}
