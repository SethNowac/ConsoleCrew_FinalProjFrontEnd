import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A higher-order component that catches errors in its children components and displays a fallback UI.
 * @component
 * @param {Object} props
 * @param {JSX.Element} props.children - The child components to be wrapped by the error boundary.
 * @param {JSX.Element} props.fallback - The fallback UI to be displayed when an error is caught.
 * @returns {JSX.Element}
*/
function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);
  return (
    /** The class component error boundary is a child of the functional component.  */
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError} fallback={fallback}>
      {children}
    </ErrorBoundaryInner>
  );
}

/**
 * A class component that catches errors in its children components and updates the error state.
 * @component
 * @param {Object} props
 * @param {Boolean} props.hasError - A boolean indicating whether an error has been caught.
 * @param {Function} props.setHasError - A function to update the hasError state in the parent component.
 * @param {JSX.Element} props.fallback - The fallback UI to be displayed when an error is caught.
 * @returns {JSX.Element} - The wrapped child components or the fallback UI if an error was caught.
*/
class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  /**
   * Updates the state when an error is caught.
   * @static
   * @param {Error} _error - The caught error.
   * @returns {Object} - The updated state.
   */
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }
  /**
   * Resets the error state when the hasError prop changes from true to false.
   * @param {Object} prevProps - The previous props.
   * @param {Object} _previousState - The previous state.
   */
  componentDidUpdate(prevProps, _previousState) {
    if (!this.props.hasError && prevProps.hasError) {
      this.setState({ hasError: false });
    }
  }
  /**
   * Updates the hasError state in the parent component when an error is caught.
   * @param {Error} _error - The caught error.
   * @param {Object} _errorInfo - Additional information about the error.
   */
  componentDidCatch(_error, _errorInfo) {
    this.props.setHasError(true);
  }
  /**
   * Renders the child components wrapped in the error boundary, or the fallback UI if an error was caught.
   * @returns {JSX.Element} - The wrapped child components or the fallback UI if an error was caught.
   */
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
export default ErrorBoundary;
