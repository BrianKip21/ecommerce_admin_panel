import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import * as productService from "../../services/product.service";
import * as categoryService from "../../services/category.service";
import * as brandService from "../../services/brand.service";
import ProductTable from "../../components/products/ProductTable";
import ProductFilters from "../../components/products/ProductFilters";
import ProductSearch from "../../components/products/ProductSearch";
import DeleteProductModal from "../../components/products/DeleteProductModal";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: "", category: "", brand: "", sort: "newest", page: 1 });
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        categoryService.getCategories().then((res) => setCategories(res.data)).catch(() => {});
        brandService.getBrands().then((res) => setBrands(res.data)).catch(() => {});
    }, []);

    const loadProducts = () => {
        setLoading(true);
        const params = { page: filters.page, limit: 15, sort: filters.sort };
        if (filters.search) params.search = filters.search;
        if (filters.category) params.category = filters.category;
        if (filters.brand) params.brand = filters.brand;

        productService.getProducts(params)
            .then((res) => {
                setProducts(res.data);
                setPagination(res.pagination);
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(loadProducts, [filters]);

    const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value, page: 1 }));

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            await productService.deleteProduct(deleteTarget._id);
            toast.success("Product deleted");
            setDeleteTarget(null);
            loadProducts();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-lg font-medium">Products</h1>
                <Link to="/products/new">
                    <Button><Plus size={15} strokeWidth={1.5} />Add product</Button>
                </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="w-56"><ProductSearch defaultValue={filters.search} onSearch={(v) => updateFilter("search", v)} /></div>
                <ProductFilters
                    categories={categories}
                    brands={brands}
                    category={filters.category}
                    brand={filters.brand}
                    sort={filters.sort}
                    onChange={updateFilter}
                />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ProductTable products={products} onDeleteClick={setDeleteTarget} />
                    {pagination && (
                        <Pagination
                            page={pagination.page}
                            totalPages={pagination.totalPages}
                            hasNextPage={pagination.hasNextPage}
                            hasPreviousPage={pagination.hasPreviousPage}
                            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
                        />
                    )}
                </>
            )}

            <DeleteProductModal
                product={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </div>
    );
}
