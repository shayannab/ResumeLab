import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateResume } from '../services/api';
import JobAnalysisStep from '../components/steps/JobAnalysisStep';
import QuestionsStep from '../components/steps/QuestionsStep';
import ResumePreviewStep from '../components/steps/ResumePreviewStep';
import DownloadStep from '../components/steps/DownloadStep';

function Dashboard() {
  const navigate = useNavigate();
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [jobPosting, setJobPosting] = useState('');
  const [jobAnalysis, setJobAnalysis] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [resumeContent, setResumeContent] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step navigation
  const steps = [
    { id: 1, name: 'Job Analysis', icon: '📄' },
    { id: 2, name: 'Questions', icon: '❓' },
    { id: 3, name: 'Resume Preview', icon: '👁️' },
    { id: 4, name: 'Download', icon: '⬇️' },
  ];

  const handleStepClick = (stepId) => {
    // Only allow navigation to completed steps or next step
    if (stepId <= currentStep || stepId === currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate progress percentage
  const progress = ((currentStep - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-bold text-textPrimary cursor-pointer"
              onClick={() => navigate('/')}
            >
              ResumeAI
            </h1>
            <button 
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-surface border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-textSecondary">
              Step {currentStep} of 4
            </span>
            <span className="text-sm font-medium text-textSecondary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-140px)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-surface border-r border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-textPrimary mb-6">
              Resume Builder
            </h2>
            <nav className="space-y-2">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = step.id < currentStep;
                const isDisabled = step.id > currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={isDisabled}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-success text-white font-medium' 
                        : isCompleted
                        ? 'bg-hover text-textPrimary hover:bg-hover'
                        : isDisabled
                        ? 'bg-white text-textSecondary cursor-not-allowed opacity-50'
                        : 'bg-white text-textPrimary hover:bg-hover border border-border'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{step.icon}</span>
                      <span>{step.name}</span>
                      {isCompleted && (
                        <span className="ml-auto text-success">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Tabs - Top */}
        <div className="md:hidden w-full bg-surface border-b border-border">
          <div className="flex overflow-x-auto">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`
                    flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-success text-white border-b-2 border-success' 
                      : 'text-textSecondary hover:text-textPrimary'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span>{step.icon}</span>
                    <span className="hidden sm:inline">{step.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="card">
              {/* Step Content */}
              {currentStep === 1 && (
                <JobAnalysisStep
                  jobPosting={jobPosting}
                  setJobPosting={setJobPosting}
                  jobAnalysis={jobAnalysis}
                  setJobAnalysis={setJobAnalysis}
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <QuestionsStep
                  jobAnalysis={jobAnalysis}
                  questions={questions}
                  setQuestions={setQuestions}
                  answers={answers}
                  setAnswers={setAnswers}
                  onGenerateResume={async (answersData) => {
                    setLoading(true);
                    setError(null);
                    try {
                      const result = await generateResume(jobAnalysis, answersData);
                      
                      if (result.success) {
                        setResumeContent(result.data.resume);
                        setAtsScore(result.data.score);
                        setSuggestions(result.data.score.suggestions || []);
                        handleNext(); // Move to next step
                      } else {
                        setError(result.error || 'Failed to generate resume');
                      }
                    } catch (err) {
                      setError('Failed to generate resume: ' + (err.message || 'Unknown error'));
                      console.error('Error generating resume:', err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                />
              )}

              {currentStep === 3 && (
                <ResumePreviewStep
                  resumeContent={resumeContent}
                  atsScore={atsScore}
                  suggestions={suggestions}
                  onBack={handleBack}
                  onContinue={handleNext}
                />
              )}

              {currentStep === 4 && (
                <DownloadStep
                  resumeContent={resumeContent}
                  jobAnalysis={jobAnalysis}
                  answers={answers}
                  onStartNew={() => {
                    // Reset all state
                    setCurrentStep(1);
                    setJobPosting('');
                    setJobAnalysis(null);
                    setQuestions([]);
                    setAnswers({});
                    setResumeContent(null);
                    setAtsScore(null);
                    setSuggestions([]);
                    setError(null);
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

