import { NextResponse } from 'next/server'; // Use NextResponse for handling responses
import clientPromise from '../../../lib/mongodb';  // Update your path to match your folder structure

export async function GET() {   // Using HTTP GET method for testing connection
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();

    return NextResponse.json({ message: 'Connection successful', collections });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
