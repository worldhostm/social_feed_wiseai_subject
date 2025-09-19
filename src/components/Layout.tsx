'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { NotificationToast } from '@/components/NotificationToast';
import { NewPostIndicator } from '@/components/NewPostIndicator';
import { useTheme } from '@/contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header />
      <main className="max-w-2xl mx-auto">
        {children}
      </main>
      <NotificationToast />
      <NewPostIndicator />
    </div>
  );
}