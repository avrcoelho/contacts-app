import { create } from 'zustand';

import { type User } from '@/models/User';

interface UseStoreData {
  user: User | null;
  onSetUser: (user: User) => void;
}

export const useUserStore = create<UseStoreData>(set => ({
  user: null,
  onSetUser: user => {
    set({ user });
  },
}));
