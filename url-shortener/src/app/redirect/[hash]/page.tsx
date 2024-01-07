"use client"
import { useRedirect } from "@/app/hooks/useRedirect";
import { useRouter } from "next/navigation";

export const REDIRECT_TEST_ID = 'Redirect';

export interface RedirectParamsInput {
  params: {
    hash: string;
  }
}

export default function Redirect({ params: { hash } }: RedirectParamsInput) {
  const { data, error, isLoading } = useRedirect(hash);
  
  const router = useRouter();

  if (!isLoading) {
    if (data) {
      router.push(data.url);
    } else if (error) {
      router.push("../not-found");
    }
  }

  return (
      <main data-testid={REDIRECT_TEST_ID} className="flex min-h-screen flex-col items-center justify-center p-24">
        Redirecting to {hash}...
      </main>
  )
}