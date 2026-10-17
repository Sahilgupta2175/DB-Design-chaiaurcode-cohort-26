import { useState } from "react";
import "./JokesViewerApplication.css";

export default function JokesViewerApplication() {
  const [jokesView, setJokesView] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const Limit = 5;

  const getAllJokes = async (pageNumber) => {
    setStatus("Fetching Jokes...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomjokes?limit=${Limit}&page=${pageNumber}`,
      );

      const data = await response.json();

      console.log(data.data);

      setJokesView(data.data.data);
      setPage(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to load jokes. Try again.");
    }
  };

  const isFetching = status.startsWith("Fetching");
  const hasError = status !== "" && !isFetching;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const hasJokes = jokesView.length !== 0;

  return (
    <main className="app">
      <header className="hero">
        <span className="hero-icon" aria-hidden="true">
          😂
        </span>
        <h1>Jokes Viewer</h1>
        <p className="subtitle">Random jokes, one page at a time.</p>
      </header>

      {hasError && (
        <p className="error" role="alert">
          {status}
        </p>
      )}

      <section className="joke-list" aria-busy={isFetching}>
        {isFetching &&
          Array.from({ length: Limit }, (_, i) => (
            <div className="joke skeleton" key={i}>
              <span className="joke-id" />
              <div className="lines">
                <span />
                <span />
              </div>
            </div>
          ))}

        {!isFetching &&
          jokesView.map((joke) => (
            <article className="joke" key={joke.id}>
              <span className="joke-id">{joke.id}</span>
              <p>{joke.content}</p>
            </article>
          ))}

        {!isFetching && !hasJokes && !hasError && (
          <div className="empty">
            <p>
              No jokes yet. Hit <strong>Fetch Jokes</strong> to start.
            </p>
          </div>
        )}
      </section>

      <nav className="pager" aria-label="Pagination">
          <button
            className="btn"
            onClick={() => getAllJokes(page - 1)}
            disabled={isFetching || !hasPrev}
          >
            ← Previous
          </button>
          <button
            className="btn primary"
            onClick={() => getAllJokes(1)}
            disabled={isFetching}
          >
            {isFetching
              ? "Loading..."
              : hasJokes
                ? "Refresh Jokes"
                : "Fetch Jokes"}
          </button>
          <button
            className="btn"
            onClick={() => getAllJokes(page + 1)}
            disabled={isFetching || !hasNext}
          >
            Next →
          </button>
          {hasJokes && (
            <span className="page-info">
              Page <strong>{page}</strong> of {totalPages}
            </span>
          )}
        </nav>
    </main>
  );
}
