const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="ui header">
      <div className="content">
        <p>
          <i className="bug icon"></i> Sorry, but we have an error.
        </p>
        <p>{error.message}</p>
        <p>We'll decide problem as soon as possible</p>
        <button onClick={resetErrorBoundary} className="ui button negative">
          Close message
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
