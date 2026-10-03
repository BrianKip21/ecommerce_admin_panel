import { Pencil, Trash2 } from "lucide-react";
import Table from "../ui/Table";
import EmptyState from "../ui/EmptyState";

export default function CategoryTable({
    categories,
    onEditClick,
    onDeleteClick
}) {
    if (!categories || categories.length === 0) {
        return <EmptyState title="No categories yet" />;
    }

    return (
        <Table columns={["Image", "Name", "Description", ""]}>
            {categories.map((category) => (
                <tr key={category._id}>
                    <td className="px-4 py-3">
                        {category.image ? (
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-12 w-12 object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 text-[9px] uppercase tracking-wide text-neutral-400">
                                No image
                            </div>
                        )}
                    </td>

                    <td className="px-4 py-3 font-medium">
                        {category.name}
                    </td>

                    <td className="px-4 py-3 text-neutral-500">
                        {category.description || "—"}
                    </td>

                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    onEditClick(category)
                                }
                                aria-label="Edit"
                            >
                                <Pencil
                                    size={15}
                                    strokeWidth={1.5}
                                    className="text-neutral-500 hover:text-neutral-900"
                                />
                            </button>

                            <button
                                onClick={() =>
                                    onDeleteClick(category)
                                }
                                aria-label="Delete"
                            >
                                <Trash2
                                    size={15}
                                    strokeWidth={1.5}
                                    className="text-neutral-500 hover:text-red-700"
                                />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}