import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Authentication/Login/LoginPage";
import RegisterPage from "../Pages/Authentication/Register/RegisterPage";
import MoviesByGenres from "../Pages/Home/Genres/MovieListByGenres";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import PrivilegedRoute from "../routes/PrivilegedRoute";
import AllMovies from "../Pages/all-movies/AllMovies";
import MovieDetails from "../Pages/movie-details/MovieDetails";
import BecomePartnerPage from "../Pages/become-moderator/BecomePartnerPage";
import MyMovies from "../Pages/dashboard/my-movies/MyMovies";
import ManageUsers from "../Pages/dashboard/manage-users/ManageUsers";
import PartnerApplications from "../Pages/dashboard/partner-applications/PartnerApplications";
import PartnerPaymentPage from "../Pages/become-moderator/PartnerPaymentPage";
import MoviePaymentPage from "../Pages/buy-movie/MoviePaymentPage";
import WatchMovie from "../Pages/movie-details/WatchMovie";
import EditProfile from "../Pages/dashboard/update-profile/EditProfile";
import AddMovie from "../Pages/dashboard/add-new-movie/AddNewMovie";
import PendingMovies from "../Pages/dashboard/partner-pending-movies/PendingMovies";
import DashboardHome from "../Pages/dashboard/dashboard-home/DashboardHome";
import UploadedMovies from "../Pages/dashboard/uploaded-movies/UploadedMovies";
import ManageMovies from "../Pages/dashboard/manage-movies/ManageMovies";
import PendingMoviesApproval from "../Pages/dashboard/pending-movies-approval/PendingMoviesApproval";
import EditMovie from "../components/edit-movie/EditMovie";

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
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-movies",
        element: <MyMovies />,
      },
      {
        path: "manage-users",
        element: (
          <PrivilegedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </PrivilegedRoute>
        ),
      },
      {
        path: "partner-applications",
        element: (
          <PrivilegedRoute allowedRoles={["admin"]}>
            <PartnerApplications />
          </PrivilegedRoute>
        ),
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "add-movie",
        element: (
          <PrivilegedRoute allowedRoles={["admin", "partner"]}>
            <AddMovie />
          </PrivilegedRoute>
        ),
      },
      {
        path: "pending-movies",
        element: (
          <PrivilegedRoute allowedRoles={["partner"]}>
            <PendingMovies />
          </PrivilegedRoute>
        ),
      },
      {
        path: "uploaded-movies",
        element: (
          <PrivilegedRoute allowedRoles={["partner"]}>
            <UploadedMovies />
          </PrivilegedRoute>
        ),
      },
      {
        path: "edit-movie/:id",
        element: (
          <PrivilegedRoute allowedRoles={["admin", "partner"]}>
            <EditMovie />
          </PrivilegedRoute>
        ),
      },
      {
        path: "manage-movies",
        element: (
          <PrivilegedRoute allowedRoles={["admin"]}>
            <ManageMovies />
          </PrivilegedRoute>
        ),
      },
      {
        path: "movie-approval",
        element: (
          <PrivilegedRoute allowedRoles={["admin"]}>
            <PendingMoviesApproval />
          </PrivilegedRoute>
        ),
      },
    ],
  },
]);
