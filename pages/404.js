import NotFoundIcon from "components/icons/NotFoundIcon";

export default function Custom404() {
  return (
    <div className="not-found-container">
      <div className="not-found-inner">
        <NotFoundIcon />
        <p className="not-found-title">Page not available</p>
        <div className="not-found-description">
          Sorry about that! Please try again later.
        </div>
      </div>
    </div>
  );
}
