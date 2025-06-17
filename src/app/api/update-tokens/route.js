import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, coins } = await req.json();

    if (!userId || !coins) {
      return NextResponse.json({ error: 'Missing userId or coins' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentTokens = userSnap.data().tokens || 0;
    const newTokenCount = currentTokens + parseInt(coins, 10);

    await updateDoc(userRef, { tokens: newTokenCount });

    return NextResponse.json({ success: true, tokens: newTokenCount });
  } catch (error) {
    console.error('Token update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
