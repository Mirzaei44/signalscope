import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/alerts/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setAlerts(data);
      })
      .catch((err) => {
        console.error(err);

        if (err.response?.status === 401) {
          setError("Please login first");
        } else {
          setError("Failed to load alerts");
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#161616]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-black/5 bg-[#fcfaf7] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <header className="border-b border-black/5 bg-[#fcfaf7]/90 backdrop-blur">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#161616] text-sm font-semibold text-white shadow-sm">
                  SS
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                    SignalScope
                  </p>
                  <h1 className="text-lg font-semibold text-[#111111]">
                    Alert Center
                  </h1>
                </div>
              </div>

              <Link
                to="/"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
              >
                Back to Dashboard
              </Link>
            </div>
          </header>

          <main className="px-6 py-6">
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] bg-[#d9e6dc] px-6 py-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4d5b51]">
                  Live notifications
                </p>

                <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                  Stay on top of important topic activity in one clean alert feed.
                </h2>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-700">
                  Review the latest notifications tied to your tracked topics and
                  catch signal changes as they happen.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                  <p className="text-sm text-neutral-500">Total Alerts</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#111111]">
                    {alerts.length}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    notifications loaded
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                  <p className="text-sm text-neutral-500">Status</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#111111]">
                    Active
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    monitoring in progress
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Feed
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#111111]">
                    My Alerts
                  </h3>
                </div>

                <span className="text-sm text-neutral-400">
                  {alerts.length} total
                </span>
              </div>

              {error && (
                <div className="mb-5 rounded-[22px] border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}

              {!error && alerts.length === 0 && (
                <div className="rounded-[22px] border border-black/5 bg-[#faf7f2] p-6 text-neutral-500">
                  No alerts available yet.
                </div>
              )}

              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className="rounded-[24px] border border-black/5 bg-[#faf7f2] p-5 transition hover:-translate-y-0.5 hover:border-black/10 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 border border-black/5">
                            Alert {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    alert.is_read
      ? "bg-neutral-200 text-neutral-700"
      : "bg-[#161616] text-white"
  }`}
>
  {alert.is_read ? "Read" : "New"}
</span>
                        </div>

                        <h4 className="text-2xl font-semibold capitalize text-[#111111]">
                          {alert.topic_name}
                        </h4>

                        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-700">
                          {alert.message}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <div className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-600">
                          {formatDate(alert.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Alerts;