import { useState } from "react";
import "./RandomUsers.css";

const LIMIT = 10;

function RandomUser() {
  const [randomUsers, setRandomUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (pageNumber) => {
    setStatus("Loading Random Users...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomusers?page=${pageNumber}&limit=${LIMIT}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setRandomUsers(data.data.data);
      setPage(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to load users. Try again.");
    }
  };

  const isLoading = status.startsWith("Loading");
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="random-user-page">
      <header className="page-header">
        <span className="page-eyebrow">People Directory</span>
        <h1 className="page-title">Random User</h1>
        {randomUsers.length === 0 && (
          <>
            <p className="page-subtitle">
              Click the button to fetch a fresh set of profiles
            </p>

            <button
              className="btn btn-primary"
              onClick={() => fetchUsers(1)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load Random User"}
            </button>
          </>
        )}

        {status && <p className="status-text">{status}</p>}
      </header>

      <div className="user-list">
        {randomUsers.map((user, index) => (
          <article
            className="user-card"
            key={user.login.uuid}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="user-card-banner" />
            <img
              className="user-avatar"
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <h3 className="user-name">
              {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </h3>
            <p className="user-email">{user.email}</p>
            <span className="user-location">
              {user.location.city}, {user.location.country}
            </span>
          </article>
        ))}
      </div>

      {randomUsers.length > 0 && (
        <nav className="pagination">
          <button
            className="btn btn-outline"
            onClick={() => fetchUsers(page - 1)}
            disabled={!hasPrev || isLoading}
          >
            ← Previous
          </button>

          <span className="page-info">
            Page <strong>{page}</strong> of {totalPages}
          </span>

          <button
            className="btn btn-outline"
            onClick={() => fetchUsers(page + 1)}
            disabled={!hasNext || isLoading}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}

export default RandomUser;
