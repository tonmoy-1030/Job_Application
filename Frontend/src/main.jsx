import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";
import store from "./store/store";
import Login from "./components/Login/login";
import ChangePassword from './components/Login/ChangePassword'
import Protected from "./components/Protected/Protected";
import Home from "./pages/Home";
import App from "./App";
import Layout from "./components/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Layout layoutStatus>
          <Protected authentication>
            <Home />
          </Protected>
          </Layout>
        ),
      },
      {
        path: "/about",
        element: (
          <Layout layoutStatus>
          <Protected authentication>
            <h1>About</h1>
          </Protected>
          </Layout>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
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
