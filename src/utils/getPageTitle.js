export const getPageTitle = (pathname) => {
  const titles = {
    "/": "Home",
    "/movies": "Genres",
    "/all-movies": "All Movies",
    "/login": "Login",
    "/register": "Register",
    "/become-partner": "Become Partner",

    // Dashboard pages
    "/dashboard": "Dashboard Home",
    "/dashboard/my-movies": "My Movies",
    "/dashboard/edit-profile": "Update Profile",
    "/dashboard/add-movie": "Add Movie",
    "/dashboard/manage-users": "Manage Users",
    "/dashboard/manage-movies": "Manage Movies",
    "/dashboard/movie-approval": "Movie Approval",
    "/dashboard/partner-applications": "Partner Applications",
    "/dashboard/pending-movies": "Pending Movies",
    "/dashboard/uploaded-movies": "Uploaded Movies",
  };

  return titles[pathname] || "CineTrade";
};
