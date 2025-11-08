
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 py-4 mt-8">
      <div className="container mx-auto px-4 md:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} English Vocabulary Master. All rights reserved.</p>
        <p>Created to enhance your learning experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
