import { useRef, useState, useEffect } from 'react';

interface SmartDropdownMenuProps {
  buttonLabel: string;
  items: string[];
}

const getMenuPosition = (
  buttonRect: DOMRect,
  menuHeight: number,
  menuWidth: number
): { top: number; left: number } => {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Default: open below
  let top = buttonRect.bottom;
  let left = buttonRect.left;

  // If not enough space below, open above
  if (buttonRect.bottom + menuHeight > viewportHeight && buttonRect.top - menuHeight > 0) {
    top = buttonRect.top - menuHeight;
  }

  // If not enough space to the right, align to the right edge
  if (buttonRect.left + menuWidth > viewportWidth) {
    left = buttonRect.right - menuWidth;
  }

  // If not enough space to the left, align to the left edge
  if (left < 0) {
    left = 0;
  }

  return { top, left };
};

const SmartDropdownMenu = ({ buttonLabel, items }: SmartDropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      setMenuStyle(getMenuPosition(buttonRect, menuRect.height, menuRect.width));
    }
  }, [open]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        className={`group flex items-center gap-2 bg-white rounded-full px-6 py-3 text-black font-medium transition duration-300 shadow hover:bg-gray-100 focus:outline-none ${open ? 'ring-2 ring-sky-300' : ''}`}
        type="button"
        tabIndex={0}
      >
        {buttonLabel}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute z-50 min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg py-2 mt-2"
          style={{ top: menuStyle.top, left: menuStyle.left, position: 'fixed' }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="px-6 py-2 hover:bg-sky-50 cursor-pointer whitespace-nowrap rounded-full transition"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartDropdownMenu; 