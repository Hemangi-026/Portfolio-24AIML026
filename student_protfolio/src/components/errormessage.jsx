function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>Couldn't load repositories: {message}</p>
      {/* Supplementary requirement: retry button re-triggers the fetch */}
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;