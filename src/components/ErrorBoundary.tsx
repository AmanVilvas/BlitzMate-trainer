import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    // Clear localStorage and reload
    localStorage.clear();
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#161512] flex items-center justify-center text-white p-4 font-sans">
          <div className="bg-[#262421] p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#333] text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-[#cc3333] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-400 mb-6 text-sm">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-[#D4A024] hover:bg-[#e6b033] text-white font-bold py-3 rounded transition-all"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full bg-[#404040] hover:bg-[#505050] text-white font-medium py-3 rounded transition-all text-sm"
              >
                Reset & Clear Data
              </button>
            </div>
            
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 p-4 bg-[#161512] rounded text-left overflow-auto max-h-32">
                <p className="text-xs text-red-400 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
