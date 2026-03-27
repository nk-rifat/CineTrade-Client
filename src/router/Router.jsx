import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import LoginPage from "../Pages/Authentication/Login/LoginPage";
import RegisterPage from "../Pages/Authentication/Register/RegisterPage";
import MoviesByGenres from "../Pages/Home/Genres/MovieListByGenres";
import AllMovies from "../Pages/AllMovies/AllMovies";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import BecomePartnerPage from "../Pages/BecomeModerator/BecomePartnerPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyMovies from "../Pages/Dashboard/MyMovies/MyMovies";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import PartnerApplications from "../Pages/Dashboard/PartnerApplications/PartnerApplications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "movies",
        element: <MoviesByGenres />,
      },
      {
        path: "all-movies",
        element: <AllMovies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "become-partner",
        element: <BecomePartnerPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "myMovies", element: <MyMovies /> },
      { path: "manageUsers", element: <ManageUsers /> },
      { path: "partnerApplications", element: <PartnerApplications /> },
    ],
  },
]);
