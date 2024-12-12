import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  color: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group/button relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
      style={{ 
        '--shimmer-color': `${color}20` 
      } as React.CSSProperties}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-lg">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span className="text-lg">{color}</span>
        </>
      )}
      <div
        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
      >
        <div className="relative h-full w-10 bg-white/20"></div>
      </div>
    </button>
  );
};

export default CopyButton;