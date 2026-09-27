import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as brandService from "../../services/brand.service";
import BrandForm from "../../components/brands/BrandForm";
import Spinner from "../../components/ui/Spinner";

export default function EditBrand() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brand, setBrand] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        brandService.getBrandById(id).then((res) => setBrand(res.data)).catch((err) => toast.error(err.message));
    }, [id]);

    const handleSubmit = async (form) => {
        setSubmitting(true);
        try {
            await brandService.editBrand(id, form);
            toast.success("Brand updated");
            navigate("/brands");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!brand) return <Spinner />;

    return (
        <div className="max-w-md space-y-5">
            <h1 className="text-lg font-medium">Edit brand</h1>
            <BrandForm initialData={brand} onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
}
