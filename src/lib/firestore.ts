import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { Journey } from '../types/journey';

// Journey Functions
export const createJourney = async (
  userId: string,
  userEmail: string,
  data: Omit<Journey, 'id' | 'userId' | 'createdAt' | 'likes' | 'entries'>
) => {
  return addDoc(collection(db, 'journeys'), {
    ...data,
    userId,
    userEmail,
    createdAt: Timestamp.now(),
    likes: [],
    entries: []
  });
};

// Comment Functions
export const createComment = async (
  journeyId: string,
  userId: string,
  userEmail: string,
  text: string
) => {
  return addDoc(collection(db, 'comments'), {
    journeyId,
    userId,
    userEmail,
    text,
    createdAt: Timestamp.now()
  });
};