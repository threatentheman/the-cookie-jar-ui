import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';  // Assuming this is your MongoDB client setup

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get the data from the request body
    const { uid, name, email, riskAppetite, bookmakers } = body;

    if (!uid || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('userProfile');  // Use your MongoDB database name

    // Update user profile in the users collection
    const result = await db.collection('users').updateOne(
      { uid },  // Match by the user's unique Firebase UID
      {
        $set: {
          name,
          email,
          riskAppetite,
          bookmakers,
          updatedAt: new Date(),  // Update the timestamp
        },
      },
      { upsert: true }  // Insert if the user doesn't exist yet
    );

    return NextResponse.json({ message: 'User profile updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
  }
}
