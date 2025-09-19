'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Repeat2, Share, CheckCircle } from 'lucide-react';
import { Post } from '@/data/mockData';
import { formatRelativeTime } from '@/utils/timeUtils';
import { renderContentWithHashtags } from '@/utils/hashtagUtils';
import { usePosts } from '@/contexts/PostContext';
import { cn } from '@/lib/utils';
import { ImageModal } from './ImageModal';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { toggleLike, toggleRetweet, searchPosts } = usePosts();
  const [, setImageError] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleLike(post.id);
  };

  const handleRetweetClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleRetweet(post.id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const handleHashtagClick = (hashtag: string) => {
    searchPosts(hashtag);
    router.push(`/?search=${encodeURIComponent(hashtag)}`);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-blue-50 dark:hover:bg-blue-300/50 transition-colors">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10">
            <Image
              src={post.author.profileImage}
              alt={`${post.author.name} profile`}
              width={40}
              height={40}
              className="rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-semibold truncate">
              {post.author.name}
            </span>
            {post.author.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" data-testid="verification-badge" />
            )}
            <span className="opacity-60 truncate">
              @{post.author.username}
            </span>
            <span className="opacity-60">·</span>
            <time className="opacity-60 flex-shrink-0">
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>
          
          <div className="mt-1">
            <p className="whitespace-pre-wrap break-words">
              {renderContentWithHashtags(post.content, handleHashtagClick)}
            </p>
          </div>
          
          {post.images.length > 0 && (
            <div className="mt-3">
              <div className="grid gap-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {post.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-video cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between max-w-md mt-3">
            <button
              className="flex items-center space-x-2 opacity-60 hover:text-blue-500 transition-colors group"
              onClick={(e) => e.preventDefault()}
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{formatNumber(post.comments)}</span>
            </button>
            
            <button
              className={cn(
                "flex items-center space-x-2 transition-colors group",
                post.isRetweeted
                  ? "text-green-500"
                  : "opacity-60 hover:text-green-500"
              )}
              onClick={handleRetweetClick}
            >
              <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                <Repeat2 className="w-4 h-4" data-testid="retweet-icon" />
              </div>
              <span className="text-sm">{formatNumber(post.retweets)}</span>
            </button>
            
            <button
              className={cn(
                "flex items-center space-x-2 transition-colors group",
                post.isLiked
                  ? "text-red-500"
                  : "opacity-60 hover:text-red-500"
              )}
              onClick={handleLikeClick}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                <Heart className={cn("w-4 h-4", post.isLiked && "fill-current")} data-testid="heart-icon" />
              </div>
              <span className="text-sm">{formatNumber(post.likes)}</span>
            </button>
            
            <button
              className="flex items-center space-x-2 opacity-60 hover:text-blue-500 transition-colors group"
              onClick={(e) => e.preventDefault()}
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={post.images}
        currentIndex={selectedImageIndex}
        isOpen={isImageModalOpen}
        onClose={handleCloseModal}
      />
    </article>
  );
}