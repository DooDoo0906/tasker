import { checkUserExistAndCreate } from "@/utils/users";
import React from "react";

type AuthGuardProps = {
  children: React.ReactNode;
};
const AuthGuard = async ({ children }: AuthGuardProps) => {
  checkUserExistAndCreate();
  return <>{children}</>;
};

export default AuthGuard;
