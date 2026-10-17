import { useState } from "react";
import "./ProductListingApplication.css";

export default function ProductListingApplication() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const Limit = 8;

  const fetchProducts = async (pageNumber) => {
    setStatus("Fetching products...");

    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNumber}&limit=${Limit}`,
      );
      const data = await response.json();

      console.log(data.data.data);

      setProducts(data.data.data);
      setPages(pageNumber);
      setTotalPages(data.data.totalPages);
      setStatus("");
    } catch (error) {
      console.log(error);
      setStatus("Error fetching products. Please try again.");
    }
  };

  const isFetching = status.startsWith("Fetching");
  const hasError = status !== "" && !isFetching;
  const hasPrev = pages > 1;
  const hasNext = pages < totalPages;
  const hasProducts = products.length > 0;

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">FreeAPI · Store</p>
        <h1>Product Catalog</h1>
        <p className="subtitle">
          Browse products across categories.
        </p>
      </header>

      {hasError && (
        <p className="error" role="alert">
          {status}
        </p>
      )}

      <section className="product-grid" aria-busy={isFetching}>
        {isFetching &&
          Array.from({ length: Limit }, (_, i) => (
            <div className="card skeleton" key={i}>
              <div className="card-media" />
              <div className="card-body">
                <span className="line" />
                <span className="line" />
                <span className="line short" />
              </div>
            </div>
          ))}

        {!isFetching &&
          products.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-media">
                <img src={product.thumbnail} alt={product.title} loading="lazy" />
                <span className="chip">{product.category}</span>
                {product.discountPercentage > 0 && (
                  <span className="discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="card-body">
                <p className="brand">{product.brand}</p>
                <h2 className="title">{product.title}</h2>
                <p className="description">{product.description}</p>

                <div className="card-footer">
                  <div className="price">
                    <span className="price-now">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="price-was">
                        $
                        {Math.round(
                          product.price / (1 - product.discountPercentage / 100),
                        )}
                      </span>
                    )}
                  </div>
                  <span className="rating" aria-label={`Rated ${product.rating} out of 5`}>
                    ★ {product.rating.toFixed(1)}
                  </span>
                </div>

                <p className={`stock ${product.stock < 20 ? "low" : ""}`}>
                  {product.stock < 20
                    ? `Only ${product.stock} left`
                    : `${product.stock} in stock`}
                </p>
              </div>
            </article>
          ))}

        {!isFetching && !hasProducts && !hasError && (
          <div className="empty">
            <span className="empty-icon" aria-hidden="true">🛍️</span>
            <p>
              No products yet. Hit <strong>Fetch Products</strong> to start
              browsing.
            </p>
          </div>
        )}
      </section>

      <nav className="pager" aria-label="Pagination">
        <button
          className="btn"
          onClick={() => fetchProducts(pages - 1)}
          disabled={!hasPrev || isFetching}
        >
          ← Previous
        </button>
        <button
          className="btn primary"
          onClick={() => fetchProducts(1)}
          disabled={isFetching}
        >
          {isFetching
            ? "Loading..."
            : hasProducts
              ? "Refresh Products"
              : "Fetch Products"}
        </button>
        <button
          className="btn"
          onClick={() => fetchProducts(pages + 1)}
          disabled={!hasNext || isFetching}
        >
          Next →
        </button>
        {hasProducts && (
          <span className="page-info">
            Page <strong>{pages}</strong> of {totalPages}
          </span>
        )}
      </nav>
    </main>
  );
}
