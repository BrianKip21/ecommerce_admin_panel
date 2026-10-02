import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const EMPTY_FORM = {
    name: "",
    description: "",
    isActive: true,
    sortOrder: 0
};

export default function CollectionForm({
    initialData,
    products = [],
    onSubmit,
    submitting
}) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Reset form when creating a new collection
        if (!initialData) {
            setForm(EMPTY_FORM);
            setSelectedProducts([]);
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        // Populate form when editing
        setForm({
            name: initialData.name || "",
            description: initialData.description || "",
            isActive: initialData.isActive ?? true,
            sortOrder: initialData.sortOrder ?? 0
        });

        setSelectedProducts(
            (initialData.products || []).map((product) =>
                typeof product === "string"
                    ? product
                    : product._id
            )
        );

        setImageFile(null);
        setImagePreview(initialData.image || null);
    }, [initialData]);

    // Clean up temporary image URLs
    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Revoke previous temporary preview
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const toggleProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id)
                ? prev.filter((productId) => productId !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "name",
            form.name.trim()
        );

        formData.append(
            "description",
            form.description.trim()
        );

        formData.append(
            "isActive",
            String(form.isActive)
        );

        formData.append(
            "sortOrder",
            String(Number(form.sortOrder) || 0)
        );

        formData.append(
            "products",
            JSON.stringify(selectedProducts)
        );

        if (imageFile) {
            formData.append("image", imageFile);
        }

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Basic information + image */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                    <Input
                        name="name"
                        label="Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label className="block">
                        <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                            Description
                        </span>

                        <textarea
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe this collection..."
                            className="w-full resize-none rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-900"
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            name="sortOrder"
                            label="Display order"
                            min="0"
                            value={form.sortOrder}
                            onChange={handleChange}
                        />

                        <label className="flex items-center gap-2 pt-7">
                            <input
                                type="checkbox"
                                checked={form.isActive}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isActive:
                                            e.target.checked
                                    }))
                                }
                                className="h-4 w-4"
                            />

                            <span className="text-[13px] text-neutral-700">
                                Active
                            </span>
                        </label>
                    </div>
                </div>

                {/* Image */}
                <div>
                    <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                        Collection image
                    </span>

                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Collection preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-[12px] text-neutral-400">
                                No image selected
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full text-[12px] text-neutral-500"
                    />
                </div>
            </div>

            {/* Products */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-neutral-600">
                        Products
                    </span>

                    <span className="text-[12px] text-neutral-400">
                        {selectedProducts.length} selected
                    </span>
                </div>

                <div className="max-h-72 overflow-y-auto rounded-lg border border-neutral-200">
                    {products.length === 0 ? (
                        <div className="px-4 py-8 text-center text-[12px] text-neutral-400">
                            No products available.
                        </div>
                    ) : (
                        products.map((product) => {
                            const selected =
                                selectedProducts.includes(
                                    product._id
                                );

                            return (
                                <label
                                    key={product._id}
                                    className={`flex cursor-pointer items-center gap-3 border-b border-neutral-100 px-3 py-2 text-[13px] last:border-0 ${
                                        selected
                                            ? "bg-neutral-50"
                                            : "hover:bg-neutral-50"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={() =>
                                            toggleProduct(
                                                product._id
                                            )
                                        }
                                        className="h-4 w-4"
                                    />

                                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-neutral-100">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>

                                    <span className="truncate text-neutral-700">
                                        {product.title}
                                    </span>
                                </label>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={
                        submitting ||
                        !form.name.trim()
                    }
                >
                    {submitting
                        ? "SAVING..."
                        : "SAVE COLLECTION"}
                </Button>
            </div>
        </form>
    );
}