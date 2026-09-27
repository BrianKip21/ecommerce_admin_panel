import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import * as categoryService from "../../services/category.service";
import CategoryTable from "../../components/categories/CategoryTable";
import DeleteCategoryModal from "../../components/categories/DeleteCategoryModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export default function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = () => {
        setLoading(true);
        categoryService.getCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            await categoryService.deleteCategory(deleteTarget._id);
            toast.success("Category deleted");
            setDeleteTarget(null);
            load();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Categories</h1>
                <Link to="/categories/new">
                    <Button><Plus size={15} strokeWidth={1.5} />Add category</Button>
                </Link>
            </div>

            <CategoryTable
                categories={categories}
                onEditClick={(c) => navigate(`/categories/${c._id}/edit`)}
                onDeleteClick={setDeleteTarget}
            />

            <DeleteCategoryModal
                category={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </div>
    );
}
