/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color scheme - NO BLUE/PURPLE
        background: '#FFFFFF',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        accent: '#059669',
        hover: '#D1FAE5',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}

