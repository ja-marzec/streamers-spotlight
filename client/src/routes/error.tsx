import { useRouteError } from "react-router-dom";

const mapErrorCodes: Record<string, string> = {
  ERR_NETWORK:
    "We will be back soon!",
};

export const ErrorPage = () => {
  const error: any = useRouteError();

  return (
      <div className="error-page">
        <h1 className="header">Oops! Don't panic - this is just error page</h1>
        <p className="info">
          <i>{error.statusText || error.message}</i>
        </p>
        <p className="message">{mapErrorCodes[error?.code] || ""}</p>
      </div>
  );
};
