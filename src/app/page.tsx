'use client';

import { useAuthGate } from '@/features/auth/auth.hooks';

export default function Home() {
  const { isChecking, error } = useAuthGate();

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <main className="flex items-center justify-center min-h-svh">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#252630] mb-2">Проверка авторизации...</h2>
          <p className="text-base text-[#4B5563]">Пожалуйста, подождите</p>
        </div>
      </main>
    );
  }

  // Show error if there's a network issue (not auth issue, as those redirect)
  if (error && error.code === 'NETWORK_ERROR') {
    return (
      <main className="flex items-center justify-center min-h-svh">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Ошибка подключения</h2>
          <p className="text-base text-[#4B5563] mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Попробовать снова
          </button>
        </div>
      </main>
    );
  }

  // This should not be visible as useAuthGate redirects
  return null;
}