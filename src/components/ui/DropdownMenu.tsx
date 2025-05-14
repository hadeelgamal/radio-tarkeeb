import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  activeLabel: string;
  items: DropdownItem[];
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  activeLabel,
  items,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // Small delay to prevent flickering
  };

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 200; // Approximate height of dropdown

      // If not enough space below and more space above, flip up
      setDropUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
    }

    if (!dropdownRef.current) return;
    gsap.to(dropdownRef.current, {
      opacity: open ? 1 : 0,
      y: open ? 0 : (dropUp ? 10 : -10),
      pointerEvents: open ? 'auto' : 'none',
      duration: 0.3,
      ease: "power2.inOut"
    });
  }, [open, dropUp]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        className={`
          relative group bg-white text-black rounded-full px-6 h-12 
          text-base font-medium transition-all duration-200 
          flex items-center justify-center gap-2
          hover:bg-white/90 active:bg-white/80
          ${open ? 'bg-white/90' : ''}
        `}
      >
        <span>{activeLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={dropdownRef}
        className={`
          absolute left-0 w-48 rounded-lg bg-white text-black 
          shadow-lg border border-black/10 opacity-0 pointer-events-none overflow-hidden
          ${dropUp ? 'bottom-[calc(100%+8px)]' : 'mt-2'}
          max-h-[300px] overflow-y-auto
        `}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              item.onClick();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-black/5 active:bg-black/10 transition-colors duration-200 ease-in-out"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 