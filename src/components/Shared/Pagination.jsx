const Pagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <div className="flex justify-center mt-6 flex-wrap gap-5">
      {/* Prev */}
      <button
        onClick={() => onChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
