import type { Preview } from "@storybook/react";
import React from 'react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
  },
  decorators: [
    (Story) => React.createElement(
      'div',
      { className: 'bg-white dark:bg-gray-900 text-black dark:text-white' },
      React.createElement(Story)
    ),
  ],
};

export default preview;
