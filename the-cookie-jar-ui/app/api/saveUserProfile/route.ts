import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, name, email, riskAppetite, bookmakers } = body;

    // Ensure the required fields are provided
    if (!uid || !email) {
      return NextResponse.json({ error: 'User ID (uid) and email are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('userProfile');

    const userData = {
      uid,
      name,
      email,
      riskAppetite,
      bookmakers,
      updatedAt: new Date(),
    };

    // Try to upsert the user profile based on the email (to prevent duplicate emails)
    const result = await db.collection('users').updateOne(
      { email },  // Use email to ensure uniqueness
      {
        $set: userData,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'User data saved successfully!' }, { status: 200 });
  } catch (error) {
    if (error.code === 11000) { // Duplicate email error (MongoDB error code for unique index violation)
      return NextResponse.json({ error: 'Email already exists.' }, { status: 400 });
    }
    console.error('Error saving user data:', error);
    return NextResponse.json({ error: 'Failed to save user data.' }, { status: 500 });
  }
}
