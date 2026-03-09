import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/");
  };

  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/api/signals/topics/"),
      axios.get("http://127.0.0.1:8000/api/news/articles/"),
    ])
      .then(([topicsRes, articlesRes]) => {
        const topicsData = Array.isArray(topicsRes.data)
          ? topicsRes.data
          : topicsRes.data.results || [];

        const articlesData = Array.isArray(articlesRes.data)
          ? articlesRes.data
          : articlesRes.data.results || [];

        setTopics(topicsData);
        setArticles(articlesData);

        if (topicsData.length > 0) {
          loadTopicDetail(topicsData[0].name);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadTopicDetail = async (topicName) => {
    try {
      setDetailLoading(true);
      setDetailError("");

      const res = await axios.get(
        `http://127.0.0.1:8000/api/signals/topics/${encodeURIComponent(topicName)}/`
      );

      setSelectedTopic(res.data);
    } catch (err) {
      console.error(err);
      setDetailError("Failed to load topic detail");
    } finally {
      setDetailLoading(false);
    }
  };

  const stats = useMemo(
    () => [
      { label: "Tracked Topics", value: topics.length, hint: "active entities" },
      { label: "Live Articles", value: articles.length, hint: "fresh coverage" },
      { label: "System Status", value: "Online", hint: "data flowing" },
    ],
    [topics.length, articles.length]
  );

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#161616]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
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
                    News Monitoring Dashboard
                  </h1>
                </div>
              </div>

              <nav className="flex flex-wrap items-center gap-2">
                <Link
                  to="/saved-topics"
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
                >
                  Saved Topics
                </Link>

                <Link
                  to="/alerts"
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
                >
                  Alerts
                </Link>

                {localStorage.getItem("access") ? (
  <button
    onClick={handleLogout}
    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
  >
    Logout
  </button>
) : (
  <Link
    to="/login"
    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-neutral-50"
  >
    Login
  </Link>
)}
              </nav>
            </div>
          </header>

          <main className="px-6 py-6">
            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[28px] bg-[#d9e6dc] px-6 py-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4d5b51]">
                  Editorial intelligence
                </p>

                <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                  Monitor emerging topics and browse live coverage in one calm,
                  polished workspace.
                </h2>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-700">
                  Follow topic momentum, inspect related reporting, and keep your
                  news workflow organized with a cleaner dashboard experience.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-neutral-500">{item.label}</p>
                    <h3 className="mt-2 text-3xl font-semibold text-[#111111]">
                      {item.value}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">{item.hint}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-6 space-y-6">
              {loading && (
                <div className="rounded-[22px] border border-black/5 bg-white p-4 text-neutral-600 shadow-sm">
                  Loading dashboard...
                </div>
              )}

              {error && (
                <div className="rounded-[22px] border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}

              <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                <aside className="rounded-[28px] border border-black/5 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-end justify-between px-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                        Queue
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#111111]">
                        Trending Topics
                      </h3>
                    </div>
                    <span className="text-sm text-neutral-400">
                      {topics.length} total
                    </span>
                  </div>

                  <div className="max-h-[700px] space-y-3 overflow-y-auto pr-1">
                    {topics.map((topic, index) => {
                      const active = selectedTopic?.name === topic.name;

                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => loadTopicDetail(topic.name)}
                          className={`w-full rounded-[24px] border p-4 text-left transition ${
                            active
                              ? "border-[#161616] bg-[#161616] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                              : "border-black/5 bg-[#faf7f2] hover:border-black/10 hover:bg-[#f4efe8]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p
                                className={`text-[11px] uppercase tracking-[0.24em] ${
                                  active ? "text-white/60" : "text-neutral-400"
                                }`}
                              >
                                Topic {String(index + 1).padStart(2, "0")}
                              </p>

                              <h4 className="mt-2 truncate text-xl font-semibold capitalize">
                                {topic.name}
                              </h4>

                              <p
                                className={`mt-2 text-sm ${
                                  active ? "text-white/75" : "text-neutral-500"
                                }`}
                              >
                                {topic.article_count} linked articles
                              </p>
                            </div>

                            <div
                              className={`rounded-full px-3 py-1 text-sm font-medium ${
                                active
                                  ? "bg-white/10 text-white"
                                  : "bg-white text-neutral-700 border border-black/5"
                              }`}
                            >
                              {topic.trend_score}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <section className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                        Focus
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#111111]">
                        Topic Detail
                      </h3>
                    </div>
                    <span className="text-sm text-neutral-400">Live panel</span>
                  </div>

                  {detailLoading && (
                    <div className="rounded-[22px] border border-black/5 bg-[#faf7f2] p-4 text-neutral-600">
                      Loading topic detail...
                    </div>
                  )}

                  {detailError && (
                    <div className="rounded-[22px] border border-red-200 bg-red-50 p-4 text-red-700">
                      {detailError}
                    </div>
                  )}

                  {!detailLoading && !detailError && selectedTopic && (
                    <div className="space-y-5">
                      <div className="rounded-[24px] bg-[#f3ede4] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                          Selected Topic
                        </p>

                        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                          <div>
                            <h4 className="text-3xl font-semibold capitalize text-[#111111] sm:text-4xl">
                              {selectedTopic.name}
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-black/5">
                              Score: {selectedTopic.trend_score}
                            </span>
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 border border-black/5">
                              Articles: {selectedTopic.article_count}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {selectedTopic.articles?.length ? (
                          selectedTopic.articles.map((article, index) => (
                            <a
                              key={article.id}
                              href={article.url}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-[22px] border border-black/5 bg-[#fcfaf7] p-5 transition hover:-translate-y-0.5 hover:border-black/10 hover:shadow-sm"
                            >
                              <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                                Article {String(index + 1).padStart(2, "0")}
                              </p>

                              <h5 className="mt-2 text-lg font-semibold leading-snug text-[#111111]">
                                {article.title}
                              </h5>

                              <div className="mt-4 flex items-center justify-between gap-4">
                                <p className="truncate text-sm text-neutral-500">
                                  {article.published_at}
                                </p>
                                <span className="text-sm font-medium text-[#111111]">
                                  Open article →
                                </span>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="rounded-[22px] border border-black/5 bg-[#faf7f2] p-4 text-neutral-500">
                            No related articles.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </section>

              <section className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                      Feed
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-[#111111]">
                      Latest Articles
                    </h3>
                  </div>
                  <span className="text-sm text-neutral-400">Recent coverage</span>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {articles.map((article, index) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[24px] border border-black/5 bg-[#faf7f2] p-5 transition hover:-translate-y-1 hover:border-black/10 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 border border-black/5">
                          {String(index + 1).padStart(2, "0")}
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
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;