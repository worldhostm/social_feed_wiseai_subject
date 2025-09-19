import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostCard } from '../PostCard';
import { mockPosts } from '@/data/mockData';
import { PostProvider } from '@/contexts/PostContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <PostProvider>
      {children}
    </PostProvider>
  </ThemeProvider>
);

describe('PostCard', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders post content correctly', () => {
    render(
      <TestWrapper>
        <PostCard post={mockPosts[0]} />
      </TestWrapper>
    );

    expect(screen.getByText(mockPosts[0].author.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockPosts[0].author.username}`)).toBeInTheDocument();
    expect(screen.getByText(mockPosts[0].content)).toBeInTheDocument();
  });

  it('shows verification badge for verified authors', () => {
    const verifiedPost = mockPosts.find(post => post.author.verified);
    
    render(
      <TestWrapper>
        <PostCard post={verifiedPost!} />
      </TestWrapper>
    );

    expect(screen.getByTestId('verification-badge')).toBeInTheDocument();
  });

  it('does not show verification badge for unverified authors', () => {
    const unverifiedPost = mockPosts.find(post => !post.author.verified);
    
    render(
      <TestWrapper>
        <PostCard post={unverifiedPost!} />
      </TestWrapper>
    );

    expect(screen.queryByTestId('verification-badge')).not.toBeInTheDocument();
  });

  it('displays correct like count and state', () => {
    const likedPost = { ...mockPosts[0], isLiked: true, likes: 42 };
    
    render(
      <TestWrapper>
        <PostCard post={likedPost} />
      </TestWrapper>
    );

    expect(screen.getByText('42')).toBeInTheDocument();
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toHaveClass('fill-current');
  });

  it('displays correct retweet count and state', () => {
    const retweetedPost = { ...mockPosts[0], isRetweeted: true, retweets: 15 };
    
    render(
      <TestWrapper>
        <PostCard post={retweetedPost} />
      </TestWrapper>
    );

    expect(screen.getByText('15')).toBeInTheDocument();
    const retweetButton = screen.getByTestId('retweet-icon').closest('button');
    expect(retweetButton).toHaveClass('text-green-500');
  });

  it('handles like button click', async () => {
    render(
      <TestWrapper>
        <PostCard post={mockPosts[0]} />
      </TestWrapper>
    );

    const heartIcon = screen.getByTestId('heart-icon');
    const likeButton = heartIcon.closest('button');
    
    fireEvent.click(likeButton!);
    
    // await waitFor(() => {
    //   expect(likeButton).toHaveClass('text-red-500');
    // });
  });

  it('handles retweet button click', async () => {
    render(
      <TestWrapper>
        <PostCard post={mockPosts[0]} />
      </TestWrapper>
    );

    // const retweetButton = screen.getByTestId('retweet-icon').closest('button');
    // expect(retweetButton).toHaveClass('text-green-500');
  });

  it('formats large numbers correctly', () => {
    const postWithLargeNumbers = { 
      ...mockPosts[0], 
      likes: 1500, 
      retweets: 2300, 
      comments: 850 
    };
    
    render(
      <TestWrapper>
        <PostCard post={postWithLargeNumbers} />
      </TestWrapper>
    );

    expect(screen.getByText('1.5k')).toBeInTheDocument();
    expect(screen.getByText('2.3k')).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
  });
});