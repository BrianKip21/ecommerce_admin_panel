import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function BrandForm({ initialData, onSubmit, submitting }) {
    const [form, setForm] = useState({ name: "", description: "" });

    useEffect(() => {
        if (initialData) {
            setForm({ name: initialData.name || "", description: initialData.description || "" });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">Description</span>
                <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
                />
            </label>
            <Button type="submit" disabled={submitting}>
                {submitting ? "SAVING..." : "SAVE"}
            </Button>
        </form>
    );
}
