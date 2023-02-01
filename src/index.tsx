import "@fontsource/roboto";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import { loader as HomeLoader } from "./routes";
import Error from "./routes/error";
import { loader as PostLoader } from "./routes/post";
import Root from "./routes/Root";
import "./styles/";
import theme from "./theme";
const Edit = lazy(() => import("./routes/post/edit"));
const Home = lazy(() => import("./routes"));
const Post = lazy(() => import("./routes/post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <Loader>
            <Home />
          </Loader>
        ),
        loader: HomeLoader,
      },
      {
        path: ":id",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: (
              <Loader>
                <Post />
              </Loader>
            ),
            loader: PostLoader,
          },
          {
            path: "edit",
            element: (
              <Loader>
                <Edit />
              </Loader>
            ),
            loader: PostLoader,
          },
        ],
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
