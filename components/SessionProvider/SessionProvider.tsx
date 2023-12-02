"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>;
}
export default SessionProvider;

type Props = { children: React.ReactNode; session: Session | null };
