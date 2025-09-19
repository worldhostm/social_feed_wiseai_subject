import React from 'react';

export interface ParsedContent {
  type: 'text' | 'hashtag';
  content: string;
}

export function parseHashtags(text: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const hashtagRegex = /#[\w가-힣]+/g;
  let lastIndex = 0;
  let match;

  while ((match = hashtagRegex.exec(text)) !== null) {
    // Add text before hashtag
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add hashtag
    parts.push({
      type: 'hashtag',
      content: match[0]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return parts;
}

export function renderContentWithHashtags(
  content: string, 
  onHashtagClick: (hashtag: string) => void
): React.ReactNode {
  const parts = parseHashtags(content);
  
  return parts.map((part, index) => {
    if (part.type === 'hashtag') {
      return (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onHashtagClick(part.content.slice(1)); // Remove # symbol
          }}
          className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors"
        >
          {part.content}
        </button>
      );
    }
    return <span key={index}>{part.content}</span>;
  });
}