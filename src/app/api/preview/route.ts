import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Get meta image
    const image = $('meta[property="og:image"]').attr('content') ||
                 $('meta[name="twitter:image"]').attr('content') ||
                 $('meta[name="image"]').attr('content');

    // Get meta description
    const description = $('meta[property="og:description"]').attr('content') ||
                       $('meta[name="description"]').attr('content') ||
                       $('meta[name="twitter:description"]').attr('content');

    return NextResponse.json({
      image,
      description: description?.slice(0, 200) // Limit description length
    });
  } catch (error) {
    console.error('Error fetching preview:', error);
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 });
  }
}
