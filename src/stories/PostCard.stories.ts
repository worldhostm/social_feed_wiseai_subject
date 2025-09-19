import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '@/components/PostCard';
import { mockPosts } from '@/data/mockData';

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      description: 'Post data object containing author info, content, and engagement metrics',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: mockPosts[0],
  },
};

export const WithImage: Story = {
  args: {
    post: mockPosts[0],
  },
};

export const WithoutImage: Story = {
  args: {
    post: mockPosts[1],
  },
};

export const LikedPost: Story = {
  args: {
    post: {
      ...mockPosts[1],
      isLiked: true,
    },
  },
};

export const RetweetedPost: Story = {
  args: {
    post: {
      ...mockPosts[2],
      isRetweeted: true,
    },
  },
};

export const VerifiedAuthor: Story = {
  args: {
    post: mockPosts[0],
  },
};

export const UnverifiedAuthor: Story = {
  args: {
    post: mockPosts[1],
  },
};

export const LongContent: Story = {
  args: {
    post: {
      ...mockPosts[0],
      content: "이것은 매우 긴 게시글입니다. React와 Next.js를 사용한 소셜 미디어 피드 개발은 정말 흥미로운 프로젝트입니다. 다양한 컴포넌트들을 조합하여 사용자 친화적인 인터페이스를 만드는 것이 중요하죠. #React #NextJS #프론트엔드 #개발 #웹개발 #TypeScript #TailwindCSS #소셜미디어",
    },
  },
};