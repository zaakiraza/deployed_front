import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Make sure to adjust the import path as needed

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const isAdminRoute = props.location.pathname.includes("/admin");
  const redirectPath = isAdminRoute ? "/admin/login" : "/login";

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectPath} replace state={{ from: window.location }} />
  );
  //   return (

  //     <Route
  //       {...rest}
  //       render={(props) => {
  //         if (isAuthenticated) {
  //           return <Component {...props} />;
  //         } else {
  //           // Check if the URL includes '/admin'
  //           const isAdminRoute = props.location.pathname.includes("/admin");
  //           const redirectPath = isAdminRoute ? "/admin/login" : "/login";

  //           return (
  //             <Navigate
  //               to={redirectPath}
  //               replace
  //               state={{ from: props.location }}
  //               //   to={{
  //               //     pathname: redirectPath,
  //               //     state: { from: props.location },
  //               //   }}
  //             />
  //           );
  //         }
  //       }}
  //     />
  //   );
};

export default ProtectedRoute;
