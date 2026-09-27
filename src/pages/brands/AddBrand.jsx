import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as brandService from "../../services/brand.service";
import BrandForm from "../../components/brands/BrandForm";

export default function AddBrand() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (form) => {
        setSubmitting(true);
        try {
            await brandService.addBrand(form);
            toast.success("Brand created");
            navigate("/brands");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md space-y-5">
            <h1 className="text-lg font-medium">Add brand</h1>
            <BrandForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
}
