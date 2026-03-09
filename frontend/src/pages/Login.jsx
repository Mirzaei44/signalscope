import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login/", {
        email,
        password,
      });

      setAuthToken(res.data.access);

      if (res.data.refresh) {
        localStorage.setItem("refresh", res.data.refresh);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
        alt="login background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="self-end lg:self-center">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300/90">
              SignalScope Access
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Enter the platform and control your saved topics and live alerts.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
              A premium intelligence space for monitoring trends, tracking stories, and building your own topic watchlist.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
            <div className="mb-8">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-300">
                Sign in
              </p>
              <h2 className="text-3xl font-semibold">Welcome back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Sign in
              </button>
            </form>

            <Link
              to="/"
              className="mt-6 inline-block text-sm text-cyan-300 transition hover:text-cyan-200"
            >
              ← Back to feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;