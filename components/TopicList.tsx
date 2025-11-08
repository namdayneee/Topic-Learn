
import React from 'react';
import { Topic } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface TopicListProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, onSelectTopic }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-700 dark:text-slate-200">Choose a Topic to Learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="group bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-4">
                 <BookOpenIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{`Topic ${topic.id}`}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{topic.vietnameseTitle}</p>
              </div>
            </div>
            <p className="text-md font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {topic.title.split(': ')[1] || topic.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicList;
