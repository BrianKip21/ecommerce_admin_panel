import { X } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const colorMap = {
    black: "#000000",
    white: "#ffffff",
    cream: "#fff7ed",
    brown: "#78350f",
    beige: "#d6c7a1",
    grey: "#9ca3af",
    navy: "#172554",
    red: "#dc2626",
    blue: "#2563eb",
    green: "#16a34a"
};

export default function VariantTable({ variants, onRemove }) {
    if (!variants || variants.length === 0) {
        return (
            <div className="border border-dashed border-neutral-300 px-4 py-8 text-center">
                <p className="text-[12px] text-neutral-400">
                    No variants added yet.
                </p>

                <p className="mt-1 text-[11px] text-neutral-400">
                    Add a size, color, price and stock combination below.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-neutral-200">

            <table className="w-full min-w-[600px] text-left text-[13px]">

                <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">

                        <th className="px-4 py-3 font-medium text-neutral-500">
                            Color
                        </th>

                        <th className="px-4 py-3 font-medium text-neutral-500">
                            Size
                        </th>

                        <th className="px-4 py-3 font-medium text-neutral-500">
                            Price
                        </th>

                        <th className="px-4 py-3 font-medium text-neutral-500">
                            Sale
                        </th>

                        <th className="px-4 py-3 font-medium text-neutral-500">
                            Stock
                        </th>

                        <th className="w-10 px-3 py-3" />

                    </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100">

                    {variants.map((variant, index) => {

                        const color =
                            colorMap[
                                variant.color
                                    ?.toLowerCase()
                                    .trim()
                            ];

                        return (
                            <tr
                                key={variant._id || index}
                                className="hover:bg-neutral-50"
                            >

                                {/* COLOR */}

                                <td className="px-4 py-3">

                                    <div className="flex items-center gap-2">

                                        <span
                                            className="h-4 w-4 rounded-full border border-neutral-300"
                                            style={{
                                                backgroundColor:
                                                    color ||
                                                    variant.color
                                            }}
                                        />

                                        <span>
                                            {variant.color}
                                        </span>

                                    </div>

                                </td>

                                {/* SIZE */}

                                <td className="px-4 py-3 font-medium">
                                    {variant.size}
                                </td>

                                {/* PRICE */}

                                <td className="px-4 py-3">
                                    {formatCurrency(
                                        variant.price
                                    )}
                                </td>

                                {/* SALE */}

                                <td className="px-4 py-3">

                                    {variant.salePrice != null ? (
                                        <span>
                                            {formatCurrency(
                                                variant.salePrice
                                            )}
                                        </span>
                                    ) : (
                                        <span className="text-neutral-400">
                                            —
                                        </span>
                                    )}

                                </td>

                                {/* STOCK */}

                                <td className="px-4 py-3">

                                    <span
                                        className={
                                            variant.stock === 0
                                                ? "text-red-600"
                                                : variant.stock <= 5
                                                ? "text-amber-700"
                                                : "text-neutral-700"
                                        }
                                    >
                                        {variant.stock}
                                    </span>

                                </td>

                                {/* REMOVE */}

                                <td className="px-3 py-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onRemove(index)
                                        }
                                        aria-label="Remove variant"
                                        className="flex h-7 w-7 items-center justify-center text-neutral-400 transition hover:bg-neutral-100 hover:text-red-700"
                                    >
                                        <X
                                            size={14}
                                            strokeWidth={1.5}
                                        />
                                    </button>

                                </td>

                            </tr>
                        );
                    })}

                </tbody>

            </table>
        </div>
    );
}