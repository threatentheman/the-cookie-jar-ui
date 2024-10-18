import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// This function will fetch the user profile from MongoDB based on the user's uid
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');  // Get uid from query params

    if (!uid) {
      return NextResponse.json({ error: 'User ID (uid) is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('userProfile');  // Use your MongoDB database name

    const userProfile = await db.collection('users').findOne({ uid });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile.' }, { status: 500 });
  }
}
