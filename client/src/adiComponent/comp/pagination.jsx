import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const safeTotalPages = totalPages === 0 ? 1 : totalPages;

  const createPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Total number of page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add ellipsis for the start
    if (startPage > 1) {
      items.push(
        <li key={1}>
          <p
            onClick={() => onPageChange(1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight  font-medium ${
              currentPage === 1
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white border-gray-300"
            } border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
          >
            1
          </p>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="ellipsis-start">
            <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
              ...
            </p>
          </li>
        );
      }
    }

    // Create page items
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i}>
          <p
            onClick={() => onPageChange(i)}
            className={`flex items-center justify-center px-4 h-10 leading-tight font-medium ${
              i === currentPage
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white border-gray-300"
            } border border-gray-300 ${i === startPage ? "rounded-s-lg" : ""} ${
              i === endPage ? "rounded-e-lg" : ""
            } hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
          >
            {i}
          </p>
        </li>
      );
    }

    // Add ellipsis for the end
    if (endPage < safeTotalPages) {
      if (endPage < safeTotalPages - 1) {
        items.push(
          <li key="ellipsis-end">
            <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
              ...
            </p>
          </li>
        );
      }
      items.push(
        <li key={safeTotalPages}>
          <p
            onClick={() => onPageChange(safeTotalPages)}
            className={`flex items-center justify-center px-4 h-10 leading-tight  font-medium ${
              currentPage === safeTotalPages
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white border-gray-300"
            } border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
          >
            {safeTotalPages}
          </p>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className="mt-6">
      <ul className="inline-flex -space-x-px text-base h-10 flex-wrap">
        {/* Previous Button */}
        <li>
          <p
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
            } border border-e-0 rounded-s-lg`}
          >
            Previous
          </p>
        </li>

        {createPaginationItems()}

        {/* Next Button */}
        <li>
          <p
            onClick={() =>
              currentPage < safeTotalPages && onPageChange(currentPage + 1)
            }
            className={`flex items-center justify-center px-4 h-10 leading-tight cursor-pointer ${
              currentPage === safeTotalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
            } border border-gray-300 rounded-e-lg`}
          >
            Next
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
