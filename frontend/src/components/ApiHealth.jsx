import { useEffect, useState } from "react";

export default function ApiHealth() {
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetch("/api/health/")
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            })
            .catch((e) => !cancelled && setErr(e.message))
            .finally(() => !cancelled && setLoading(false));
        return () => { cancelled = true; };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
    if (!data) return null;

    return (
        <div style={{ padding: "12px", border: "1px solid #ddd", borderRadius: 8 }}>
            <h3>API Health for the test</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
