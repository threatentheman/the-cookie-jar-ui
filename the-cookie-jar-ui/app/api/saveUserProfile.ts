import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const { uid, name, email, phone, riskAppetite, bookmakers } = req.body;

  if (!uid) {
    res.status(400).json({ error: 'User ID (uid) is required' });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('userProfile');  // Specify the database name here

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

    res.status(200).json({ message: 'User data saved successfully!' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Failed to save user data.' });
  }
}
