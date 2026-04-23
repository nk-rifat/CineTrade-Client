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
import MoviePaymentPage from "../Pages/BuyMovie/MoviePaymentPage";
import WatchMovie from "../Pages/MovieDetails/WatchMovie";
import EditProfile from "../Pages/Dashboard/UpdateProfile/EditProfile";
import AddMovie from "../Pages/Dashboard/AddNewMovie/AddNewMovie";
import PendingMovies from "../Pages/Dashboard/PendingMovies/PendingMovies";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import UploadedMovies from "../Pages/Dashboard/UploadedMovies/UploadedMovies";
import EditMovie from "../Pages/Shared/components/EditMovie/EditMovie";
import ManageMovies from "../Pages/Dashboard/ManageMovies/ManageMovies";
import PendingMoviesApproval from "../Pages/Dashboard/PendingMoviesApproval/PendingMoviesApproval";
import PrivilegedRoute from "../routes/PrivilegedRoute";

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
