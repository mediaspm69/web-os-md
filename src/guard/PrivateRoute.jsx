import React from "react";

export const PrivateRoute = ({
  rolePrimary = "",
  rolesTrial = "",
  children,
}) => {
  if (rolePrimary === rolesTrial) {
    return children;
  }
  return <></>;
};
