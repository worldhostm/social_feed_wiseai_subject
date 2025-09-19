import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonPostCard, SkeletonPostList } from '@/components/SkeletonPostCard';

const meta: Meta<typeof SkeletonPostCard> = {
  title: 'Components/SkeletonPostCard',
  component: SkeletonPostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PostList: Meta<typeof SkeletonPostList> = {
  title: 'Components/SkeletonPostList',
  component: SkeletonPostList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Multiple skeleton post cards displayed as a list with customizable count.',
      },
    },
  },
};

export const ThreeCards: StoryObj<typeof SkeletonPostList> = {
  args: {
    count: 3,
  },
};

export const FiveCards: StoryObj<typeof SkeletonPostList> = {
  args: {
    count: 5,
  },
};