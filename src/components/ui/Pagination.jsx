export default function Pagination({ page, totalPages, hasNextPage, hasPreviousPage, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-center gap-6 text-[13px] text-neutral-600">
            <button
                disabled={!hasPreviousPage}
                onClick={() => onPageChange(page - 1)}
                className="border-b border-neutral-900 disabled:border-transparent disabled:text-neutral-300"
            >
                Previous
            </button>
            <span className="text-neutral-400">{page} / {totalPages}</span>
            <button
                disabled={!hasNextPage}
                onClick={() => onPageChange(page + 1)}
                className="border-b border-neutral-900 disabled:border-transparent disabled:text-neutral-300"
            >
                Next
            </button>
        </div>
    );
}
