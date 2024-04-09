"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
