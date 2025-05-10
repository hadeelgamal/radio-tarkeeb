import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';

interface GenericButtonProps {
  label: string;
  onClick?: () => void;
  withArrow?: boolean;
  className?: string;
}

export const GenericButton: React.FC<GenericButtonProps> = ({
  label,
  onClick,
  withArrow = false,
  className = '',
}) => {
  const arrowWrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!withArrow || !arrowWrapperRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(arrowWrapperRef.current, {
      x: 24,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });

    const button = arrowWrapperRef.current.closest('button');
    if (button) {
      const enter = () => tl.play();
      const leave = () => tl.reverse();
      button.addEventListener('mouseenter', enter);
      button.addEventListener('mouseleave', leave);

      return () => {
        button.removeEventListener('mouseenter', enter);
        button.removeEventListener('mouseleave', leave);
      };
    }
  }, [withArrow]);

  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative group border border-white rounded-full px-6 h-12 text-white text-base font-medium transition-all flex items-center justify-center',
        className
      )}
    >
      <span>{label}</span>

      {withArrow && (
        <span
          ref={arrowWrapperRef}
          className="absolute right-[-2rem] top-[calc(50%-1px)] -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-white text-white opacity-0 pointer-events-none"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </button>
  );
}; 