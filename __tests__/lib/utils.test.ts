import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('handles false conditions', () => {
      const isActive = false;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class');
    });

    it('handles undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'another-class');
      expect(result).toBe('base-class another-class');
    });

    it('merges conflicting Tailwind classes correctly', () => {
      // tailwind-merge should handle conflicting classes
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500'); // Later class should override
    });

    it('handles arrays of classes', () => {
      const result = cn(['text-red-500', 'bg-blue-500'], 'p-4');
      expect(result).toBe('text-red-500 bg-blue-500 p-4');
    });

    it('handles object notation', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'p-4': true
      });
      expect(result).toBe('text-red-500 p-4');
    });

    it('handles mixed input types', () => {
      const result = cn(
        'base-class',
        ['array-class-1', 'array-class-2'],
        {
          'object-class-1': true,
          'object-class-2': false
        },
        'final-class'
      );
      expect(result).toBe('base-class array-class-1 array-class-2 object-class-1 final-class');
    });

    it('handles empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
      expect(cn([])).toBe('');
      expect(cn({})).toBe('');
    });

    it('deduplicates identical classes', () => {
      const result = cn('text-red-500', 'text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('handles spacing classes correctly', () => {
      const result = cn('p-2', 'p-4'); // conflicting padding
      expect(result).toBe('p-4'); // Should keep the last one
    });

    it('handles responsive classes', () => {
      const result = cn('text-sm', 'md:text-lg', 'lg:text-xl');
      expect(result).toBe('text-sm md:text-lg lg:text-xl');
    });

    it('handles state variants', () => {
      const result = cn('bg-blue-500', 'hover:bg-blue-600', 'focus:bg-blue-700');
      expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700');
    });

    it('handles dark mode classes', () => {
      const result = cn('bg-white', 'dark:bg-gray-900', 'text-black', 'dark:text-white');
      expect(result).toBe('bg-white dark:bg-gray-900 text-black dark:text-white');
    });

    it('merges conflicting background colors correctly', () => {
      const result = cn('bg-red-500', 'bg-blue-500', 'bg-green-500');
      expect(result).toBe('bg-green-500'); // Should keep the last one
    });

    it('merges conflicting text colors correctly', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('handles size classes correctly', () => {
      const result = cn('w-4', 'w-8', 'h-4', 'h-8');
      expect(result).toBe('w-8 h-8'); // Should keep the last of each type
    });

    it('preserves non-conflicting classes', () => {
      const result = cn('flex', 'items-center', 'justify-center', 'p-4', 'text-white');
      expect(result).toBe('flex items-center justify-center p-4 text-white');
    });

    it('handles border classes correctly', () => {
      const result = cn('border', 'border-red-500', 'border-2', 'border-blue-500');
      expect(result).toBe('border-2 border-blue-500');
    });

    it('works with component patterns', () => {
      const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium';
      const variantStyles = 'bg-blue-500 text-white hover:bg-blue-600';
      const sizeStyles = 'h-10 px-4 py-2';
      
      const result = cn(baseStyles, variantStyles, sizeStyles);
      expect(result).toBe('inline-flex items-center justify-center rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2');
    });

    it('handles conditional component styles', () => {
      const isDisabled = true;
      const isLoading = false;
      
      const result = cn(
        'btn',
        'bg-blue-500',
        isDisabled && 'opacity-50 cursor-not-allowed',
        isLoading && 'animate-spin',
        !isDisabled && 'hover:bg-blue-600'
      );
      
      expect(result).toBe('btn bg-blue-500 opacity-50 cursor-not-allowed');
    });
  });
});