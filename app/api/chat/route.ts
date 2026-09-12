import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    // Direct Integration Endpoint for Python Backend Logic
    return NextResponse.json({
      status: 'success',
      message: 'Asaan Qanoon AI Engine Connected',
      query: query,
      response: `Asaan Qanoon Response for: ${query}`,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to process AI query' },
      { status: 500 }
    );
  }
}