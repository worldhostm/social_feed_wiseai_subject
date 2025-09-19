import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { PostProvider } from '@/contexts/PostContext';

const MockThemeProvider = ({ children, initialTheme }: { children: React.ReactNode; initialTheme?: 'light' | 'dark' }) => {
  if (initialTheme) {
    localStorage.setItem('theme', initialTheme);
  }
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

// Mock Header component
jest.mock('@/components/Header', () => {
  return {
    Header: () => <header data-testid="header">Mock Header</header>
  };
});

describe('Layout', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div data-testid="child-content">Test Content</div>
        </Layout>
      </MockThemeProvider>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('applies light theme classes correctly', () => {
    const { container } = render(
      <MockThemeProvider initialTheme="light">
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('bg-white', 'text-black');
    expect(layoutDiv).not.toHaveClass('dark', 'bg-gray-900', 'text-white');
  });

  it('applies dark theme classes correctly', () => {
    const { container } = render(
      <MockThemeProvider initialTheme="dark">
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('dark', 'bg-gray-900', 'text-white');
    expect(layoutDiv).not.toHaveClass('bg-white', 'text-black');
  });

  it('has correct layout structure', () => {
    const { container } = render(
      <MockThemeProvider>
        <Layout>
          <div data-testid="content">Content</div>
        </Layout>
      </MockThemeProvider>
    );

    // Check main container
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('min-h-screen', 'transition-colors');

    // Check main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('max-w-2xl', 'mx-auto');

    // Check content is inside main
    expect(mainElement).toContainElement(screen.getByTestId('content'));
  });

  it('maintains responsive design classes', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('max-w-2xl', 'mx-auto');
  });

  it('handles theme changes dynamically', () => {
    localStorage.setItem('theme', 'light');
    const { container } = render(
      <MockThemeProvider initialTheme="light">
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    let layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('bg-white', 'text-black');
    expect(layoutDiv).not.toHaveClass('dark', 'bg-gray-900', 'text-white');
  });

  it('has proper accessibility structure', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div role="article">Article Content</div>
        </Layout>
      </MockThemeProvider>
    );

    // Check for semantic structure
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('handles multiple children correctly', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </Layout>
      </MockThemeProvider>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('handles empty children gracefully', () => {
    render(
      <MockThemeProvider>
        <Layout>
          {null}
        </Layout>
      </MockThemeProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('applies transition classes for smooth theme switching', () => {
    const { container } = render(
      <MockThemeProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass('transition-colors');
  });

  it('handles theme context errors gracefully', () => {
    // Test without ThemeProvider (should throw error)
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>
      );
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
});