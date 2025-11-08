
import React, { useState, useCallback } from 'react';
import { Topic } from './types';
import { topics } from './data/vocabularyData';
import TopicList from './components/TopicList';
import TopicView from './components/TopicView';
import ExerciseView from './components/ExerciseView';
import Header from './components/Header';
import Footer from './components/Footer';

type View = 'list' | 'topic' | 'exercise';

const App: React.FC = () => {
  const [view, setView] = useState<View>('list');
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const handleSelectTopic = useCallback((topic: Topic) => {
    setCurrentTopic(topic);
    setView('topic');
  }, []);

  const handleStartExercise = useCallback(() => {
    if (currentTopic) {
      setView('exercise');
    }
  }, [currentTopic]);

  const handleBackToList = useCallback(() => {
    setCurrentTopic(null);
    setView('list');
  }, []);

  const handleBackToTopic = useCallback(() => {
    setView('topic');
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'topic':
        return currentTopic && <TopicView topic={currentTopic} onStartExercise={handleStartExercise} onBack={handleBackToList} />;
      case 'exercise':
        return currentTopic && <ExerciseView topic={currentTopic} onBack={handleBackToTopic} />;
      case 'list':
      default:
        return <TopicList topics={topics} onSelectTopic={handleSelectTopic} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200">
      <Header onHomeClick={handleBackToList} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
