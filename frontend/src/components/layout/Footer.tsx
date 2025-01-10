import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-6 dark:border-dark-border dark:bg-dark-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Made with ❣️ by Shivam
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shibbu04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shivamsingh57680"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://shivam04.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};