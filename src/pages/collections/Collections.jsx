import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import * as collectionService from "../../services/collection.service";

import CollectionTable from "../../components/collections/CollectionTable";
import DeleteCollectionModal from "../../components/collections/DeleteCollectionModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export default function Collections() {
    const navigate = useNavigate();

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadCollections = useCallback(async () => {
        try {
            setLoading(true);

            const res =
                await collectionService.getCollectionsAdmin();

            console.log("ADMIN COLLECTIONS:", res);

            setCollections(res.collections || []);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to load collections";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCollections();
    }, [loadCollections]);

    const handleDeleteConfirm = async () => {
        if (!deleteTarget?._id) return;

        try {
            setDeleting(true);

            await collectionService.deleteCollection(
                deleteTarget._id
            );

            toast.success("Collection deleted");

            // Remove it immediately from the UI
            setCollections((prev) =>
                prev.filter(
                    (collection) =>
                        collection._id !== deleteTarget._id
                )
            );

            setDeleteTarget(null);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to delete collection";

            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">
                        Collections
                    </h1>

                    <p className="text-[13px] text-neutral-500">
                        {collections.length}{" "}
                        {collections.length === 1
                            ? "collection"
                            : "collections"}
                    </p>
                </div>

                <Link to="/collections/new">
                    <Button>
                        <Plus
                            size={15}
                            strokeWidth={1.75}
                        />
                        Add collection
                    </Button>
                </Link>
            </div>

            {/* Collection table */}
            <CollectionTable
                collections={collections}
                onEditClick={(collection) =>
                    navigate(
                        `/collections/${collection._id}/edit`
                    )
                }
                onDeleteClick={setDeleteTarget}
            />

            {/* Delete confirmation */}
            <DeleteCollectionModal
                collection={deleteTarget}
                onClose={() =>
                    !deleting &&
                    setDeleteTarget(null)
                }
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />
        </div>
    );
}