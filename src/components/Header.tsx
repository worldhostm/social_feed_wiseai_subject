'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Moon, Sun, Plus, Search, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { usePosts } from '@/contexts/PostContext';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, searchPosts } = usePosts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPosts(localSearchQuery);
    if (localSearchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(localSearchQuery)}`);
    } else {
      router.push('/');
    }
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    searchPosts('');
    router.push('/');
    setIsSearchOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors backdrop-blur-md ${theme === 'dark' ? 'border-gray-800 bg-gray-900/80' : 'border-gray-200 bg-white/80'}`}>
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {!isSearchOpen ? (
            <>
              <Link href="/" className="text-xl font-bold">
                Social Feed
              </Link>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-800 hover:text-white' 
                      : 'hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Search className="w-4 h-4" />
                </Button>
                
                <Link href="/compose">
                  <Button size="sm" className="flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">포스트</span>
                  </Button>
                </Link>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={`p-2 transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-800 hover:text-white' 
                      : 'hover:bg-gray-100 hover:text-gray-100'
                  }`}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center w-full space-x-2">
              <form onSubmit={handleSearch} className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  placeholder="해시태그나 키워드 검색..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border-none outline-none placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <Button type="submit" size="sm" className="p-2">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className={`p-2 transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 hover:text-white' 
                    : 'hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        {searchQuery && !isSearchOpen && (
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-sm opacity-60">검색 중: &quot;{searchQuery}&quot;</span>
            <button 
              onClick={clearSearch}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              지우기
            </button>
          </div>
        )}
      </div>
    </header>
  );
}