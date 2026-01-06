/**
 * Landing page - public entry point for the application.
 * Shows welcome message with links to login/register.
 */

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
              Todo App
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              Your Personal Productivity Hub
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Organize tasks, set priorities, track deadlines, and achieve more with our powerful task management system.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-indigo-500/30 backdrop-blur-sm text-white font-bold text-lg rounded-xl border-2 border-white/50 hover:bg-indigo-500/40 transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Set Priorities
              </h3>
              <p className="text-white/80">
                High, medium, or low - organize tasks by importance and never miss what matters most.
              </p>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200">
              <div className="text-5xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Tag & Organize
              </h3>
              <p className="text-white/80">
                Use tags to categorize tasks - work, personal, urgent, or create your own custom tags.
              </p>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Track Deadlines
              </h3>
              <p className="text-white/80">
                Set due dates and recurring tasks with automatic overdue detection to stay on schedule.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white/90 text-sm font-semibold">Quick Toggle</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-white/90 text-sm font-semibold">Smart Search</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-2">🔄</div>
              <p className="text-white/90 text-sm font-semibold">Recurring Tasks</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-white/90 text-sm font-semibold">Mobile Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
