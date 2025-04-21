import { NextResponse } from 'next/server';

type AirtableErrorResponse = {
  error?: {
    message?: string;
    type?: string;
  };
  status?: number;
  details?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, message } = body;

    console.log('Received form submission:', {
      name,
      email,
      messageLength: message?.length,
      baseId: process.env.AIRTABLE_BASE_ID,
      hasToken: !!process.env.AIRTABLE_API_KEY,
    });

    // Validate the required fields
    if (!name || !email || !message) {
      console.log('Validation failed:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Create a record in Airtable using REST API
    console.log('Attempting to create Airtable record...');

    const tableId = 'tblvZkFO42TMoEC5j';
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableId}`;
    console.log('Airtable URL:', url);

    // Format date as YYYY-MM-DD
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Full Name': name,
              Email: email,
              Message: message,
              'Submitted At': formattedDate,
            },
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      throw new Error(data.error?.message || 'Failed to create record');
    }

    console.log('Airtable record created successfully:', data);
    return NextResponse.json({ success: true, record: data.records[0] });
  } catch (error: unknown) {
    const airtableError = error as AirtableErrorResponse;
    console.error('Detailed error:', {
      message: airtableError?.message || 'Unknown error',
      type: airtableError?.error?.type,
      status: airtableError?.status,
      details: airtableError?.details || 'No additional details',
      error,
    });

    return NextResponse.json(
      {
        error: airtableError?.message || 'An error occurred while submitting the form',
        details: airtableError?.details,
      },
      { status: 500 }
    );
  }
}
