'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Post, mockPosts, toggleLike as apiToggleLike, toggleRetweet as apiToggleRetweet } from '@/data/mockData';

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLike: (postId: number) => Promise<void>;
  toggleRetweet: (postId: number) => Promise<void>;
  addPost: (post: Post) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredPosts: Post[];
  searchPosts: (query: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);

  const toggleLike = useCallback(async (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );

    try {
      await apiToggleLike();
    } catch {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
              }
            : post
        )
      );
    }
  }, []);

  const toggleRetweet = useCallback(async (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isRetweeted: !post.isRetweeted,
              retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1
            }
          : post
      )
    );

    try {
      await apiToggleRetweet();
    } catch {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isRetweeted: !post.isRetweeted,
                retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1
              }
            : post
        )
      );
    }
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts(prevPosts => {
      const newPosts = [post, ...prevPosts];
      if (!searchQuery) {
        setFilteredPosts(newPosts);
      }
      return newPosts;
    });
  }, [searchQuery]);

  const searchPosts = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post => {
      const searchTerm = query.toLowerCase();
      return (
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.name.toLowerCase().includes(searchTerm) ||
        post.author.username.toLowerCase().includes(searchTerm)
      );
    });
    
    setFilteredPosts(filtered);
  }, [posts]);

  // Update filtered posts when posts change
  useEffect(() => {
    if (searchQuery) {
      searchPosts(searchQuery);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchQuery, searchPosts]);

  return (
    <PostContext.Provider value={{
      posts,
      setPosts,
      loading,
      setLoading,
      toggleLike,
      toggleRetweet,
      addPost,
      searchQuery,
      setSearchQuery,
      filteredPosts,
      searchPosts
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}