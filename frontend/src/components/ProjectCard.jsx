import Reveal from "./Reveal"

export default function ProjectCard({ project, index }) {
    const imgSrc = project.thumbnail || "/placeholder.svg";
    const githubUrl = project.githubUrl || project.github_url;
    const liveUrl = project.liveUrl || project.live_url;

    const tags = project.tags ?? [];
    return (
        <Reveal as="article" delay={(index % 3) * 90} className="group flex flex-col gap-3">
            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden bg-border/40">
                <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <p className="label text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}{tags.length > 0 && ` — ${tags.join(" / ")}`}
                </p>
                <h3 className="text-[30px] leading-[1.13]">{project.title}</h3>
                <p className="text-muted-foreground max-w-[60ch]">{project.description}</p>
            </div>

            {/* Links (URL이 있는 것만 표시) */}
            {(githubUrl || liveUrl) && (
                <div className="flex flex-wrap gap-1">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="pill">
                            Github <span className="arrow">↗</span>
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="pill">
                            Live <span className="arrow">↗</span>
                        </a>
                    )}
                </div>
            )}
        </Reveal>
    )
}
