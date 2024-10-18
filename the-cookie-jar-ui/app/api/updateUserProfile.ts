// pages/api/updateUserProfile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { getAuth } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const auth = getAuth();
  const { uid, name, email, number, riskAppetite, bookmakers, password } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'User ID (uid) is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const userData = {
      name,
      email,
      number,
      riskAppetite,
      bookmakers,
      updatedAt: new Date(),
    };

    // Update user data in MongoDB
    await db.collection('users').updateOne({ uid }, { $set: userData });

    // Update password if provided
    if (password) {
      await auth.updateUser(uid, { password });
    }

    res.status(200).json({ message: 'User profile updated successfully!' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile.' });
  }
}
