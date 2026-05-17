'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authStorage } from '@/features/auth/auth.storage';
import { useLogout } from '@/features/auth/use-auth-session';
import { useGetUsersQuery } from '@/services/maestri/api-generated';
import { Path } from '@/router/paths';

const noopSubscribe = () => () => {};

/**
 * Read token presence from localStorage without a render-phase hydration
 * mismatch (server snapshot is always "not authed"; the client resolves the
 * real value after hydration).
 */
function useHasValidAuth(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => authStorage.hasValidAuth(),
    () => false,
  );
}

/**
 * Root route is the auth gate: unauthenticated visitors go to `/auth`,
 * authenticated ones see a minimal placeholder (no dashboard exists yet — the
 * UI is being rebuilt) that also validates the token via `GET /v1/users`.
 */
export default function Home() {
  const router = useRouter();
  const logout = useLogout();
  const authed = useHasValidAuth();

  useEffect(() => {
    authStorage.initializeDeviceId();
  }, []);

  useEffect(() => {
    if (!authed) router.replace(Path.Auth);
  }, [authed, router]);

  const { data: user, error, isLoading } = useGetUsersQuery(undefined, { skip: !authed });

  // A rejected token means the session is not actually valid.
  useEffect(() => {
    if (!error) return;
    const status = (error as { status?: number }).status;
    if (status === 401 || status === 403) {
      authStorage.clearTokens();
      router.replace(Path.Auth);
    }
  }, [error, router]);

  if (!authed) {
    return (
      <main className="flex min-h-svh items-center justify-center p-6">
        <p className="text-muted-foreground text-sm">Перенаправление…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-foreground text-2xl">Maestri</CardTitle>
          <CardDescription>Вы вошли в систему.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {isLoading && <p className="text-muted-foreground text-sm">Загрузка профиля…</p>}
          {user && <p className="text-foreground text-base font-medium">{user.nickname}</p>}
          <Button variant="outline" size="lg" className="w-full" onClick={() => logout()}>
            Выйти
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
