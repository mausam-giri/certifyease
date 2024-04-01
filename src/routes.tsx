import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Template from "./pages/Template";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "template",
    element: <Template />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default appRoutes;
