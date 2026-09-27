export default function Table({ columns, children }) {
    return (
        <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full text-left text-[13px]">
                <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                        {columns.map((col) => (
                            <th key={col} className="px-4 py-3 font-medium text-neutral-500">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">{children}</tbody>
            </table>
        </div>
    );
}
