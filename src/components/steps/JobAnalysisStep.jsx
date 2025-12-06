import React from 'react';
import { analyzeJob } from '../../services/api';

function JobAnalysisStep({ 
  jobPosting, 
  setJobPosting, 
  jobAnalysis, 
  setJobAnalysis,
  loading,
  setLoading,
  error,
  setError,
  onNext 
}) {
  const handleAnalyze = async () => {
    if (!jobPosting.trim()) {
      setError('Please paste a job posting');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeJob(jobPosting);
      
      if (result.success) {
        setJobAnalysis(result.data);
      } else {
        setError(result.error || 'Failed to analyze job posting');
      }
    } catch (err) {
      setError('Failed to analyze job posting. Please try again.');
      console.error('Error analyzing job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          Step 1: Job Analysis
        </h2>
        <p className="text-textSecondary">
          Paste the job posting below. Our AI will extract key requirements, skills, and ATS keywords.
        </p>
      </div>

      {/* Job Posting Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textPrimary mb-2">
          Job Posting Text
        </label>
        <textarea
          className="input-field min-h-[300px] resize-y"
          placeholder="Paste the complete job description here..."
          value={jobPosting}
          onChange={(e) => setJobPosting(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      {/* Analyze Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={loading || !jobPosting.trim()}
          className={loading || !jobPosting.trim() ? 'btn-disabled' : 'btn-cta'}
        >
          {loading ? 'Analyzing...' : 'Analyze Job Posting'}
        </button>
      </div>

      {/* Job Analysis Results */}
      {jobAnalysis && (
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            Analysis Results
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-textPrimary mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {jobAnalysis.requiredSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-hover text-textPrimary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-textPrimary mb-2">Job Level</h4>
              <p className="text-textSecondary capitalize">{jobAnalysis.jobLevel}</p>
            </div>

            <div>
              <h4 className="font-medium text-textPrimary mb-2">Industry</h4>
              <p className="text-textSecondary">{jobAnalysis.industry}</p>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={onNext} className="btn-cta">
              Continue to Questions →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobAnalysisStep;

