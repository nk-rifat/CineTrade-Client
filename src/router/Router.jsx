import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import LoginPage from "../Pages/Authentication/Login/LoginPage";
import RegisterPage from "../Pages/Authentication/Register/RegisterPage";
import MoviesByGenres from "../Pages/Home/Genres/MovieListByGenres";
import AllMovies from "../Pages/AllMovies/AllMovies";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "/movies",
        element: <MoviesByGenres />,
      },
      {
        path: "/all-movies",
        element: <AllMovies />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);
