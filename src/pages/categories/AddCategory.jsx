import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as categoryService from "../../services/category.service";
import CategoryForm from "../../components/categories/CategoryForm";

export default function AddCategory() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (form) => {
        setSubmitting(true);
        try {
            await categoryService.addCategory(form);
            toast.success("Category created");
            navigate("/categories");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md space-y-5">
            <h1 className="text-lg font-medium">Add category</h1>
            <CategoryForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
}
