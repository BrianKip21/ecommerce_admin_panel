import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import * as brandService from "../../services/brand.service";
import BrandTable from "../../components/brands/BrandTable";
import DeleteBrandModal from "../../components/brands/DeleteBrandModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export default function Brands() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = () => {
        setLoading(true);
        brandService.getBrands()
            .then((res) => setBrands(res.data))
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            await brandService.deleteBrand(deleteTarget._id);
            toast.success("Brand deleted");
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
                <h1 className="text-lg font-medium">Brands</h1>
                <Link to="/brands/new">
                    <Button><Plus size={15} strokeWidth={1.5} />Add brand</Button>
                </Link>
            </div>

            <BrandTable
                brands={brands}
                onEditClick={(b) => navigate(`/brands/${b._id}/edit`)}
                onDeleteClick={setDeleteTarget}
            />

            <DeleteBrandModal
                brand={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </div>
    );
}
