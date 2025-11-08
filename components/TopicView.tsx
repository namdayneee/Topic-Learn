
import React from 'react';
import { Topic, WordForm } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PlayIcon } from './icons/PlayIcon';

interface TopicViewProps {
  topic: Topic;
  onStartExercise: () => void;
  onBack: () => void;
}

const WordFormCard: React.FC<{ form: WordForm }> = ({ form }) => (
    <div className="ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 mt-2">
        <p className="font-semibold text-blue-600 dark:text-blue-400">{form.word} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({form.type})</span></p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="italic">{form.pronunciation}</span> - {form.meaning}
        </p>
    </div>
);


const TopicView: React.FC<TopicViewProps> = ({ topic, onStartExercise, onBack }) => {
  return (
    <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="flex items-center px-4 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Back to Topics
            </button>
             <button onClick={onStartExercise} className="flex items-center px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                Start Practice
                <PlayIcon className="w-5 h-5 ml-2" />
            </button>
        </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{topic.title}</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400">{topic.vietnameseTitle}</p>
      </div>

      <div className="space-y-6">
        {topic.vocabulary.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.word} <span className="text-lg font-normal text-slate-500 dark:text-slate-400">({item.type})</span></h3>
            <p className="text-slate-600 dark:text-slate-300 mb-3"><span className="italic">{item.pronunciation}</span> - {item.meaning}</p>
            <p className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md text-slate-700 dark:text-slate-200 italic">"{item.example}"</p>
            {item.relatedForms.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200">Related Forms:</h4>
                    {item.relatedForms.map((form, formIndex) => <WordFormCard key={formIndex} form={form} />)}
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
         <button onClick={onStartExercise} className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors text-lg">
            Start Practice
            <PlayIcon className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TopicView;
