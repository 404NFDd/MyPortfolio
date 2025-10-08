import { Github, ExternalLink } from 'lucide-react'

export default function ProjectCard({ project }) {
    const imgSrc = project.thumbnail || "/placeholder.svg";
    const githubUrl = project.githubUrl || project.github_url || "#";
    const liveUrl = project.liveUrl || project.live_url || "#";

    const tags = project.tags ?? [];
    return (
        <article className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-surface-elevated">
                <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-balance group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                <p className="text-foreground-muted text-sm leading-relaxed text-pretty">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {(project.tags ?? []).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-surface-elevated text-primary text-xs font-medium rounded-full border border-border">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-surface-elevated hover:bg-border rounded-lg text-sm font-medium transition-colors group/link"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-background rounded-lg text-sm font-medium transition-colors group/link"
                    >
                        <span>자세히 보기</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                </div>
            </div>
        </article>
    )
}