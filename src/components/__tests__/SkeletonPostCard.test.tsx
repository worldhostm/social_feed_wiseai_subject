import { render, screen } from '@testing-library/react';
import { SkeletonPostCard, SkeletonPostList } from '../SkeletonPostCard';

describe('SkeletonPostCard', () => {
  it('renders skeleton elements with pulse animation', () => {
    render(<SkeletonPostCard />);

    const skeletonCard = screen.getByRole('article');
    expect(skeletonCard).toHaveClass('animate-pulse');
  });

  it('renders all skeleton elements', () => {
    const { container } = render(<SkeletonPostCard />);

    // Check for profile image skeleton
    const profileSkeleton = container.querySelector('.w-10.h-10.bg-gray-200');
    expect(profileSkeleton).toBeInTheDocument();

    // Check for content skeletons
    const contentSkeletons = container.querySelectorAll('.h-4.bg-gray-200');
    expect(contentSkeletons.length).toBeGreaterThan(0);

    // Check for interaction button skeletons
    const buttonSkeletons = container.querySelectorAll('.w-8.h-8.bg-gray-200');
    expect(buttonSkeletons.length).toBeGreaterThan(0);
  });
});

describe('SkeletonPostList', () => {
  it('renders default number of skeleton cards (5)', () => {
    const { container } = render(<SkeletonPostList />);

    const skeletonCards = container.querySelectorAll('article');
    expect(skeletonCards).toHaveLength(5);
  });

  it('renders custom number of skeleton cards', () => {
    const { container } = render(<SkeletonPostList count={3} />);

    const skeletonCards = container.querySelectorAll('article');
    expect(skeletonCards).toHaveLength(3);
  });

  it('renders no cards when count is 0', () => {
    const { container } = render(<SkeletonPostList count={0} />);

    const skeletonCards = container.querySelectorAll('article');
    expect(skeletonCards).toHaveLength(0);
  });
});