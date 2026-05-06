"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Unable to sign in.");
        return;
      }

      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden border border-accent/20 bg-[#f8f0dc]/45 px-6 py-10 shadow-[0_18px_45px_rgba(28,20,16,0.08)] md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,151,72,0.1),transparent_55%)]" />

      <div className="relative z-10">
        <div className="mb-8 text-center">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Admin Access
          </p>

          <h1 className="font-heading text-3xl leading-tight text-primary md:text-4xl">
            Tribute Moderation
          </h1>

          <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-6 text-foreground/50">
            Sign in to review, approve, edit, and manage submitted tributes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/65"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              className="w-full border border-accent/20 bg-background/60 px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/65"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full border border-accent/20 bg-background/60 px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
              placeholder="Enter password"
            />
          </div>

          {errorMessage ? (
            <div
              role="alert"
              className="border border-red-500/20 bg-red-500/10 px-4 py-3 font-sans text-sm leading-6 text-red-700"
            >
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center bg-accent px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-background shadow-[0_14px_35px_rgba(196,151,72,0.22)] transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
