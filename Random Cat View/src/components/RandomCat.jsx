import { useState } from "react";
import "./RandomCat.css";

function RandomCat() {
  const [randomCat, setRandomCat] = useState({});
  const [status, setStatus] = useState("");

  const getRandomCat = async () => {
    setStatus("Fetching Random Cat...");

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random",
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setRandomCat(data.data);
      setStatus("");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const isFetching = status.startsWith("Fetching");
  const temperament =
    typeof randomCat.temperament === "string"
      ? randomCat.temperament.split(",").map((trait) => trait.trim())
      : [];

  return (
    <main className="cat-page">
      <header className="cat-header">
        <span className="cat-eyebrow">FreeAPI · Cat Breeds</span>
        <h1>Random Cat View</h1>
        <p className="cat-subtitle">Meet a new breed with every click.</p>
      </header>

      <article className={`cat-card${isFetching ? " is-loading" : ""}`}>
        <div className="cat-media">
          {randomCat.image ? (
            <img
              key={randomCat.image}
              src={randomCat.image}
              alt={randomCat.name || "Random cat"}
            />
          ) : (
            <div className="cat-placeholder">No cat yet</div>
          )}
        </div>

        <div className="cat-info">
          {randomCat.name ? (
            <>
              <div className="cat-meta">
                {randomCat.origin && (
                  <span className="cat-origin">{randomCat.origin}</span>
                )}
                {randomCat.life_span && (
                  <span className="cat-life">{randomCat.life_span} years</span>
                )}
              </div>
              <h2 className="cat-name">{randomCat.name}</h2>
              <p className="cat-description">{randomCat.description}</p>
              {temperament.length > 0 && (
                <ul className="cat-traits">
                  {temperament.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="cat-empty">
              Press the button to fetch a random cat breed with its photo,
              origin and personality.
            </p>
          )}

          <button
            className="cat-button"
            onClick={getRandomCat}
            disabled={isFetching}
          >
            {isFetching && <span className="cat-spinner" aria-hidden="true" />}
            {isFetching ? "Fetching..." : "Fetch Random Cat"}
          </button>

          {status && !isFetching && (
            <p className="cat-error" role="alert">
              {status}
            </p>
          )}
        </div>
      </article>
    </main>
  );
}

export default RandomCat;
