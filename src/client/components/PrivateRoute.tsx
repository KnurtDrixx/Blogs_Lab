import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../utilities/apiService";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const [checking, setChecking] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    apiService("/auth/verify")
      .then(() => {
        setChecking(false);
      })
      .catch(() => {
        nav("/Login");
      });
  }, []);

  if (checking) {
    return <h1>Checking that stuff out</h1>;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
