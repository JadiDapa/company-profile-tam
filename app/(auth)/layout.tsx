import { ReactNode } from "react";
import AuthProviders from "@/providers/AuthProviders";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <AuthProviders>{children}</AuthProviders>;
}
