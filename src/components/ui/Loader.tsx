import "./cloudberry-loader.css";

export default function CloudberryLoader() {
  return (
    <div className="cloudberry-loader-container">
      <div className="cloudberry-spinner"></div>
      <h1 className="cloudberry-text">
        <span>CLOUD</span><span>BERRY</span>
      </h1>
      <p className="cloudberry-sub">Loading...</p>
    </div>
  );
}
