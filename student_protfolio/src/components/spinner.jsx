function Spinner() {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading repositories...</p>
    </div>
  );
}

export default Spinner;