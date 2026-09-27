import { Pencil, Trash2 } from "lucide-react";
import Table from "../ui/Table";
import EmptyState from "../ui/EmptyState";

export default function BrandTable({ brands, onEditClick, onDeleteClick }) {
    if (!brands || brands.length === 0) {
        return <EmptyState title="No brands yet" />;
    }

    return (
        <Table columns={["Name", "Description", ""]}>
            {brands.map((brand) => (
                <tr key={brand._id}>
                    <td className="px-4 py-3">{brand.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{brand.description || "—"}</td>
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <button onClick={() => onEditClick(brand)} aria-label="Edit">
                                <Pencil size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-neutral-900" />
                            </button>
                            <button onClick={() => onDeleteClick(brand)} aria-label="Delete">
                                <Trash2 size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-red-700" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
