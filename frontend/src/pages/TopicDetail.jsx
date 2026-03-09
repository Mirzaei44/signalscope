import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function TopicDetail() {
  const { name } = useParams();
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/signals/topics/${name}/`)
      .then((res) => setTopic(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load topic detail");
      });
  }, [name]);

  const handleSaveTopic = async () => {
    if (!topic?.id) return;

    try {
      setSaving(true);
      setMessage("");
      await api.post("/auth/saved-topics/", {
        topic: topic.id,
      });
      setMessage("Topic saved successfully");
    } catch (err) {
      console.error(err);
      setMessage("Login first or topic is already saved");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] px-4 py-10 text-[#161616] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] px-4 py-10 text-[#161616] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-black/5 bg-white p-6 text-neutral-500 shadow-sm">
          Loading topic...
        </div>
      </div>
    );
  }

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
                    Topic Detail
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/"
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
                >
                  Back to Dashboard
                </Link>

                <button
                  onClick={handleSaveTopic}
                  disabled={saving}
                  className="rounded-full bg-[#161616] px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save Topic"}
                </button>
              </div>
            </div>
          </header>

          <main className="px-6 py-6">
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] bg-[#d9e6dc] px-6 py-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4d5b51]">
                  Topic signal
                </p>

                <h2 className="max-w-3xl text-3xl font-semibold leading-tight capitalize text-[#111111] sm:text-4xl">
                  {topic.name}
                </h2>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-700">
                  Track the signal movement, review related coverage, and keep a
                  clean overview of how this topic is evolving.
                </p>

                {message && (
                  <div className="mt-5 inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
                    {message}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                  <p className="text-sm text-neutral-500">Trend Score</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#111111]">
                    {topic.trend_score}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    current signal level
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm">
                  <p className="text-sm text-neutral-500">Linked Articles</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#111111]">
                    {topic.article_count}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    related stories available
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Coverage
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#111111]">
                    Related Articles
                  </h3>
                </div>

                <span className="text-sm text-neutral-400">
                  {topic.articles?.length || 0} total
                </span>
              </div>

              {!topic.articles?.length ? (
                <div className="rounded-[22px] border border-black/5 bg-[#faf7f2] p-6 text-neutral-500">
                  No related articles.
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {topic.articles.map((article, index) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[24px] border border-black/5 bg-[#faf7f2] p-5 transition hover:-translate-y-0.5 hover:border-black/10 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          Article {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm text-neutral-400 group-hover:text-neutral-600">
                          Open →
                        </span>
                      </div>

                      <h4 className="mt-4 line-clamp-2 text-xl font-semibold leading-snug text-[#111111]">
                        {article.title}
                      </h4>

                      <p className="mt-4 truncate text-sm text-neutral-500">
                        {article.published_at}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TopicDetail;