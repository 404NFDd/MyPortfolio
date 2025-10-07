import { Github, Linkedin, Mail } from 'lucide-react'

export default function HeroSection() {
    const skills = [
        'React',
        'TypeScript',
        'Node.js',
        'Tailwind CSS',
        'Next.js',
        'PostgreSQL',
        'Git',
        'Figma',
    ]

    return (
        <section id="about" className="min-h-screen flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-primary font-mono text-sm">안녕하세요, 저는</p>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
                                Minsuk
                            </h1>
                            <h2 className="text-2xl sm:text-3xl text-foreground-muted font-light">
                                Developer
                            </h2>
                        </div>

                        <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
                            사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
                            접근성과 성능을 고려한 웹 애플리케이션을 만들며,
                            디자인과 개발의 교차점에서 가치를 창출합니다.
                        </p>

                        {/* Skills */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground-subtle uppercase tracking-wider">
                                기술 스택
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200 group"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:hello@johndoe.com"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="relative">
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Decorative background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>

                            {/* Image container */}
                            <div className="relative bg-surface-elevated rounded-2xl overflow-hidden border border-border">
                                <img
                                    src="/placeholder.svg?height=500&width=500"
                                    alt="Minsuk"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -right-4 bg-primary text-background px-6 py-3 rounded-xl font-semibold shadow-lg">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-background rounded-full animate-pulse"></span>
                                    Available for work
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}