import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as collectionService from "../../services/collection.service";
import * as productService from "../../services/product.service";

import CollectionForm from "../../components/collections/CollectionForm";
import Spinner from "../../components/ui/Spinner";

export default function EditCollection() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [collection, setCollection] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const [collectionResponse, productsResponse] =
                    await Promise.all([
                        collectionService.getCollectionAdmin(id),
                        productService.getProducts({
                            limit: 200
                        })
                    ]);

                setCollection(collectionResponse.data);
                setProducts(productsResponse.data || []);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    "Failed to load collection";

                toast.error(message);

                navigate("/collections", {
                    replace: true
                });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);

            await collectionService.updateCollection(
                id,
                formData
            );

            toast.success("Collection updated");

            navigate("/collections");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to update collection";

            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!collection) {
        return null;
    }

    return (
        <div className="max-w-3xl space-y-5">
            <div>
                <h1 className="text-lg font-medium">
                    Edit collection
                </h1>

                <p className="mt-1 text-[13px] text-neutral-500">
                    Update the collection details and assigned
                    products.
                </p>
            </div>

            <CollectionForm
                initialData={collection}
                products={products}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
}