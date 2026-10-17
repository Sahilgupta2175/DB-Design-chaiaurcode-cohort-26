import { useState } from "react";
import "./MealListingApplication.css";

export default function MealListingApplication() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const Limit = 6;

  const fetchMeals = async (pageNumber) => {
    setStatus("Fetching meals...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/meals?page=${pageNumber}&limit=${Limit}`,
      );
      const data = await response.json();

      console.log(data.data.data);

      setMeals(data.data.data);
      setPage(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("Error fetching meals. Please try again later.");
    }
  };

  const isFetching = status.startsWith("Fetching");
  const hasError = status !== "" && !isFetching;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const hasMeals = meals.length > 0;

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">FreeAPI · Kitchen</p>
        <h1>Recipes from around the world</h1>
        <p className="subtitle">
          Browse meals with ingredients, instructions and video guides.
        </p>
      </header>

      {hasError && (
        <p className="error" role="alert">
          {status}
        </p>
      )}

      <section className="meal-grid" aria-busy={isFetching}>
        {isFetching &&
          Array.from({ length: Limit }, (_, i) => (
            <div className="meal-card skeleton" key={i}>
              <div className="meal-media" />
              <div className="meal-body">
                <span className="line short" />
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </div>
            </div>
          ))}

        {!isFetching &&
          meals.map((meal) => {
            const ingredients = Array.from({ length: 20 }, (_, index) => {
              const ingredient = meal[`strIngredient${index + 1}`];
              const measure = meal[`strMeasure${index + 1}`];

              return ingredient?.trim()
                ? { name: ingredient.trim(), measure: measure?.trim() || "" }
                : null;
            }).filter(Boolean);

            const imageUrl =
              meal.strMealThumb?.match(/\((https?:\/\/[^)]+)\)/)?.[1] ||
              meal.strMealThumb;

            const videoUrl =
              meal.strYoutube?.match(/\((https?:\/\/[^)]+)\)/)?.[1] ||
              meal.strYoutube;

            const tags = meal.strTags
              ? meal.strTags.split(",").map((tag) => tag.trim()).filter(Boolean)
              : [];

            return (
              <article className="meal-card" key={meal.idMeal || meal.id}>
                <div className="meal-media">
                  {imageUrl && (
                    <img src={imageUrl} alt={meal.strMeal} loading="lazy" />
                  )}
                  {meal.strCategory && (
                    <span className="chip">{meal.strCategory}</span>
                  )}
                  {meal.strArea && (
                    <span className="chip area">📍 {meal.strArea}</span>
                  )}
                </div>

                <div className="meal-body">
                  <h2 className="meal-title">{meal.strMeal}</h2>

                  {tags.length > 0 && (
                    <ul className="tags" aria-label="Tags">
                      {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  <p className="instructions">{meal.strInstructions}</p>

                  <details className="ingredients">
                    <summary>
                      <span>Ingredients</span>
                      <span className="count">{ingredients.length}</span>
                    </summary>
                    <ul>
                      {ingredients.map((item, index) => (
                        <li key={`${meal.idMeal}-${index}`}>
                          <span>{item.name}</span>
                          <span className="measure">{item.measure}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="meal-footer">
                    {videoUrl && (
                      <a
                        className="link primary"
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ▶ Watch video
                      </a>
                    )}
                    {meal.strSource && (
                      <a
                        className="link"
                        href={meal.strSource}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Full recipe ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

        {!isFetching && !hasMeals && !hasError && (
          <div className="empty">
            <span className="empty-icon" aria-hidden="true">🍲</span>
            <p>
              No meals yet. Hit <strong>Fetch Meals</strong> to start cooking.
            </p>
          </div>
        )}
      </section>

      <nav className="pager" aria-label="Pagination">
        <button
          className="btn"
          onClick={() => fetchMeals(page - 1)}
          disabled={!hasPrev || isFetching}
        >
          ← Previous
        </button>
        <button
          className="btn primary"
          onClick={() => fetchMeals(1)}
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : hasMeals ? "Refresh Meals" : "Fetch Meals"}
        </button>
        <button
          className="btn"
          onClick={() => fetchMeals(page + 1)}
          disabled={!hasNext || isFetching}
        >
          Next →
        </button>
        {hasMeals && (
          <span className="page-info">
            Page <strong>{page}</strong> of {totalPages}
          </span>
        )}
      </nav>
    </main>
  );
}
