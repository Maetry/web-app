'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';

import type { AppStore } from '@/store/types';
import { initializeApp } from '@/features/common/common.actions';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    storeRef.current?.dispatch(initializeApp());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
