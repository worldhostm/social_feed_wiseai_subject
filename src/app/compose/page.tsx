'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ImageIcon, X } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { usePosts } from '@/contexts/PostContext';
import { currentUser, createPost } from '@/data/mockData';

export default function ComposePage() {
  const router = useRouter();
  const { addPost } = usePosts();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxLength = 280;
  const charactersLeft = maxLength - content.length;
  const isOverLimit = charactersLeft < 0;
  const canPost = content.trim().length > 0 && !isOverLimit && !isSubmitting;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages(prev => [...prev, ...newImages].slice(0, 4));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!canPost) return;

    setIsSubmitting(true);
    try {
      const result = await createPost(content, images);
      if (result.success && result.post) {
        addPost(result.post);
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen">
        <div className="sticky top-16 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold">새 포스트</h1>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!canPost}
              size="sm"
            >
              {isSubmitting ? '게시 중...' : '게시하기'}
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src={currentUser.profileImage}
                  alt={`${currentUser.name} profile`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="무슨 일이 일어나고 있나요?"
                className="w-full min-h-[120px] text-lg bg-transparent border-none outline-none resize-none placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
              
              {images.length > 0 && (
                <div className="mt-3 grid gap-2 rounded-2xl overflow-hidden">
                  <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Upload ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={images.length >= 4}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 4}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`text-sm ${isOverLimit ? 'text-red-500' : charactersLeft <= 20 ? 'text-yellow-500' : 'opacity-60'}`}>
                    {charactersLeft}
                  </div>
                  <div className="w-6 h-6 relative">
                    <svg className="w-6 h-6 transform -rotate-90">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 10}`}
                        strokeDashoffset={`${2 * Math.PI * 10 * (charactersLeft / maxLength)}`}
                        className={`transition-all ${isOverLimit ? 'text-red-500' : charactersLeft <= 20 ? 'text-yellow-500' : 'text-blue-500'}`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}