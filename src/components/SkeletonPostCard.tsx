import React from 'react';

export function SkeletonPostCard() {
  return (
    <article className="border-b border-gray-200 dark:border-gray-800 p-4 animate-pulse">
      <div className="flex space-x-3">
        {/* Profile Image Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Author Info Skeleton */}
          <div className="flex items-center space-x-2 text-sm mb-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
          </div>
          
          {/* Image Skeleton (randomly show or hide) */}
          {Math.random() > 0.5 && (
            <div className="mb-3">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            </div>
          )}
          
          {/* Interaction Buttons Skeleton */}
          <div className="flex items-center justify-between max-w-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
            </div>
            
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface SkeletonPostListProps {
  count?: number;
}

export function SkeletonPostList({ count = 5 }: SkeletonPostListProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonPostCard key={index} />
      ))}
    </>
  );
}