function Pagination({ currentPage, totalPages, onPageChange }) {
  // Create an array of page numbers from 1 to totalPages for rendering page buttons
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav class="pagination">
      <button
        className="page-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous Page
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={
            page === currentPage ? "page-button active" : "page-button"
          }
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <button
        className="page-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next Page →
      </button>
    </nav>
  );
}

export default Pagination;
