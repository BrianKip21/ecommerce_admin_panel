import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as categoryService from "../../services/category.service";
import CategoryForm from "../../components/categories/CategoryForm";
import Spinner from "../../components/ui/Spinner";

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        categoryService.getCategoryById(id).then((res) => setCategory(res.data)).catch((err) => toast.error(err.message));
    }, [id]);

    const handleSubmit = async (form) => {
        setSubmitting(true);
        try {
            await categoryService.editCategory(id, form);
            toast.success("Category updated");
            navigate("/categories");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!category) return <Spinner />;

    return (
        <div className="max-w-md space-y-5">
            <h1 className="text-lg font-medium">Edit category</h1>
            <CategoryForm initialData={category} onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
}
