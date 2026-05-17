'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Apple } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authStorage } from '@/features/auth/auth.storage';
import { useAuthSession } from '@/features/auth/use-auth-session';
import { useAppleSignIn, useGoogleSignIn } from '@/features/auth/use-oauth-providers';
import { Path } from '@/router/paths';

export default function AuthPage() {
  const router = useRouter();
  const { status, error, signInWithGoogle, signInWithApple } = useAuthSession();
  const { available: googleAvailable, renderButton: renderGoogleButton } =
    useGoogleSignIn(signInWithGoogle);
  const { available: appleAvailable, ready: appleReady, signIn: appleSignIn } = useAppleSignIn();
  const googleHostRef = useRef<HTMLDivElement>(null);
  const [appleError, setAppleError] = useState<string | null>(null);

  // Already signed in — skip the login screen.
  useEffect(() => {
    if (authStorage.hasValidAuth()) router.replace(Path.Home);
  }, [router]);

  // Mount Google's official button; `renderGoogleButton` changes identity
  // once the GSI SDK is ready, which re-runs this effect.
  useEffect(() => {
    renderGoogleButton(googleHostRef.current);
  }, [renderGoogleButton]);

  const busy = status === 'pending';

  const handleApple = async () => {
    setAppleError(null);
    try {
      const result = await appleSignIn();
      await signInWithApple(result);
    } catch {
      setAppleError('Вход через Apple отменён или недоступен.');
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-foreground text-2xl">Maestri</CardTitle>
          <CardDescription>
            Войдите или зарегистрируйтесь — аккаунт создаётся автоматически при первом входе.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {googleAvailable ? (
            <div className="flex min-h-[40px] justify-center" aria-busy={busy}>
              {/* Google Identity Services renders its official button here. */}
              <div ref={googleHostRef} />
            </div>
          ) : (
            <p className="text-muted-foreground text-center text-xs">
              Google-вход не настроен (нет NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID).
            </p>
          )}

          <div className="flex flex-col gap-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              disabled={busy || !appleAvailable || !appleReady}
              onClick={handleApple}
            >
              <Apple aria-hidden /> Продолжить с Apple
            </Button>
            {!appleAvailable && (
              <p className="text-muted-foreground text-center text-xs">
                Apple-вход появится позже — нужен Apple Services ID.
              </p>
            )}
          </div>

          {busy && <p className="text-muted-foreground text-center text-sm">Выполняется вход…</p>}

          {(error || appleError) && (
            <p role="alert" className="text-destructive text-center text-sm">
              {error ?? appleError}
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
