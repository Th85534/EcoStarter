/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from './authStore';

interface UserProfile {
  displayName: string;
  bio: string;
  location: string;
  interests: string[];
  profileImage: string;
  coverImage: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  updateProfile: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      const userRef = doc(db, 'users', user.uid);
      
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        await updateDoc(userRef, data);
      } else {
        await setDoc(userRef, data);
      }
      
      set(state => ({
        profile: state.profile ? { ...state.profile, ...data } : data as UserProfile
      }));
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error updating profile:', error);
    } finally {
      set({ loading: false });
    }
  },
  fetchProfile: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        set({ profile: docSnap.data() as UserProfile });
      } else {
        const initialProfile: UserProfile = {
          displayName: user.email?.split('@')[0] || '',
          bio: '',
          location: '',
          interests: [],
          profileImage: '',
          coverImage: ''
        };
        await setDoc(userRef, initialProfile);
        set({ profile: initialProfile });
      }
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error fetching profile:', error);
    } finally {
      set({ loading: false });
    }
  }
}));