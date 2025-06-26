'use client';
import { useSession } from "next-auth/react";

export default function Page() {
  
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  if (status === "authenticated") {
    return <p>Welcome, {session.user?.name}</p>;
  }

  return <p>You are not signed in.</p>;
}
