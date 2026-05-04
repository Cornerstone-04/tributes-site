"use client";

import { useState } from "react";

type FormState = {
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
};

const INITIAL_STATE: FormState = {
  username: "",
  password: "",
  loading: false,
  error: null,
};

export function AdminLoginForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function updateField(field: keyof Omit<FormState, "loading" | "error">, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setForm((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setForm((prev) => ({
          ...prev,
          error: data.message || "Invalid credentials. Please try again.",
        }));
        return;
      }

      window.location.reload();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setForm((prev) => ({ ...prev, error: message }));
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="mx-auto w-full max-w-md border border-border bg-card/70 p-8 shadow-sm">
      <div className="mb-8 text-center">
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Admin Access
        </p>
        <h1 className="font-heading text-3xl text-primary">Sign in</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="username" className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none transition-colors"
            placeholder="Enter your username"
            disabled={form.loading}
            required
            aria-required="true"
            aria-describedby={form.error ? "login-error" : undefined}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none transition-colors"
            placeholder="Enter your password"
            disabled={form.loading}
            required
            aria-required="true"
            aria-describedby={form.error ? "login-error" : undefined}
          />
        </div>

        {form.error ? (
          <div
            id="login-error"
            className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700 rounded"
            role="alert"
          >
            {form.error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={form.loading || !form.username || !form.password}
          className="w-full bg-accent py-3 font-sans text-sm uppercase tracking-[0.15em] text-background transition-colors hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={form.loading}
        >
          {form.loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
