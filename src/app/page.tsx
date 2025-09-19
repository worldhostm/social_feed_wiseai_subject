'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { SkeletonPostList } from '@/components/SkeletonPostCard';
import { usePosts } from '@/contexts/PostContext';
import { useRealTimeSimulation } from '@/hooks/useRealTimeSimulation';
import { fetchPosts } from '@/data/mockData';

export default function Home() {
  const { posts, setPosts, loading, setLoading, filteredPosts, searchQuery } = usePosts();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // 실시간 포스트 시뮬레이션 활성화
  useRealTimeSimulation();

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      try {
        const initialPosts = await fetchPosts(1, 10);
        setPosts(initialPosts);
        setHasMore(initialPosts.length === 10);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, [setPosts, setLoading]);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = await fetchPosts(page + 1, 10);
      if (newPosts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
        setHasMore(newPosts.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use filtered posts when searching, otherwise use all posts
  const displayPosts = searchQuery ? filteredPosts : posts;

  return (
    <Layout>
      <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen">
        {displayPosts.length === 0 && loading ? (
          <SkeletonPostList count={5} />
        ) : displayPosts.length === 0 && searchQuery ? (
          <div className="p-8 text-center opacity-60">
            <p>&quot;{searchQuery}&quot;에 대한 검색 결과가 없습니다.</p>
          </div>
        ) : (
          <>
            <div>
              {displayPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {!searchQuery && hasMore && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={loadMorePosts}
                  disabled={loading}
                  className="w-full py-3 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '로딩 중...' : '더 보기'}
                </button>
              </div>
            )}
            
            {!searchQuery && !hasMore && posts.length > 0 && (
              <div className="p-4 text-center opacity-60 border-t border-gray-200 dark:border-gray-800">
                모든 포스트를 확인했습니다.
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
