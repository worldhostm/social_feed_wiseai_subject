'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePosts } from '@/contexts/PostContext';
import { useTheme } from '@/contexts/ThemeContext';

export function NewPostIndicator() {
  const { posts } = usePosts();
  const { theme } = useTheme();
  const [lastPostCount, setLastPostCount] = useState(0);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (posts.length > lastPostCount) {
      const newCount = posts.length - lastPostCount;
      setNewPostsCount(newCount);
      setIsVisible(true);
      setLastPostCount(posts.length);

      // 5초 후 자동으로 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [posts.length, lastPostCount]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(false);
  };

  if (!isVisible || newPostsCount === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
      <button
        onClick={handleClick}
        className={`
          px-4 py-2 rounded-full shadow-lg border flex items-center space-x-2 
          animate-in slide-in-from-top duration-300 transition-all hover:scale-105
          ${theme === 'dark' 
            ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700' 
            : 'bg-blue-500 border-blue-400 text-white hover:bg-blue-600'
          }
        `}
      >
        <ArrowUp className="w-4 h-4" />
        <span className="text-sm font-medium">
          새 글 {newPostsCount}개
        </span>
      </button>
    </div>
  );
}