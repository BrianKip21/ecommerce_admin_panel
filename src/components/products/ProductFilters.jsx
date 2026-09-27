import Select from "../ui/Select";

export default function ProductFilters({ categories, brands, category, brand, sort, onChange }) {
    return (
        <div className="flex flex-wrap gap-3">
            <Select value={category} onChange={(e) => onChange("category", e.target.value)} className="w-40">
                <option value="">All categories</option>
                {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </Select>
            <Select value={brand} onChange={(e) => onChange("brand", e.target.value)} className="w-40">
                <option value="">All brands</option>
                {brands.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                ))}
            </Select>
            <Select value={sort} onChange={(e) => onChange("sort", e.target.value)} className="w-44">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
            </Select>
        </div>
    );
}
