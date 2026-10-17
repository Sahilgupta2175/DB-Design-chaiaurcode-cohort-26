import { useState } from "react";
import "./YoutubeVideosListing.css";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

// ISO 8601 duration from the API ("PT1H2M5S") to "1:02:05"
const formatDuration = (iso = "") => {
  const [, h = 0, m = 0, s = 0] =
    iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) || [];
  const pad = (n) => String(n).padStart(2, "0");
  return Number(h) > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
};

export default function YoutubeVideosListing() {
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const Limit = 8;

  const fetchVideos = async (pageNumber) => {
    setStatus("Fetching youtube videos...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNumber}&limit=${Limit}`,
      );

      const data = await response.json();

      console.log(data.data.data);

      setVideos(data.data.data);
      setPage(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.error("Error fetching videos:", error);
      setStatus("Error fetching videos. Please try again later.");
    }
  };

  const isFetching = status.startsWith("Fetching");
  const hasError = status !== "" && !isFetching;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const hasVideos = videos.length > 0;

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">FreeAPI · Videos</p>
        <h1>Watch &amp; Learn</h1>
        <p className="subtitle">
          Coding tutorials and talks, straight from the channel.
        </p>
      </header>

      {hasError && (
        <p className="error" role="alert">
          {status}
        </p>
      )}

      <section className="video-grid" aria-busy={isFetching}>
        {isFetching &&
          Array.from({ length: Limit }, (_, i) => (
            <div className="video-card skeleton" key={i}>
              <div className="thumb" />
              <div className="video-body">
                <span className="avatar" />
                <div className="lines">
                  <span className="line" />
                  <span className="line" />
                  <span className="line short" />
                </div>
              </div>
            </div>
          ))}

        {!isFetching &&
          videos.map((video) => {
            // Each entry wraps the actual video in `items`
            const { id, snippet = {}, statistics = {}, contentDetails = {} } =
              video.items || {};
            const thumbnail =
              snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url;

            return (
              <a
                className="video-card"
                key={id}
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="thumb">
                  {thumbnail && (
                    <img src={thumbnail} alt="" loading="lazy" />
                  )}
                  <span className="play" aria-hidden="true">▶</span>
                  {contentDetails.duration && (
                    <span className="duration">
                      {formatDuration(contentDetails.duration)}
                    </span>
                  )}
                </div>

                <div className="video-body">
                  <span className="avatar" aria-hidden="true">
                    {snippet.channelTitle?.[0] || "?"}
                  </span>
                  <div className="meta">
                    <h2 className="title">{snippet.title}</h2>
                    <p className="channel">{snippet.channelTitle}</p>
                    <p className="stats">
                      {statistics.viewCount && (
                        <span>
                          {compact.format(statistics.viewCount)} views
                        </span>
                      )}
                      {snippet.publishedAt && (
                        <span>
                          {new Date(snippet.publishedAt).toLocaleDateString(
                            "en",
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </span>
                      )}
                    </p>
                    <p className="engagement">
                      {statistics.likeCount && (
                        <span>👍 {compact.format(statistics.likeCount)}</span>
                      )}
                      {statistics.commentCount && (
                        <span>💬 {compact.format(statistics.commentCount)}</span>
                      )}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}

        {!isFetching && !hasVideos && !hasError && (
          <div className="empty">
            <span className="empty-icon" aria-hidden="true">🎬</span>
            <p>
              No videos yet. Hit <strong>Fetch Videos</strong> to start
              watching.
            </p>
          </div>
        )}
      </section>

      <nav className="pager" aria-label="Pagination">
        <button
          className="btn"
          onClick={() => fetchVideos(page - 1)}
          disabled={!hasPrev || isFetching}
        >
          ← Previous
        </button>
        <button
          className="btn primary"
          onClick={() => fetchVideos(1)}
          disabled={isFetching}
        >
          {isFetching
            ? "Loading..."
            : hasVideos
              ? "Refresh Videos"
              : "Fetch Videos"}
        </button>
        <button
          className="btn"
          onClick={() => fetchVideos(page + 1)}
          disabled={isFetching || !hasNext}
        >
          Next →
        </button>
        {hasVideos && (
          <span className="page-info">
            Page <strong>{page}</strong> of {totalPages}
          </span>
        )}
      </nav>
    </main>
  );
}
