import Reveal from "./Reveal"

const experiences = [
    {
        "id": 2,
        "company": "JRYN 의원",
        "position": "Developer",
        "period": "2026.06 ~ 현재",
        "description": "병원 CRM 등 업무 시스템과 웹 서비스 개발 및 개선",
        "achievements": [
            "병원 CRM의 예약 및 수납 흐름과 조회 성능 개선, API 응답과 회귀 테스트 정비",
            "Laravel 기반 다국어 서비스의 콘텐츠 관리, 상담 동선, 모바일·태블릿 화면 개선",
            "페이지 빌더의 편집·저장·게시 흐름과 데이터 수집 자동화 고도화",
            "AI 에이전트의 맥락 관리와 역할 분담, 검증 절차를 정리해 반복 적용 가능한 개발 흐름 구축"
        ],
        "technologies": ["Java (Spring Boot)", "PHP (Laravel)", "MySQL", "React", "Next.js", "Python"]
    },
    {
        "id": 1,
        "company": "WDB",
        "position": "Junior Developer",
        "period": "2023.10 ~ 2026.02",
        "description": "신규 플랫폼 개발 및 기존 시스템 유지보수 업무 수행",
        "achievements": [
            "Laravel(PHP) 기반의 배치 모듈 39건 신규 설계 및 구현, 월 3건 이상 유지 개발",
            "서비스 화면 기능 및 API 연동 기능 개발",
            "DB 유지보수 및 운영 대응(SQL 쿼리 수정, 구조 보완 등)",
            "기능 기획팀, 설계팀과 사양 검토 및 조정 커뮤니케이션 수행",
            "배치 모듈 설계부터 테스트·운영까지 주도하며, 신규 플랫폼의 핵심 데이터 처리 흐름 구축",
            "릴리즈 절차 정비 및 체크리스트 운영, 팀 내 안정적 배포 환경 조성",
            "API 연동 설계 중 타 부서 기능과의 충돌 발생 시, 조정안 제안 및 협업으로 해결"
        ],
        "technologies": ["PHP (Laravel)", "MS SQL Server", "GitHub", "Docker"]
    }
]

export default function Experience() {
    return (
        <section id="experience" className="px-3 sm:px-6 py-16">
            {/* Section Header */}
            <Reveal className="flex flex-col gap-1 mb-12">
                <p className="label text-muted-foreground">02 / Work experience</p>
                <h2 className="text-[30px] leading-[1.13]">경력</h2>
            </Reveal>

            <div className="flex flex-col gap-16">
                {experiences.map((exp) => (
                    <Reveal as="article" key={exp.id} className="grid md:grid-cols-[240px_minmax(0,1fr)] gap-3 md:gap-8">
                        {/* Meta */}
                        <div className="flex flex-col gap-1">
                            <p className="label">{exp.period}</p>
                            <p className="label text-muted-foreground">{exp.company}</p>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-4 max-w-[80ch]">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[30px] leading-[1.13]">{exp.position}</h3>
                                <p className="text-muted-foreground">{exp.description}</p>
                            </div>

                            <ul className="flex flex-col gap-2">
                                {exp.achievements.map((achievement, idx) => (
                                    <li key={idx} className="grid grid-cols-[32px_minmax(0,1fr)]">
                                        <span className="label text-muted-foreground pt-0.5">{String(idx + 1).padStart(2, "0")}</span>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>

                            <ul className="flex flex-wrap gap-1" aria-label="사용 기술">
                                {exp.technologies.map((tech) => (
                                    <li key={tech} className="pill hover:bg-transparent hover:text-foreground">{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
