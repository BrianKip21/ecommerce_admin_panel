import { Pencil, Trash2 } from "lucide-react";

import Table from "../ui/Table";
import EmptyState from "../ui/EmptyState";
import Badge from "../ui/Badge";

export default function CollectionTable({
    collections,
    onEditClick,
    onDeleteClick
}) {
    if (!collections?.length) {
        return (
            <EmptyState
                title="No collections yet"
            />
        );
    }

    return (
        <Table
            columns={[
                "Collection",
                "Products",
                "Status",
                ""
            ]}
        >
            {collections.map((collection) => (
                <tr
                    key={collection._id}
                    className="transition-colors hover:bg-neutral-50/60"
                >
                    {/* Collection */}
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
                                {collection.image ? (
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-neutral-500">
                                        {collection.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate font-medium text-neutral-900">
                                    {collection.name}
                                </p>

                                {collection.description && (
                                    <p className="truncate text-xs text-neutral-500">
                                        {collection.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </td>

                    {/* Products */}
                    <td className="px-4 py-3 text-neutral-500">
                        {collection.productCount ?? 0}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                        <Badge
                            tone={
                                collection.isActive
                                    ? "success"
                                    : "neutral"
                            }
                        >
                            {collection.isActive
                                ? "Active"
                                : "Inactive"}
                        </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    onEditClick(collection)
                                }
                                aria-label={`Edit ${collection.name}`}
                                title="Edit collection"
                                className="text-neutral-500 transition-colors hover:text-neutral-900"
                            >
                                <Pencil
                                    size={15}
                                    strokeWidth={1.75}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    onDeleteClick(collection)
                                }
                                aria-label={`Delete ${collection.name}`}
                                title="Delete collection"
                                className="text-neutral-500 transition-colors hover:text-red-700"
                            >
                                <Trash2
                                    size={15}
                                    strokeWidth={1.75}
                                />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
