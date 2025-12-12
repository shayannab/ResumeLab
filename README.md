# ResumeLab 🚀

AI-powered resume builder that creates ATS-optimized resumes tailored to specific job postings.

![ResumeLab](https://img.shields.io/badge/React-18.x-blue) ![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Smart Job Analysis** - AI-powered extraction of skills, keywords, and requirements from any job posting
- **ATS Optimization** - Generate resumes that pass Applicant Tracking Systems with high scores
- **Cover Letter Generator** - AI-generated personalized cover letters for each application
- **Skills Gap Analysis** - Identify missing skills and get recommendations
- **Salary Insights** - Estimated salary ranges based on role and experience
- **Multiple Export Formats** - Download as PDF, DOCX, or TXT

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shayannab/get-that-job.git
   cd get-that-job
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3001
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Animations**: Custom Antigravity particles, Lucide icons
- **Routing**: React Router v6
- **API**: Axios
- **Export**: PDF generation, DOCX support

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── steps/           # Dashboard workflow steps
│   └── LandingPage.js   # Main landing page
├── pages/
│   ├── Dashboard.jsx    # Resume builder workflow
│   ├── Privacy.jsx      # Privacy policy
│   └── Terms.jsx        # Terms of service
├── services/
│   └── api.js           # API client
└── App.js               # Root component
```

## 🎯 How It Works

1. **Paste a Job Posting** - Copy any job description
2. **Answer Questions** - Fill out personalized questions about your experience
3. **Generate Resume** - Get an ATS-optimized resume with instant scoring
4. **Download & Apply** - Export in your preferred format

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://resumelab.app) *(coming soon)*
- [Twitter/X](https://x.com/shayanna_0)
- [GitHub](https://github.com/shayannab)

---

Made with ❤️ by [@shayannab](https://github.com/shayannab)
