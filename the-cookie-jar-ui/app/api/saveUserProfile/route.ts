import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, name, email, phone, riskAppetite, bookmakers } = body;

    if (!uid) {
      return NextResponse.json({ error: 'User ID (uid) is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('userProfile');

    const userData = {
      uid,
      name,
      email,
      phone,
      riskAppetite,
      bookmakers,
      updatedAt: new Date(),
    };

    // Upsert user data into the 'users' collection
    await db.collection('users').updateOne(
      { uid },
      {
        $set: userData,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'User data saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ error: 'Failed to save user data.' }, { status: 500 });
  }
}
