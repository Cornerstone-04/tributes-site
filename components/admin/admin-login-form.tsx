"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Invalid credentials.");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="mx-auto w-full max-w-md border border-border bg-card/70 p-8 shadow-sm">
      <div className="mb-8 text-center">
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Admin Access
        </p>
        <h1 className="font-heading text-3xl text-primary">Sign in</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:border-accent/60 focus:outline-none"
            placeholder="Enter username"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:border-accent/60 focus:outline-none"
            placeholder="Enter password"
            required
          />
        </div>

        {error ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent py-3 font-sans text-sm uppercase tracking-[0.15em] text-background transition-colors hover:bg-primary disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
