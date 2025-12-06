import React from 'react';
import { FiEdit2, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiAward, FiFileText } from 'react-icons/fi';

function ResumePreviewStep({ 
  resumeContent,
  atsScore,
  suggestions,
  onBack,
  onContinue
}) {
  // Get score badge class based on score
  const getScoreBadgeClass = (score) => {
    if (score >= 86) return 'score-excellent';
    if (score >= 76) return 'score-good';
    if (score >= 61) return 'score-fair';
    return 'score-poor';
  };

  // Get score label
  const getScoreLabel = (score) => {
    if (score >= 86) return 'Excellent';
    if (score >= 76) return 'Good';
    if (score >= 61) return 'Fair';
    return 'Poor';
  };

  // Get score color for progress bars
  const getScoreColor = (score) => {
    if (score >= 86) return 'bg-accent';
    if (score >= 76) return 'bg-success';
    if (score >= 61) return 'bg-warning';
    return 'bg-error';
  };

  if (!resumeContent || !atsScore) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">No resume content available. Please generate a resume first.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          Step 3: Resume Preview
        </h2>
        <p className="text-textSecondary">
          Review your generated resume and ATS score below.
        </p>
      </div>

      {/* Two Column Layout: Resume Left, Score Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Preview - Left Column (2/3 on desktop) */}
        <div className="lg:col-span-2">
          <div className="card resume-preview">
            <div className="mb-6 pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-textPrimary">Resume Preview</h3>
            </div>

            {/* Summary Section */}
            {resumeContent.summary && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-textPrimary mb-2">Professional Summary</h4>
                <p className="text-textSecondary leading-relaxed">{resumeContent.summary}</p>
              </div>
            )}

            {/* Experience Section */}
            {resumeContent.experience && resumeContent.experience.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-textPrimary mb-4">Professional Experience</h4>
                <div className="space-y-6">
                  {resumeContent.experience.map((exp, idx) => {
                    // Clean bullet text - remove any leading *, •, or whitespace
                    const cleanBullets = (exp.bullets || []).map(bullet => {
                      if (typeof bullet !== 'string') return String(bullet || '');
                      return bullet
                        .replace(/^[\s*•\-]+/, '') // Remove leading whitespace, *, •, or -
                        .trim();
                    });

                    return (
                      <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div>
                            <h5 className="text-base font-semibold text-textPrimary">{exp.role}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-textSecondary">{exp.company}</span>
                              {exp.duration && (
                                <>
                                  <span className="text-textSecondary">|</span>
                                  <span className="text-sm text-textSecondary">{exp.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {cleanBullets.length > 0 && (
                          <ul className="mt-3 space-y-2 list-disc list-inside">
                            {cleanBullets.map((bullet, i) => (
                              <li key={i} className="text-sm text-textSecondary leading-relaxed">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {resumeContent.skills && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-textPrimary mb-4">Technical Skills</h4>
                <div className="space-y-4">
                  {/* Programming Languages */}
                  {resumeContent.skills.languages && resumeContent.skills.languages.length > 0 && (
                    <div className="skill-category">
                      <h5 className="text-sm font-medium text-textPrimary mb-2">Programming Languages</h5>
                      <div className="skill-badges flex flex-wrap gap-1">
                        {resumeContent.skills.languages.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="badge px-3 py-1.5 bg-[#D1FAE5] text-[#047857] rounded-full text-sm font-medium m-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frameworks & Libraries */}
                  {resumeContent.skills.frameworks && resumeContent.skills.frameworks.length > 0 && (
                    <div className="skill-category">
                      <h5 className="text-sm font-medium text-textPrimary mb-2">Frameworks & Libraries</h5>
                      <div className="skill-badges flex flex-wrap gap-1">
                        {resumeContent.skills.frameworks.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="badge px-3 py-1.5 bg-[#D1FAE5] text-[#047857] rounded-full text-sm font-medium m-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Databases */}
                  {resumeContent.skills.databases && resumeContent.skills.databases.length > 0 && (
                    <div className="skill-category">
                      <h5 className="text-sm font-medium text-textPrimary mb-2">Databases</h5>
                      <div className="skill-badges flex flex-wrap gap-1">
                        {resumeContent.skills.databases.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="badge px-3 py-1.5 bg-[#D1FAE5] text-[#047857] rounded-full text-sm font-medium m-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cloud & DevOps */}
                  {resumeContent.skills.cloud && resumeContent.skills.cloud.length > 0 && (
                    <div className="skill-category">
                      <h5 className="text-sm font-medium text-textPrimary mb-2">Cloud & DevOps</h5>
                      <div className="skill-badges flex flex-wrap gap-1">
                        {resumeContent.skills.cloud.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="badge px-3 py-1.5 bg-[#D1FAE5] text-[#047857] rounded-full text-sm font-medium m-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {resumeContent.skills.tools && resumeContent.skills.tools.length > 0 && (
                    <div className="skill-category">
                      <h5 className="text-sm font-medium text-textPrimary mb-2">Tools</h5>
                      <div className="skill-badges flex flex-wrap gap-1">
                        {resumeContent.skills.tools.map((tool, idx) => (
                          <span 
                            key={idx} 
                            className="badge px-3 py-1.5 bg-[#D1FAE5] text-[#047857] rounded-full text-sm font-medium m-1"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education Section */}
            {resumeContent.education && resumeContent.education.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-textPrimary mb-4">Education</h4>
                <div className="space-y-3">
                  {resumeContent.education.map((edu, idx) => (
                    <div key={idx}>
                      <h5 className="text-base font-medium text-textPrimary">{edu.degree}</h5>
                      <p className="text-sm text-textSecondary">{edu.institution}</p>
                      {edu.year && (
                        <p className="text-sm text-textSecondary">{edu.year}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Sections */}
            {resumeContent.additionalSections && resumeContent.additionalSections.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                {resumeContent.additionalSections.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="text-lg font-semibold text-textPrimary mb-2">{section.title}</h4>
                    {section.content && (
                      <p className="text-textSecondary">{section.content}</p>
                    )}
                    {section.items && (
                      <ul className="list-disc list-inside text-textSecondary space-y-1">
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ATS Score & Analysis - Right Column (1/3 on desktop) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Large ATS Score Display */}
          <div className={`card p-6 text-center ${getScoreBadgeClass(atsScore.overallScore)}`}>
            <div className="mb-2">
              <FiAward className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium opacity-90">ATS Score</p>
            </div>
            <div className="text-5xl font-bold mb-1">
              {atsScore.overallScore}
            </div>
            <div className="text-lg font-semibold opacity-90">
              {getScoreLabel(atsScore.overallScore)}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="card">
            <h4 className="text-lg font-semibold text-textPrimary mb-4">Score Breakdown</h4>
            <div className="space-y-4">
              {/* Keyword Match */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-textPrimary">Keyword Match</span>
                  <span className="text-sm font-semibold text-textPrimary">
                    {atsScore.keywordMatchScore || 0}%
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(atsScore.keywordMatchScore || 0)}`}
                    style={{ width: `${atsScore.keywordMatchScore || 0}%` }}
                  />
                </div>
              </div>

              {/* Skills Coverage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-textPrimary">Skills Coverage</span>
                  <span className="text-sm font-semibold text-textPrimary">
                    {atsScore.skillsCoverageScore || 0}%
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(atsScore.skillsCoverageScore || 0)}`}
                    style={{ width: `${atsScore.skillsCoverageScore || 0}%` }}
                  />
                </div>
              </div>

              {/* Content Quality */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-textPrimary">Content Quality</span>
                  <span className="text-sm font-semibold text-textPrimary">
                    {atsScore.contentQualityScore || 0}%
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(atsScore.contentQualityScore || 0)}`}
                    style={{ width: `${atsScore.contentQualityScore || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Missing Keywords */}
          {atsScore.missingKeywords && atsScore.missingKeywords.length > 0 && (
            <div className="card border-warning">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertCircle className="text-warning" />
                <h4 className="text-lg font-semibold text-textPrimary">Missing Keywords</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {atsScore.missingKeywords.map((keyword, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-warning/10 text-warning rounded text-xs border border-warning/30"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {atsScore.missingSkills && atsScore.missingSkills.length > 0 && (
            <div className="card border-warning">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertCircle className="text-warning" />
                <h4 className="text-lg font-semibold text-textPrimary">Missing Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {atsScore.missingSkills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-warning/10 text-warning rounded text-xs border border-warning/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 card border-warning">
          <div className="flex items-center gap-2 mb-4">
            <FiTrendingUp className="text-warning text-xl" />
            <h3 className="text-lg font-semibold text-textPrimary">Suggestions for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FiCheckCircle className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-textSecondary">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <button 
          onClick={onBack}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <FiEdit2 />
          Edit Answers
        </button>
        <button 
          onClick={onContinue}
          className="btn-cta flex items-center justify-center gap-2"
        >
          Continue to Download
          <FiFileText />
        </button>
      </div>
    </div>
  );
}

export default ResumePreviewStep;
