import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-textPrimary">ResumeAI</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-textSecondary hover:text-accent transition-colors">Features</a>
              <a href="#how-it-works" className="text-textSecondary hover:text-accent transition-colors">How It Works</a>
              <button 
                className="btn-cta"
                onClick={() => navigate('/dashboard')}
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-textPrimary mb-6">
            Build ATS-Optimized Resumes with AI
          </h2>
          <p className="text-lg text-textSecondary mb-8">
            Analyze job postings, generate personalized questions, and create professional resumes 
            that pass ATS filters. Get instant feedback and scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-cta text-lg px-8 py-4"
              onClick={() => navigate('/dashboard')}
            >
              Start Building Resume
            </button>
            <button className="btn-primary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-surface py-16">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-textPrimary text-center mb-12">
            Powerful Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-hover rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-textPrimary mb-2">Job Analysis</h4>
              <p className="text-textSecondary">
                Extract skills, responsibilities, and ATS keywords from any job posting automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-hover rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-textPrimary mb-2">AI Resume Builder</h4>
              <p className="text-textSecondary">
                Generate professional, ATS-optimized resumes tailored to specific job requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-hover rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-textPrimary mb-2">ATS Scoring</h4>
              <p className="text-textSecondary">
                Get instant feedback on your resume with detailed ATS scores and improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-textPrimary text-center mb-12">
            How It Works
          </h3>
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-textPrimary mb-2">Paste Job Posting</h4>
                <p className="text-textSecondary">
                  Copy and paste the job description. Our AI analyzes it to extract key requirements, skills, and ATS keywords.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-textPrimary mb-2">Answer Questions</h4>
                <p className="text-textSecondary">
                  Fill out personalized questions about your experience, skills, and achievements based on the job requirements.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-textPrimary mb-2">Generate Resume</h4>
                <p className="text-textSecondary">
                  Our AI creates a professional, ATS-optimized resume tailored to the job. Get instant ATS score and suggestions.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-textPrimary mb-2">Export & Apply</h4>
                <p className="text-textSecondary">
                  Download your resume in PDF, Word, or plain text format. All formats are ATS-friendly and ready to submit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16">
        <div className="container-custom text-center">
          <h3 className="text-3xl font-bold text-textPrimary mb-4">
            Ready to Build Your Perfect Resume?
          </h3>
          <p className="text-textSecondary mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have created ATS-optimized resumes and landed their dream jobs.
          </p>
          <button 
            className="btn-cta text-lg px-8 py-4"
            onClick={() => navigate('/dashboard')}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-textSecondary text-sm mb-4 md:mb-0">
              © 2024 ResumeAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-textSecondary hover:text-accent text-sm transition-colors">Privacy</a>
              <a href="#" className="text-textSecondary hover:text-accent text-sm transition-colors">Terms</a>
              <a href="#" className="text-textSecondary hover:text-accent text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

