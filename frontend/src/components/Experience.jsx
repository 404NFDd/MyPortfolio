"use client"
import { Briefcase, Calendar } from "lucide-react"
const experiences = [
    {
        "id": 1,
        "company": "WDB",
        "position": "Junior Developer",
        "period": "2023.10 - 현재",
        "description": "신규 플랫폼 개발 및 기존 시스템 유지보수 업무 수행",
        "achievements": [
            "Laravel 기반 백엔드 및 배치 설계·구현",
            "MS SQL 기반 데이터베이스 구조 설계 및 쿼리 개선",
            "업무 화면 API 개발 및 릴리즈 대응",
            "기획·설계팀과의 사양 조율 및 테스트 항목 도출",
            "릴리즈 체크리스트 및 드라이런 등 운영 안정화 절차 정비"
        ],
        "technologies": ["PHP (Laravel)", "MS SQL Server", "GitHub", "Docker"]
    }
]
export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="space-y-4 mb-16">
                    <div className="flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-primary" />
                        <h2 className="text-4xl sm:text-5xl font-bold text-balance ">Work Experience</h2>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                        제가 이제까지 쌓아온 실무 경험과 성과를 소개합니다.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden sm:block" />

                                {/* Content Card */}
                                <div className="sm:ml-20 bg-surface rounded-xl border border-border p-6 md:p-8 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-foreground">{exp.position}</h3>
                                            <p className="text-lg text-primary font-semibold">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium whitespace-nowrap">{exp.period}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed mb-6">{exp.description}</p>

                                    {/* Achievements */}
                                    <div className="space-y-3 mb-6">
                                        <h4 className="text-sm font-semibold text-subtle uppercase tracking-wider">주요 성과</h4>
                                        <ul className="space-y-2">
                                            {exp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                    <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-subtle uppercase tracking-wider">사용 기술</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1.5 bg-surface-elevated text-primary text-sm font-medium rounded-lg border border-border"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
