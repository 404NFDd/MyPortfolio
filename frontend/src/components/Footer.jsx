import { useEffect, useState } from "react";
import Reveal from "./Reveal";

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

    if (err) return <p className="label px-3 sm:px-6 py-6">Error: {err}</p>;
    if (!profile) return null;

    const { email, git_url, linkedin_url } = profile
        , currentYear = new Date().getFullYear();

    const links = [
        git_url && { href: git_url, label: "Github", external: true },
        linkedin_url && { href: linkedin_url, label: "LinkedIn", external: true },
        email && { href: `mailto:${email}`, label: "Email" },
    ].filter(Boolean);

    return (
        <footer id="contact" className="px-3 sm:px-6 pt-16 pb-6 flex flex-col gap-16">
            <Reveal className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end">
                <div className="flex flex-col gap-3">
                    <p className="label text-muted-foreground">04 / Contact</p>
                    <h2 className="font-display text-[clamp(56px,10vw,128px)] leading-[0.7] pt-2">Let's connect</h2>
                    <p className="text-muted-foreground max-w-[50ch]">
                        새로운 프로젝트나 협업 기회에 관해 이야기하고 싶으시다면 언제든지 편하게 연락 주세요.
                    </p>
                </div>

                {links.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:justify-end">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="pill"
                                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                            >
                                {link.label} <span className="arrow">↗</span>
                            </a>
                        ))}
                    </div>
                )}
            </Reveal>

            {/* Bottom */}
            <div className="flex flex-col sm:flex-row justify-between gap-1">
                <p className="label text-muted-foreground">© {currentYear} Minseok. All rights reserved.</p>
                <p className="label text-muted-foreground">Built with React / Tailwind CSS / Django</p>
            </div>
        </footer>
    )
}
