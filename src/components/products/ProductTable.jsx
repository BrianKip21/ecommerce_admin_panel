import Table from "../ui/Table";
import ProductRow from "./ProductRow";
import EmptyState from "../ui/EmptyState";

export default function ProductTable({ products, onDeleteClick }) {
    if (!products || products.length === 0) {
        return <EmptyState title="No products found" />;
    }

    return (
        <Table columns={["Product", "Category", "Brand", "Price", "Stock", ""]}>
            {products.map((product) => (
                <ProductRow key={product._id} product={product} onDeleteClick={onDeleteClick} />
            ))}
        </Table>
    );
}
