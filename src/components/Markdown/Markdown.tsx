import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const components: Components = {
    // Detect embedded video links
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (href && href.match(/\.(mp4|webm|ogg)$/i)) {
        return (
          <video
            controls
            style={{ maxWidth: '100%', margin: '1rem 0' }}
            src={href}
          />
        );
      };
      if (href && href.match(/\.(svg|png|jpeg|jpg)$/i)) {
        return (
          <img
            style={{ maxWidth: '100%', margin: '1rem 0' }}
            src={href}
            alt='/def/def-img.jpeg'
          />
        );
      }

      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    },

    // Optional: still keep the paragraph renderer if needed
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
      return <p {...props}>{props.children}</p>;
    },
  };

  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
