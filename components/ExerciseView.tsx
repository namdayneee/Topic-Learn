
import React, { useState, useMemo } from 'react';
import { Topic } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ExerciseViewProps {
  topic: Topic;
  onBack: () => void;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({ topic, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = useMemo(() => topic.exercises[currentQuestionIndex], [topic.exercises, currentQuestionIndex]);

  const handleAnswerSelect = (answerLetter: string) => {
    if (showExplanation) return;

    setSelectedAnswer(answerLetter);
    setShowExplanation(true);
    if (answerLetter === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < topic.exercises.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };
  
  const getButtonClass = (optionLetter: string) => {
    if (!showExplanation) {
        return 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
    }
    if (optionLetter === currentQuestion.correctAnswer) {
        return 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
    }
    if (optionLetter === selectedAnswer && optionLetter !== currentQuestion.correctAnswer) {
        return 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
    }
    return 'bg-white dark:bg-slate-700';
  };

  if (isFinished) {
    const percentage = Math.round((score / topic.exercises.length) * 100);
    return (
      <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">Your Score: <span className="font-bold text-blue-500">{score} / {topic.exercises.length}</span></p>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="text-2xl font-semibold mb-6">{percentage}%</p>
        <div className="flex justify-center space-x-4">
          <button onClick={handleRestart} className="flex items-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            <RefreshIcon className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <button onClick={onBack} className="flex items-center px-6 py-2 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 transition-colors">
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <div className="flex justify-start mb-6">
            <button onClick={onBack} className="flex items-center px-4 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Back to Topic
            </button>
        </div>
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400">{topic.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">Question {currentQuestionIndex + 1} of {topic.exercises.length}</p>
        </div>
        
        <p className="text-xl text-slate-700 dark:text-slate-200 mb-6 min-h-[6rem]">{currentQuestion.question}</p>
        
        <div className="space-y-4">
          {currentQuestion.options.map(option => (
            <button 
              key={option.letter}
              onClick={() => handleAnswerSelect(option.letter)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex items-center ${getButtonClass(option.letter)}`}
            >
              <span className="font-bold mr-4">{option.letter}.</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`mt-6 p-4 rounded-lg animate-fade-in ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 dark:bg-green-900/50' : 'bg-red-50 dark:bg-red-900/50'}`}>
            <div className="flex items-start">
              {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"/> : <XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"/> }
              <div>
                <h3 className="font-bold text-lg mb-1">{selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}</h3>
                <p className="text-slate-600 dark:text-slate-300">{currentQuestion.explanation}</p>
              </div>
            </div>
             <button onClick={handleNext} className="mt-4 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors text-lg">
                {currentQuestionIndex < topic.exercises.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseView;
