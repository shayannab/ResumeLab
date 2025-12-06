import React, { useState } from 'react';
import { FiDownload, FiFile, FiFileText, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { exportResume, downloadBlob } from '../../services/api';

function DownloadStep({ 
  resumeContent,
  jobAnalysis,
  answers,
  onStartNew
}) {
  const [downloading, setDownloading] = useState({
    pdf: false,
    docx: false,
    txt: false,
    all: false
  });
  const [downloaded, setDownloaded] = useState({
    pdf: false,
    docx: false,
    txt: false
  });
  const [error, setError] = useState(null);

  const downloadFormats = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Best for ATS systems and professional applications',
      icon: FiFile,
      iconColor: 'text-error',
      badge: 'Most Popular',
      filename: 'resume.pdf'
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Editable format for easy customization',
      icon: FiFileText,
      iconColor: 'text-textSecondary',
      filename: 'resume.docx'
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'Simple text format for online applications',
      icon: FiFileText,
      iconColor: 'text-textPrimary',
      filename: 'resume.txt'
    }
  ];

  const handleDownload = async (format) => {
    if (!resumeContent) {
      setError('No resume content available');
      return;
    }

    setError(null);
    setDownloading(prev => ({ ...prev, [format]: true }));

    try {
      const result = await exportResume(resumeContent, jobAnalysis, answers, format);
      
      if (result.success) {
        const formatData = downloadFormats.find(f => f.id === format);
        downloadBlob(result.data, formatData.filename);
        
        setDownloaded(prev => ({ ...prev, [format]: true }));
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setDownloaded(prev => ({ ...prev, [format]: false }));
        }, 3000);
      } else {
        setError(result.error || `Failed to download ${format.toUpperCase()}`);
      }
    } catch (err) {
      setError(`Failed to download ${format.toUpperCase()}: ${err.message}`);
    } finally {
      setDownloading(prev => ({ ...prev, [format]: false }));
    }
  };

  const handleDownloadAll = async () => {
    if (!resumeContent) {
      setError('No resume content available');
      return;
    }

    setError(null);
    setDownloading(prev => ({ ...prev, all: true }));

    try {
      // Download all formats sequentially
      for (const format of ['pdf', 'docx', 'txt']) {
        try {
          const result = await exportResume(resumeContent, jobAnalysis, answers, format);
          
          if (result.success) {
            const formatData = downloadFormats.find(f => f.id === format);
            downloadBlob(result.data, formatData.filename);
            
            // Small delay between downloads
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            console.error(`Failed to download ${format}:`, result.error);
          }
        } catch (err) {
          console.error(`Failed to download ${format}:`, err);
        }
      }
      
      setDownloaded({ pdf: true, docx: true, txt: true });
      setTimeout(() => {
        setDownloaded({ pdf: false, docx: false, txt: false });
      }, 3000);
    } catch (err) {
      setError(`Failed to download all formats: ${err.message}`);
    } finally {
      setDownloading(prev => ({ ...prev, all: false }));
    }
  };

  const handleStartNew = () => {
    if (onStartNew) {
      onStartNew();
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          Step 4: Download Resume
        </h2>
        <p className="text-textSecondary">
          Download your ATS-optimized resume in your preferred format.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      {/* Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {downloadFormats.map((format) => {
          const Icon = format.icon;
          const isDownloading = downloading[format.id] || downloading.all;
          const isDownloaded = downloaded[format.id];

          return (
            <div
              key={format.id}
              className={`
                card relative transition-all duration-200
                ${isDownloading ? 'opacity-75' : 'hover:shadow-lg hover:-translate-y-1'}
                ${isDownloaded ? 'border-success border-2' : ''}
              `}
            >
              {/* Badge for PDF */}
              {format.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-success text-white text-xs font-semibold rounded-full">
                    {format.badge}
                  </span>
                </div>
              )}

              <div className="text-center">
                {/* Icon */}
                <div className={`mb-4 flex justify-center ${format.iconColor}`}>
                  {isDownloaded ? (
                    <FiCheckCircle className="w-16 h-16 text-success" />
                  ) : isDownloading ? (
                    <div className="relative">
                      <Icon className="w-16 h-16 opacity-50" />
                      <FiRefreshCw className="w-8 h-8 text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                    </div>
                  ) : (
                    <Icon className="w-16 h-16" />
                  )}
                </div>

                {/* Format Name */}
                <h3 className="text-xl font-semibold text-textPrimary mb-2">
                  {format.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-textSecondary mb-6 min-h-[40px]">
                  {format.description}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(format.id)}
                  disabled={isDownloading || downloading.all}
                  className={`
                    w-full py-3 px-4 rounded-lg font-medium transition-colors
                    ${isDownloading || downloading.all
                      ? 'bg-surface text-textSecondary cursor-not-allowed'
                      : isDownloaded
                      ? 'bg-success text-white'
                      : 'btn-cta'
                    }
                  `}
                >
                  {isDownloaded ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheckCircle />
                      Downloaded
                    </span>
                  ) : isDownloading ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiRefreshCw className="animate-spin" />
                      Downloading...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FiDownload />
                      Download
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Download All Button */}
      <div className="mb-8">
        <button
          onClick={handleDownloadAll}
          disabled={downloading.all || downloading.pdf || downloading.docx || downloading.txt}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold transition-colors
            ${downloading.all || downloading.pdf || downloading.docx || downloading.txt
              ? 'bg-surface text-textSecondary cursor-not-allowed'
              : 'btn-cta'
            }
          `}
        >
          {downloading.all ? (
            <span className="flex items-center justify-center gap-2">
              <FiRefreshCw className="animate-spin" />
              Downloading All Formats...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FiDownload />
              Download All Formats
            </span>
          )}
        </button>
      </div>

      {/* Success Message */}
      {downloaded.pdf && downloaded.docx && downloaded.txt && (
        <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg">
          <p className="text-textPrimary flex items-center gap-2">
            <FiCheckCircle className="text-success" />
            <strong>Success!</strong> All formats downloaded successfully.
          </p>
        </div>
      )}

      {/* Completion Message */}
      <div className="mb-8 p-6 bg-surface rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-textPrimary mb-2">
          🎉 Congratulations!
        </h3>
        <p className="text-textSecondary mb-4">
          Your ATS-optimized resume is ready. Download it in your preferred format above and start applying to your dream job!
        </p>
        <div className="text-sm text-textSecondary space-y-1">
          <p>• All formats are ATS-friendly</p>
          <p>• PDF is recommended for most applications</p>
          <p>• Word format allows easy editing</p>
        </div>
      </div>

      {/* Start New Resume Button */}
      <div className="flex justify-center">
        <button
          onClick={handleStartNew}
          className="btn-primary flex items-center gap-2"
        >
          <FiRefreshCw />
          Start New Resume
        </button>
      </div>
    </div>
  );
}

export default DownloadStep;
