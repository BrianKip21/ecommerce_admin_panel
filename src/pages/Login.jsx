import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form);
            navigate("/", { replace: true });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
            <div className="w-full max-w-sm">
                <p className="text-center text-2xl lowercase" style={{ fontFamily: "Georgia, serif" }}>
                    liaan
                </p>
                <p className="mt-1 text-center text-[11px] tracking-[1.5px] text-neutral-400">ADMIN</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <Input
                        type="email"
                        required
                        label="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                        type="password"
                        required
                        label="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "LOGGING IN..." : "LOG IN"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
