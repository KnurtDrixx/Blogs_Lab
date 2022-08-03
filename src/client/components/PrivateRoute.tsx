import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../utilities/apiService";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const [hasChecked, setHasChecked] = useState(false);
  const [isLoggidIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    apiService("/auth/verify")
      .then((data) => {
        setHasChecked(true);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setHasChecked(true);
        setIsLoggedIn(false);
      });
  }, []);

  if (!hasChecked) {
    return <></>;
  }

  if (!isLoggidIn) {
    return (
      <>
        <Navigate to="/Login" />
      </>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
