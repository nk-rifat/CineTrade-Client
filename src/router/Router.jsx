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
import PartnerPaymentPage from "../Pages/BecomeModerator/PartnerPaymentPage";
import AdminRoute from "../routes/AdminRoute";
import MoviePaymentPage from "../Pages/BuyMovie/MoviePaymentPage";
import WatchMovie from "../Pages/MovieDetails/WatchMovie";
import EditProfile from "../Pages/Dashboard/UpdateProfile/EditProfile";

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
        path: "movie/watch/:id",
        element: (
          <PrivateRoute>
            <WatchMovie />
          </PrivateRoute>
        ),
      },
      {
        path: "become-partner",
        element: (
          <PrivateRoute>
            <BecomePartnerPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/partner/:id",
        element: (
          <PrivateRoute>
            <PartnerPaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/movie/:id",
        element: (
          <PrivateRoute>
            <MoviePaymentPage />
          </PrivateRoute>
        ),
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
      { path: "my-movies", element: <MyMovies /> },
      { path: "manage-users", element: <ManageUsers /> },
      {
        path: "partner-applications",
        element: (
          <AdminRoute>
            <PartnerApplications />
          </AdminRoute>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
