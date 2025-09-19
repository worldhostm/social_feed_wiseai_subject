import { render, screen, fireEvent } from '@testing-library/react';
import { parseHashtags, renderContentWithHashtags } from '../hashtagUtils';

describe('parseHashtags', () => {
  it('parses text with hashtags correctly', () => {
    const text = "Hello #world this is #test content";
    const result = parseHashtags(text);

    expect(result).toEqual([
      { type: 'text', content: 'Hello ' },
      { type: 'hashtag', content: '#world' },
      { type: 'text', content: ' this is ' },
      { type: 'hashtag', content: '#test' },
      { type: 'text', content: ' content' }
    ]);
  });

  it('handles text without hashtags', () => {
    const text = "This is just plain text";
    const result = parseHashtags(text);

    expect(result).toEqual([
      { type: 'text', content: 'This is just plain text' }
    ]);
  });

  it('handles text with only hashtags', () => {
    const text = "#React #NextJS #TypeScript";
    const result = parseHashtags(text);

    expect(result).toEqual([
      { type: 'hashtag', content: '#React' },
      { type: 'text', content: ' ' },
      { type: 'hashtag', content: '#NextJS' },
      { type: 'text', content: ' ' },
      { type: 'hashtag', content: '#TypeScript' }
    ]);
  });

  it('handles Korean hashtags', () => {
    const text = "안녕하세요 #개발자 #프론트엔드 입니다";
    const result = parseHashtags(text);

    expect(result).toEqual([
      { type: 'text', content: '안녕하세요 ' },
      { type: 'hashtag', content: '#개발자' },
      { type: 'text', content: ' ' },
      { type: 'hashtag', content: '#프론트엔드' },
      { type: 'text', content: ' 입니다' }
    ]);
  });

  it('handles hashtags at the beginning and end', () => {
    const text = "#start middle content #end";
    const result = parseHashtags(text);

    expect(result).toEqual([
      { type: 'hashtag', content: '#start' },
      { type: 'text', content: ' middle content ' },
      { type: 'hashtag', content: '#end' }
    ]);
  });
});

describe('renderContentWithHashtags', () => {
  it('renders clickable hashtags', () => {
    const mockOnClick = jest.fn();
    const content = "Check out #React and #NextJS";

    render(
      <div>
        {renderContentWithHashtags(content, mockOnClick)}
      </div>
    );

    const reactHashtag = screen.getByText('#React');
    const nextjsHashtag = screen.getByText('#NextJS');

    expect(reactHashtag).toBeInTheDocument();
    expect(nextjsHashtag).toBeInTheDocument();
    expect(reactHashtag.tagName).toBe('BUTTON');
    expect(nextjsHashtag.tagName).toBe('BUTTON');
  });

  it('calls onHashtagClick with correct hashtag text', () => {
    const mockOnClick = jest.fn();
    const content = "Testing #hashtag functionality";

    render(
      <div>
        {renderContentWithHashtags(content, mockOnClick)}
      </div>
    );

    const hashtagButton = screen.getByText('#hashtag');
    fireEvent.click(hashtagButton);

    expect(mockOnClick).toHaveBeenCalledWith('hashtag');
  });

  it('renders plain text parts as span elements', () => {
    const mockOnClick = jest.fn();
    const content = "Plain text #hashtag more text";

    const { container } = render(
      <div>
        {renderContentWithHashtags(content, mockOnClick)}
      </div>
    );

    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(2); // "Plain text " and " more text"
  });

  it('prevents event propagation on hashtag clicks', () => {
    const mockOnClick = jest.fn();
    const mockParentClick = jest.fn();
    const content = "Click #test hashtag";

    render(
      <div onClick={mockParentClick}>
        {renderContentWithHashtags(content, mockOnClick)}
      </div>
    );

    const hashtagButton = screen.getByText('#test');
    fireEvent.click(hashtagButton);

    expect(mockOnClick).toHaveBeenCalledWith('test');
    expect(mockParentClick).not.toHaveBeenCalled();
  });
});