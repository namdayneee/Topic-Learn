
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={onHomeClick}
        >
          <BookOpenIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            English Vocabulary Master
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
