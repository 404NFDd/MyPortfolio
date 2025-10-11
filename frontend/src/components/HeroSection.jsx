import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HeroSection() {
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

    const { name, email, headline, bio, git_url, linkedin_url, tech_stack = [], location } = profile;

    return (
        <section id="about" className="min-h-screen flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-primary font-mono text-sm">안녕하세요, 저는</p>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
                                {name}
                            </h1>
                            <h2 className="text-2xl sm:text-3xl text-foreground-muted font-light">
                                {headline || "Developer"}
                            </h2>
                            {location && (
                                <p className="text-sm text-foreground-subtle">{location}</p>
                            )}
                        </div>

                        <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
                            {bio || "자기소개 준비중입니다. 곧 업데이트 예정이니 조금만 기다려주세요!"}
                        </p>

                        {/* Skills */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground-subtle uppercase tracking-wider">
                                기술 스택
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(tech_stack ?? []).map((skill) => (
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
                            {git_url && (
                                <a href={git_url} target="_blank" rel="noopener noreferrer"
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200 group"
                                    aria-label="GitHub">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {linkedin_url && (
                                <a href={linkedin_url} target="_blank" rel="noopener noreferrer"
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200 group"
                                    aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="p-3 bg-surface-elevated hover:bg-primary hover:text-background rounded-lg transition-all duration-200"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="relative">
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
                            <div className="relative bg-surface-elevated rounded-2xl overflow-hidden border border-border">
                                <img
                                    src={
                                        profile.profile_image
                                            ? profile.profile_image // Django에서 내려온 이미지 URL
                                            : "/placeholder.svg?height=500&width=500" // 기본 이미지
                                    }
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-primary text-background px-6 py-3 rounded-xl font-semibold shadow-lg">
                                <div className="flex items-center gap-2">
                                    {/* Online status indicator (green dot) */}
                                    <span
                                        className="relative flex w-2 h-2"
                                        aria-label="Online"
                                        title="Online"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                                        <span className="absolute inset-0 rounded-full bg-emerald-500/40 dark:bg-emerald-400/40 animate-ping" />
                                    </span>
                                    Available for work
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
