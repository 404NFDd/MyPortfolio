import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer id="contact" className="bg-surface border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left - Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Let's Connect</h3>
                        <p className="text-foreground-muted text-pretty">
                            새로운 프로젝트나 협업 기회에 대해 이야기 나누고 싶으시다면
                            언제든지 연락주세요.
                        </p>
                        <a
                            href="mailto:hello@johndoe.com"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            hello@johndoe.com
                        </a>
                    </div>

                    {/* Right - Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Follow Me</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a
                                href="mailto:hello@johndoe.com"
                                className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-foreground-subtle text-sm">
                        © {currentYear} Minsuk. All rights reserved.
                    </p>
                    <p className="text-foreground-subtle text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-primary fill-primary" /> using React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    )
}