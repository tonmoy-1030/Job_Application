import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";
import store from "./store/store";
import Login from "./components/Login/login";
import Protected from "./components/Protected/Protected";
import Home from "./pages/Home";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/about",
        element: (
          <Protected authentication>
            <h1>About</h1>
          </Protected>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
