import ProjectCard from './ProjectCard'
import projectsData from '../data/projects.json'

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 bg-surface/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-balance">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl text-pretty">
                        제가 작업한 프로젝트들입니다. 각 프로젝트는 실제 문제를 해결하고
                        사용자에게 가치를 제공하는 것을 목표로 합니다.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {(projectsData ?? []).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    )
}