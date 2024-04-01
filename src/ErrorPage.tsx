import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === "string") {
      setErrorMessage(error);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
  }, [error]);

  return (
    <div id="error-page">
      <div className="container mx-auto p-5">
        <div className="flex flex-col items-center">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{errorMessage}</i>
          </p>
        </div>
        <div className="pt-5">
          <Link to="/">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
