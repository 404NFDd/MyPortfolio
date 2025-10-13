import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
    const [profile, setProfile] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/profile/")
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setProfile(json);
            })
            .catch((e) => !cancelled && setErr(e.message));
        return () => { cancelled = true; };
    }, []);

    if (err) return <p className="text-red-600">Error: {err}</p>;
    if (!profile) return <p>Loading...</p>;

    const { name, email, git_url, linkedin_url, tech_stack = [], location } = profile
        , currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-surface border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left - Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Let's Connect</h3>
                        <p className="text-foreground-muted text-pretty">
                            새로운 프로젝트나 협업 기회에 관해 이야기하고 싶으시다면 언제든지 편하게 연락 주세요.
                        </p>
                    </div>

                    {/* Right - Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Contact Me!</h3>
                        <div className="flex gap-4">
                            {git_url && (
                                <a
                                    href={git_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                            {linkedin_url && (
                                <a
                                    href={linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                    aria-label="Email"
                                >
                                    <Mail className="w-6 h-6" />
                                </a>
                            )}
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