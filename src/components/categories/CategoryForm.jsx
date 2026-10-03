import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function CategoryForm({
    initialData,
    onSubmit,
    submitting
}) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: null
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                image: null
            });

            setPreview(initialData.image || "");
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setForm((prev) => ({
            ...prev,
            image: file
        }));

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);

        if (form.image) {
            formData.append("image", form.image);
        }

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                label="Name"
                required
                value={form.name}
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value
                    })
                }
            />

            <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                    Description
                </span>

                <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }
                    className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
                />
            </label>

            <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">
                    Category image
                </span>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full cursor-pointer border border-neutral-300 px-3 py-2 text-sm"
                />
            </label>

            {preview && (
                <div className="overflow-hidden border border-neutral-200">
                    <img
                        src={preview}
                        alt="Category preview"
                        className="h-48 w-full object-cover"
                    />
                </div>
            )}

            <Button
                type="submit"
                disabled={submitting}
            >
                {submitting ? "SAVING..." : "SAVE"}
            </Button>
        </form>
    );
}