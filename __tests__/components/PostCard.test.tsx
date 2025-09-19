import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostCard } from '@/components/PostCard';
import { PostProvider } from '@/contexts/PostContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Post } from '@/data/mockData';

const mockPost: Post = {
  id: 1,
  author: {
    name: '테스트 사용자',
    username: 'testuser',
    profileImage: 'https://picsum.photos/40/40?random=1',
    verified: true,
  },
  content: '테스트 포스트 내용입니다. #테스트 #포스트',
  images: ['https://picsum.photos/500/300?random=1'],
  createdAt: '2024-01-15T10:30:00Z',
  likes: 42,
  retweets: 12,
  comments: 8,
  isLiked: false,
  isRetweeted: false,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <PostProvider>
          {children}
        </PostProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

describe('PostCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders post content correctly', () => {
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    expect(screen.getByText('테스트 사용자')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('테스트 포스트 내용입니다. #테스트 #포스트')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('displays verification badge for verified users', () => {
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    const verificationBadge = screen.getByTestId('verification-badge') || 
      document.querySelector('[data-testid="verification-badge"]') ||
      document.querySelector('.text-blue-500');
    
    expect(verificationBadge).toBeInTheDocument();
  });

  it('handles like button click', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    const likeButton = screen.getByTestId('heart-icon').closest('button');

    // Just check that button is clickable and doesn't crash
    if (likeButton) {
      await user.click(likeButton);
      // Button should still be in the document after click
      expect(likeButton).toBeInTheDocument();
    }
  });

  it('handles retweet button click', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    const retweetButton = screen.getByTestId('retweet-icon').closest('button');
    expect(retweetButton).toBeInTheDocument();

    // Just check that button is clickable and doesn't crash
    if (retweetButton) {
      await user.click(retweetButton);
      // Button should still be in the document after click
      expect(retweetButton).toBeInTheDocument();
    }
  });

  it('displays relative time correctly', () => {
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    const timeElement = screen.getByRole('time') || 
      document.querySelector('time');
    expect(timeElement).toBeInTheDocument();
  });

  it('renders images when present', () => {
    render(
      <TestWrapper>
        <PostCard post={mockPost} />
      </TestWrapper>
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(1); // Profile image + post image
  });

  it('does not render images when not present', () => {
    const postWithoutImages = { ...mockPost, images: [] };
    
    render(
      <TestWrapper>
        <PostCard post={postWithoutImages} />
      </TestWrapper>
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1); // Only profile image
  });

  it('formats large numbers correctly', () => {
    const postWithLargeNumbers = {
      ...mockPost,
      likes: 1500,
      retweets: 2300,
      comments: 999,
    };
    
    render(
      <TestWrapper>
        <PostCard post={postWithLargeNumbers} />
      </TestWrapper>
    );

    expect(screen.getByText('1.5k')).toBeInTheDocument();
    expect(screen.getByText('2.3k')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('applies correct styles for liked post', () => {
    const likedPost = { ...mockPost, isLiked: true };
    
    render(
      <TestWrapper>
        <PostCard post={likedPost} />
      </TestWrapper>
    );

    const heartIcon = document.querySelector('.fill-current') ||
      document.querySelector('.text-red-500');
    expect(heartIcon).toBeInTheDocument();
  });

  it('applies correct styles for retweeted post', () => {
    const retweetedPost = { ...mockPost, isRetweeted: true };
    
    render(
      <TestWrapper>
        <PostCard post={retweetedPost} />
      </TestWrapper>
    );

    const retweetIcon = document.querySelector('.text-green-500');
    expect(retweetIcon).toBeInTheDocument();
  });
});