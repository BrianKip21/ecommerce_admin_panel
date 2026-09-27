import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

const empty = {
    size: "",
    color: "",
    price: "",
    salePrice: "",
    stock: ""
};

const commonSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45"
];

const commonColors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Cream", value: "#fff7ed" },
    { name: "Brown", value: "#78350f" },
    { name: "Beige", value: "#d6c7a1" },
    { name: "Grey", value: "#9ca3af" },
    { name: "Navy", value: "#172554" },
    { name: "Red", value: "#dc2626" },
    { name: "Blue", value: "#2563eb" },
    { name: "Green", value: "#16a34a" }
];

export default function VariantForm({ onAdd, variants = [] }) {
    const [form, setForm] = useState(empty);

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };

    const handleAdd = () => {
        const size = form.size.trim();
        const color = form.color.trim();

        if (!size || !color) {
            toast.error("Size and color are required");
            return;
        }

        if (!form.price || Number(form.price) <= 0) {
            toast.error("Enter a valid price");
            return;
        }

        if (form.salePrice !== "" && Number(form.salePrice) >= Number(form.price)) {
            toast.error("Sale price must be less than regular price");
            return;
        }

        if (form.stock === "" || Number(form.stock) < 0) {
            toast.error("Enter a valid stock quantity");
            return;
        }

        const duplicate = variants.some(
            (variant) =>
                variant.size?.trim().toLowerCase() === size.toLowerCase() &&
                variant.color?.trim().toLowerCase() === color.toLowerCase()
        );

        if (duplicate) {
            toast.error(`${color} / ${size} already exists`);
            return;
        }

        const selectedColor = commonColors.find(
            (c) => c.name.toLowerCase() === color.toLowerCase()
        );

        onAdd({
            size,
            color,
            colorHex: selectedColor?.value,
            price: Number(form.price),
            salePrice:
                form.salePrice !== ""
                    ? Number(form.salePrice)
                    : null,
            stock: Number(form.stock)
        });

        setForm(empty);
    };

    return (
        <div className="border border-neutral-200 bg-neutral-50 p-4">

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                {/* SIZE */}

                <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-neutral-600">
                        Size
                    </label>

                    <select
                        value={form.size}
                        onChange={(e) =>
                            handleChange("size", e.target.value)
                        }
                        className="h-9 w-full border border-neutral-300 bg-white px-3 text-xs outline-none focus:border-neutral-900"
                    >
                        <option value="">Select size</option>

                        {commonSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* COLOR */}

                <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-neutral-600">
                        Color
                    </label>

                    <div className="flex h-9 items-center gap-2 border border-neutral-300 bg-white px-2">

                        <span
                            className="h-4 w-4 shrink-0 rounded-full border border-neutral-300"
                            style={{
                                backgroundColor:
                                    commonColors.find(
                                        (c) =>
                                            c.name.toLowerCase() ===
                                            form.color.toLowerCase()
                                    )?.value || form.color || "#ffffff"
                            }}
                        />

                        <select
                            value={form.color}
                            onChange={(e) =>
                                handleChange("color", e.target.value)
                            }
                            className="h-full w-full bg-transparent text-xs outline-none"
                        >
                            <option value="">Select color</option>

                            {commonColors.map((color) => (
                                <option
                                    key={color.name}
                                    value={color.name}
                                >
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* PRICE */}

                <Input
                    type="number"
                    label="Price"
                    placeholder="4500"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                        handleChange("price", e.target.value)
                    }
                />

                {/* SALE PRICE */}

                <Input
                    type="number"
                    label="Sale price"
                    placeholder="Optional"
                    min="0"
                    value={form.salePrice}
                    onChange={(e) =>
                        handleChange(
                            "salePrice",
                            e.target.value
                        )
                    }
                />

                {/* STOCK */}

                <Input
                    type="number"
                    label="Stock"
                    placeholder="0"
                    min="0"
                    value={form.stock}
                    onChange={(e) =>
                        handleChange("stock", e.target.value)
                    }
                />

            </div>

            <div className="mt-3">

                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAdd}
                >
                    <Plus size={14} strokeWidth={1.5} />
                    Add variant
                </Button>

            </div>
        </div>
    );
}