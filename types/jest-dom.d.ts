import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveAttribute(attr: string, value?: any): R;
      toHaveFocus(): R;
      toContainElement(element: HTMLElement | null): R;
    }
  }
}