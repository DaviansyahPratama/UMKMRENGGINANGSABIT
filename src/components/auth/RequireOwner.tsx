import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function RequireOwner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOwnerAuthenticated } = useAuth();
  const location = useLocation();

  if (!isOwnerAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname, intent: "owner-auth" }}
      />
    );
  }

  return <>{children}</>;
}

