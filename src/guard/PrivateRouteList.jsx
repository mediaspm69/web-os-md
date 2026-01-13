import React from "react";

export const PrivateRouteList = ({ role = "", roles = [], children }) => {
  const result = roles.find((fd) => fd === role);
  return result ? children : <></>;
};
