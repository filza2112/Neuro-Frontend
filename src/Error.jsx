import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log it silently if needed
    // console.error("Caught in boundary:", error);
  }

  render() {
    if (this.state.hasError) return null; // or fallback UI
    return this.props.children;
  }
}

export default ErrorBoundary;
