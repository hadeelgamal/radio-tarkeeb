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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200; // Approx height of your dropdown
      setDropUp(spaceBelow < dropdownHeight);
    }

    if (!dropdownRef.current) return;
    gsap.to(dropdownRef.current, {
      opacity: open ? 1 : 0,
      y: open ? 0 : -10,
      pointerEvents: open ? 'auto' : 'none',
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className={`
          relative group border border-white rounded-full px-6 h-12 
          text-white text-base font-medium transition-all duration-200 
          flex items-center justify-center gap-2
          hover:bg-white/10 active:bg-white/20
          ${open ? 'bg-white/10' : ''}
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
          absolute left-0 w-48 rounded-lg bg-black text-white 
          shadow-lg border border-white/10 opacity-0 pointer-events-none overflow-hidden
          ${dropUp ? 'bottom-[calc(100%+8px)]' : 'mt-2'}
        `}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              item.onClick();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 active:bg-white/20 transition-colors duration-200 ease-in-out"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 