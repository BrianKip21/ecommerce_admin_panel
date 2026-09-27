import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import VariantForm from "./VariantForm";
import VariantTable from "./VariantTable";

export default function ProductForm({
    initialData,
    categories = [],
    brands = [],
    onSubmit,
    submitting
}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        brand: ""
    });

    const [variants, setVariants] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // ============================================================
    // LOAD EXISTING PRODUCT
    // ============================================================

    useEffect(() => {
        if (!initialData) return;

        setForm({
            title: initialData.title || "",
            description: initialData.description || "",
            category: initialData.category?._id || initialData.category || "",
            brand: initialData.brand?._id || initialData.brand || ""
        });

        setVariants(initialData.variants || []);
        setImagePreview(initialData.image || null);
        setImageFile(null);
    }, [initialData]);

    // ============================================================
    // CLEAN UP IMAGE PREVIEW
    // ============================================================

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // ============================================================
    // FORM CHANGE
    // ============================================================

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };

    // ============================================================
    // IMAGE
    // ============================================================

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Optional 50MB limit
        if (file.size > 50 * 1024 * 1024) {
            toast.error("Image must be smaller than 50MB");
            return;
        }

        // Revoke previous local preview if necessary
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // ============================================================
    // VARIANTS
    // ============================================================

    const handleAddVariant = (variant) => {
        setVariants((current) => [
            ...current,
            variant
        ]);
    };

    const handleRemoveVariant = (index) => {
        setVariants((current) =>
            current.filter((_, i) => i !== index)
        );
    };

    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = (e) => {
        e.preventDefault();

        // --------------------------------------------------------
        // BASIC VALIDATION
        // --------------------------------------------------------

        if (!form.title.trim()) {
            toast.error("Product title is required");
            return;
        }

        if (!form.description.trim()) {
            toast.error("Product description is required");
            return;
        }

        if (!form.category) {
            toast.error("Please select a category");
            return;
        }

        if (!form.brand) {
            toast.error("Please select a brand");
            return;
        }

        if (variants.length === 0) {
            toast.error("Add at least one product variant");
            return;
        }

        // --------------------------------------------------------
        // CREATE FORM DATA
        // --------------------------------------------------------

        const formData = new FormData();

        formData.append(
            "title",
            form.title.trim()
        );

        formData.append(
            "description",
            form.description.trim()
        );

        formData.append(
            "category",
            form.category
        );

        formData.append(
            "brand",
            form.brand
        );

        formData.append(
            "variants",
            JSON.stringify(variants)
        );

        // Only send an image when a new one was selected.
        if (imageFile) {
            formData.append(
                "image",
                imageFile
            );
        }

        onSubmit(formData);
    };

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ====================================================
                BASIC PRODUCT INFORMATION
            ==================================================== */}

            <section className="space-y-5">

                <div>
                    <h2 className="text-sm font-medium text-neutral-900">
                        Product information
                    </h2>

                    <p className="mt-1 text-[11px] text-neutral-400">
                        Basic information about the product.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">

                    {/* LEFT */}

                    <div className="space-y-4">

                        <Input
                            label="Title"
                            required
                            value={form.title}
                            onChange={(e) =>
                                handleChange(
                                    "title",
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Classic Leather Sneaker"
                        />

                        <label className="block">

                            <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                                Description
                            </span>

                            <textarea
                                required
                                rows={5}
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Describe the product..."
                                className="w-full resize-none border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900"
                            />

                        </label>

                        {/* CATEGORY + BRAND */}

                        <div className="grid grid-cols-2 gap-4">

                            <Select
                                label="Category"
                                required
                                value={form.category}
                                onChange={(e) =>
                                    handleChange(
                                        "category",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select category
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                label="Brand"
                                required
                                value={form.brand}
                                onChange={(e) =>
                                    handleChange(
                                        "brand",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select brand
                                </option>

                                {brands.map((brand) => (
                                    <option
                                        key={brand._id}
                                        value={brand._id}
                                    >
                                        {brand.name}
                                    </option>
                                ))}
                            </Select>

                        </div>

                    </div>

                    {/* RIGHT - IMAGE */}

                    <div>

                        <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                            Product image
                        </span>

                        <div className="aspect-[4/5] w-full max-w-[220px] overflow-hidden border border-neutral-300 bg-neutral-100">

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[12px] text-neutral-400">
                                    No image selected
                                </div>
                            )}

                        </div>

                        <label className="mt-3 inline-flex cursor-pointer items-center border border-neutral-300 px-3 py-2 text-[11px] tracking-wide text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900">

                            Choose image

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>

                        <p className="mt-2 text-[10px] leading-relaxed text-neutral-400">
                            JPG, PNG or WebP. Maximum 20MB
                        </p>

                    </div>

                </div>

            </section>


            {/* ====================================================
                VARIANTS
            ==================================================== */}

            <section className="space-y-4">

                <div className="flex items-end justify-between">

                    <div>
                        <h2 className="text-sm font-medium text-neutral-900">
                            Product variants
                        </h2>

                        <p className="mt-1 text-[11px] text-neutral-400">
                            Define the available colors, sizes, prices and stock.
                        </p>
                    </div>

                    {variants.length > 0 && (
                        <span className="text-[10px] uppercase tracking-[1px] text-neutral-400">
                            {variants.length}{" "}
                            {variants.length === 1
                                ? "variant"
                                : "variants"}
                        </span>
                    )}

                </div>


                {/* EXISTING VARIANTS */}

                <VariantTable
                    variants={variants}
                    onRemove={handleRemoveVariant}
                />


                {/* ADD VARIANT */}

                <div className="pt-1">

                    <VariantForm
                        variants={variants}
                        onAdd={handleAddVariant}
                    />

                </div>

            </section>


            {/* ====================================================
                SUBMIT
            ==================================================== */}

            <div className="flex items-center gap-3 border-t border-neutral-200 pt-5">

                <Button
                    type="submit"
                    disabled={submitting}
                >
                    {submitting
                        ? "SAVING..."
                        : initialData
                            ? "UPDATE PRODUCT"
                            : "SAVE PRODUCT"}
                </Button>

                {variants.length === 0 && (
                    <span className="text-[10px] text-neutral-400">
                        Add at least one variant to continue.
                    </span>
                )}

            </div>

        </form>
    );
}
