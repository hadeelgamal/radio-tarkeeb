import React from 'react';

const PillButtonWithHoverIcon: React.FC = () => {
  return (
    <button className="group relative flex items-center gap-4 bg-white rounded-full px-6 py-3 text-black font-medium transition duration-300 overflow-visible">
      More Episode
      <span
        className="absolute -right-6 group-hover:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-in-out z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 stroke-2 stroke-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
};

export default PillButtonWithHoverIcon; 