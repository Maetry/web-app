'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';

import type { AppStore } from '@/store/types';
// Temporarily disabled: initializeApp eagerly fetches workspace/users before
// any auth exists, producing a noisy 401 (GET /v1/workspace) on the new /auth
// screen. The code is preserved for re-enablement once a post-login app shell
// drives it (see src/store/listenerMiddleware.ts).
// import { initializeApp } from '@/features/common/common.actions';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // useEffect(() => {
  //   storeRef.current?.dispatch(initializeApp());
  // }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
