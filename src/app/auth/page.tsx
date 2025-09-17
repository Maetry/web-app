'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useOAuthCallback, useOAuthUrls, useAuth } from '@/features/auth/auth.hooks';
import { authStorage } from '@/features/auth/auth.storage';

export default function AuthPage() {
  const { processCallback, isProcessing, error } = useOAuthCallback();
  const { getGoogleUrl } = useOAuthUrls();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Initialize device ID
    authStorage.initializeDeviceId();

    // Check for OAuth callback
    if (window.location.hash) {
      processCallback(window.location.hash);
    }
  }, [processCallback]);

  // Show loading state while processing OAuth callback
  if (isProcessing) {
    return (
      <main className="flex items-center justify-center min-h-svh">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#252630] mb-2">Авторизация...</h2>
          <p className="text-base text-[#4B5563]">Пожалуйста, подождите</p>
        </div>
      </main>
    );
  }

  // Show error if authentication failed
  if (error) {
    return (
      <main className="flex items-center justify-center min-h-svh">
        <div className="w-[420px] p-8 bg-[linear-gradient(135deg,#FFF5E1,#E0C3FC)] rounded-2xl shadow-xl">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Ошибка авторизации</h2>
            <p className="text-base text-[#4B5563] mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show login UI when not processing callback
  return (
    <main className="flex items-center justify-center min-h-svh">
      <div className="w-[420px] p-8 bg-[linear-gradient(135deg,#FFF5E1,#E0C3FC)] rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative size-28">
            <Image
              src="/icons/logo-square-colored.svg"
              alt="Logo"
              fill
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-[#252630] text-center mb-2">
          Добро пожаловать!
        </h1>
        <p className="text-base text-[#4B5563] text-center mb-6">Выберите способ авторизации</p>

        {/* Divider */}
        <hr className="border-t border-[#D1D5DB] mb-6" />

        {/* Google Button */}
        <button
          className="flex items-center justify-center w-full py-3 mb-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow"
          onClick={() => {
            const url = getGoogleUrl();
            if (url) {
              window.location.href = url;
            } else {
              console.error('Google OAuth URL not configured');
            }
          }}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          <span className="text-base font-medium text-[#4B5563]">Войти с помощью Google</span>
        </button>

        {/* Apple Button */}
        <button className="flex items-center justify-center w-full py-3 bg-black rounded-lg hover:bg-gray-900 transition-colors">
          <FaApple className="w-5 h-5 mr-2 text-white" />
          <span className="text-base font-medium text-white">Войти с помощью Apple</span>
        </button>
      </div>
    </main>
  );
}