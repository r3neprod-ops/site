import { NextResponse } from 'next/server';
import { getComplexCards } from '../../../src/lib/getComplexCards.mjs';

export async function GET() {
  try {
    const cards = await getComplexCards();
    return NextResponse.json({ cards }, { headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate=43200' } });
  } catch (error) {
    return NextResponse.json({ cards: [], error: 'failed_to_load_complexes' }, { status: 200 });
  }
}
