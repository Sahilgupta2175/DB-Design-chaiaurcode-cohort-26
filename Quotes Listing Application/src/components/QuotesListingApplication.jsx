import { useState } from "react";
import "./QuotesListingApplication.css";

export default function QuotesListingApplication() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const Limit = 5;

  const fetchQuotes = async (pageNumber) => {
    setStatus("Fetching quotes...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/quotes?page=${pageNumber}&limit=${Limit}`,
      );

      const data = await response.json();

      console.log(data.data.data);

      setQuotes(data.data.data);
      setPage(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setStatus("Failed to load quotes. Please try again.");
    }
  };

  const isFetching = status.startsWith("Fetching");
  const hasError = status !== "" && !isFetching;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const hasQuotes = quotes.length > 0;

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">FreeAPI · Quotes</p>
        <h1>Words worth keeping</h1>
        <p className="subtitle">
          A collection of quotes from thinkers, writers and doers.
        </p>
      </header>

      {hasError && (
        <p className="error" role="alert">
          {status}
        </p>
      )}

      <section className="quote-list" aria-busy={isFetching}>
        {isFetching &&
          Array.from({ length: Limit }, (_, i) => (
            <div className="quote skeleton" key={i}>
              <span className="line" />
              <span className="line" />
              <span className="line short" />
            </div>
          ))}

        {!isFetching &&
          quotes.map((quote) => (
            <div className="quote" key={quote.id}>
              <span className="quote-id">{quote.id}</span>
              <p>{quote.content}</p>
              <p>Author: {quote.author}</p>
            </div>
          ))}

        {!isFetching && !hasQuotes && !hasError && (
          <div className="empty">
            <span className="empty-mark" aria-hidden="true">
              “
            </span>
            <p>
              No quotes yet. Hit <strong>Fetch Quotes</strong> to begin.
            </p>
          </div>
        )}
      </section>

      <nav className="pager" aria-label="Pagination">
        <button
          className="btn"
          onClick={() => fetchQuotes(page - 1)}
          disabled={!hasPrev || isFetching}
        >
          ← Previous
        </button>
        <button
          className="btn primary"
          onClick={() => fetchQuotes(1)}
          disabled={isFetching}
        >
          {isFetching
            ? "Loading..."
            : hasQuotes
              ? "Refresh Quotes"
              : "Fetch Quotes"}
        </button>
        <button
          className="btn"
          onClick={() => fetchQuotes(page + 1)}
          disabled={!hasNext || isFetching}
        >
          Next →
        </button>
        {hasQuotes && (
          <span className="page-info">
            Page <strong>{page}</strong> of {totalPages}
          </span>
        )}
      </nav>
    </main>
  );
}
