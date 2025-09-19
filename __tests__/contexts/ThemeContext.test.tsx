import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Test component to interact with ThemeContext
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    
    // Reset document classes
    document.documentElement.classList.remove('dark');
    
    // Mock matchMedia to return light theme preference by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false, // Default to light theme
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('loads saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('detects system dark mode preference when no saved theme', () => {
    // Mock matchMedia to return dark theme preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('toggles theme from dark to light', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('saves theme to localStorage when changed', async () => {
    const user = userEvent.setup();
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('toggle-button'));

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  });

  it('adds dark class to document element when dark theme', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('toggle-button'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document element when light theme', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Should start with dark class
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByTestId('toggle-button'));

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('handles multiple theme toggles correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Start with light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    // Toggle to dark
    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Toggle back to light
    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    // Toggle to dark again
    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('persists theme across component unmount/remount', () => {
    const { unmount } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Change theme and unmount
    act(() => {
      localStorage.setItem('theme', 'dark');
    });
    
    unmount();

    // Remount and check if theme is persisted
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('handles invalid localStorage values gracefully', () => {
    localStorage.setItem('theme', 'invalid-theme');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Should default to light theme for invalid values
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('updates document class immediately on mount with saved dark theme', () => {
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('provides stable theme context value', () => {
    let renderCount = 0;
    
    const CountingComponent = () => {
      renderCount++;
      const { theme } = useTheme();
      return <div>{theme}</div>;
    };

    const { rerender } = render(
      <ThemeProvider>
        <CountingComponent />
      </ThemeProvider>
    );

    const initialRenderCount = renderCount;

    // Rerender without changing theme
    rerender(
      <ThemeProvider>
        <CountingComponent />
      </ThemeProvider>
    );

    // Component should not re-render unnecessarily
    expect(renderCount).toBe(initialRenderCount + 1);
  });
});