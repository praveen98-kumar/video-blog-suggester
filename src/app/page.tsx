"use client";

import Image from "next/image";

import { signIn, signOut, useSession } from "@/lib/auth/client";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="size-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-5 w-40 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-56 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

export default function Home() {
  const { data: session, isPending, error } = useSession();

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-black/[.08] bg-white p-10 text-center shadow-sm dark:border-white/[.145] dark:bg-zinc-950">
        {isPending ? (
          <ProfileSkeleton />
        ) : session ? (
          <div className="flex flex-col items-center gap-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={80}
                height={80}
                className="size-20 rounded-full ring-2 ring-black/[.08] dark:ring-white/[.145]"
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-zinc-900 text-2xl font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {session.user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {session.user.name}
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {session.user.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-2 h-11 w-full rounded-full border border-black/[.08] px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.06]"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Welcome
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Sign in to continue to Video Blog Suggester.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                signIn.social({ provider: "github", callbackURL: "/" })
              }
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <GitHubIcon className="size-5" />
              Sign in with GitHub
            </button>
            {error ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error.message}
              </p>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
