import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function ProjectsSection() {
    const [items, setItems] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/projects/")
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const list = Array.isArray(json) ? json : json.results || [];
                if (!cancelled) setItems(list);
            })
            .catch((e) => !cancelled && setErr(e.message))
            .finally(() => !cancelled && setLoading(false));
        return () => { cancelled = true; };
    }, []);

    return (
        <section id="projects" className="px-3 sm:px-6 py-16">
            {/* Section Header */}
            <Reveal className="flex flex-col gap-1 mb-12">
                <p className="label text-muted-foreground">03 / Featured projects</p>
                <h2 className="text-[30px] leading-[1.13]">작업한 프로젝트</h2>
                <p className="text-muted-foreground max-w-[60ch]">
                    각 프로젝트는 실제 문제를 해결하고 사용자에게 가치를 제공하는 것을 목표로 합니다.
                </p>
            </Reveal>

            {/* Projects Grid */}
            {loading && <p className="label">Loading projects...</p>}
            {err && <p className="label">Error: {err}</p>}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-16">
                {items.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>
    );
}
