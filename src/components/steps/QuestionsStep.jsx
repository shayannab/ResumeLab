import React, { useEffect, useState } from 'react';
import { generateQuestions as generateQuestionsAPI } from '../../services/api';

function QuestionsStep({ 
  jobAnalysis,
  questions,
  setQuestions,
  answers,
  setAnswers,
  onGenerateResume,
  loading,
  setLoading,
  error,
  setError
}) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Auto-fetch questions when component mounts and jobAnalysis exists
  useEffect(() => {
    if (jobAnalysis && questions.length === 0) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobAnalysis]);

  // Calculate progress
  const requiredQuestions = questions.filter(q => q.required);
  const answeredRequired = requiredQuestions.filter(q => answers[q.id] && answers[q.id].trim() !== '');
  const progress = requiredQuestions.length > 0 
    ? Math.round((answeredRequired.length / requiredQuestions.length) * 100)
    : 0;
  const progressText = `${answeredRequired.length} of ${requiredQuestions.length} required questions answered`;

  // Generate questions from API
  const fetchQuestions = async () => {
    if (!jobAnalysis) return;

    setIsGeneratingQuestions(true);
    setError(null);

    try {
      const result = await generateQuestionsAPI(jobAnalysis);
      
      if (result.success) {
        setQuestions(result.data || []);
      } else {
        setError(result.error || 'Failed to generate questions');
      }
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error('Error generating questions:', err);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateUrl = (url) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateField = (question, value) => {
    if (question.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }

    if (value && value.trim() !== '') {
      switch (question.type) {
        case 'email':
          if (!validateEmail(value)) {
            return 'Please enter a valid email address';
          }
          break;
        case 'tel':
          if (!validatePhone(value)) {
            return 'Please enter a valid phone number';
          }
          break;
        case 'url':
          if (!validateUrl(value)) {
            return 'Please enter a valid URL';
          }
          break;
        case 'number':
          if (isNaN(value) || parseFloat(value) < 0) {
            return 'Please enter a valid number';
          }
          break;
        default:
          break;
      }
    }

    return null;
  };

  // Handle input change with validation
  const handleInputChange = (question, value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    // Real-time validation
    const error = validateField(question, value);
    if (error) {
      setFieldErrors({ ...fieldErrors, [question.id]: error });
    } else {
      const newErrors = { ...fieldErrors };
      delete newErrors[question.id];
      setFieldErrors(newErrors);
    }
  };

  // Handle form submission
  const handleGenerateResume = async () => {
    // Validate all fields
    const errors = {};
    questions.forEach(question => {
      const error = validateField(question, answers[question.id]);
      if (error) {
        errors[question.id] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix all errors before continuing');
      return;
    }

    // Check all required fields are filled
    const missingRequired = questions.filter(
      q => q.required && (!answers[q.id] || answers[q.id].trim() === '')
    );

    if (missingRequired.length > 0) {
      setError(`Please fill in all required fields: ${missingRequired.map(q => q.question).join(', ')}`);
      return;
    }

    // Call parent's generate resume function
    if (onGenerateResume) {
      await onGenerateResume(answers);
    }
  };

  // Don't render if no jobAnalysis
  if (!jobAnalysis) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">Please complete job analysis first.</p>
      </div>
    );
  }

  // Loading state while generating questions
  if (isGeneratingQuestions) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-4"></div>
        <p className="text-textSecondary">Generating personalized questions based on job requirements...</p>
      </div>
    );
  }

  // Render form field based on type
  const renderField = (question) => {
    const hasError = fieldErrors[question.id];
    const value = answers[question.id] || '';

    const baseClasses = `input-field ${hasError ? 'border-error focus:border-error' : ''}`;

    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            className={`${baseClasses} min-h-[100px] resize-y`}
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => handleInputChange(question, e.target.value)}
            required={question.required}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className={baseClasses}
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => handleInputChange(question, e.target.value)}
            required={question.required}
            min="0"
          />
        );
      default:
        return (
          <input
            type={question.type}
            className={baseClasses}
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => handleInputChange(question, e.target.value)}
            required={question.required}
          />
        );
    }
  };

  // Group questions by category
  const groupedQuestions = questions.reduce((acc, q) => {
    const category = q.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(q);
    return acc;
  }, {});

  const categoryLabels = {
    personal: 'Personal Information',
    experience: 'Experience & Achievements',
    skills: 'Skills & Qualifications',
    education: 'Education & Certifications',
    other: 'Additional Information'
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          Step 2: Answer Questions
        </h2>
        <p className="text-textSecondary">
          Please provide the following information to help us create your personalized resume.
        </p>
      </div>

      {/* Progress Indicator */}
      {requiredQuestions.length > 0 && (
        <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-textPrimary">{progressText}</span>
            <span className="text-sm font-medium text-textPrimary">{progress}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      {/* Questions Form - Grouped by Category */}
      <div className="space-y-8">
        {Object.keys(groupedQuestions).map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">
              {categoryLabels[category] || category}
            </h3>
            <div className="space-y-6">
              {groupedQuestions[category].map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-textPrimary mb-2">
                    {question.question}
                    {question.required && <span className="text-error ml-1">*</span>}
                  </label>
                  {renderField(question)}
                  {fieldErrors[question.id] && (
                    <p className="mt-1 text-sm text-error">{fieldErrors[question.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Generate Resume Button */}
      <div className="mt-8 pt-6 border-t border-border">
        <button
          onClick={handleGenerateResume}
          disabled={loading || progress < 100 || Object.keys(fieldErrors).length > 0}
          className={loading || progress < 100 || Object.keys(fieldErrors).length > 0 ? 'btn-disabled w-full md:w-auto' : 'btn-cta w-full md:w-auto'}
        >
          {loading ? 'Generating Resume...' : 'Generate Resume →'}
        </button>
        {progress < 100 && (
          <p className="mt-2 text-sm text-textSecondary">
            Please answer all required questions to continue
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionsStep;
