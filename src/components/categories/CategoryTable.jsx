import { Pencil, Trash2 } from "lucide-react";
import Table from "../ui/Table";
import EmptyState from "../ui/EmptyState";

export default function CategoryTable({ categories, onEditClick, onDeleteClick }) {
    if (!categories || categories.length === 0) {
        return <EmptyState title="No categories yet" />;
    }

    return (
        <Table columns={["Name", "Description", ""]}>
            {categories.map((category) => (
                <tr key={category._id}>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{category.description || "—"}</td>
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <button onClick={() => onEditClick(category)} aria-label="Edit">
                                <Pencil size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-neutral-900" />
                            </button>
                            <button onClick={() => onDeleteClick(category)} aria-label="Delete">
                                <Trash2 size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-red-700" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
