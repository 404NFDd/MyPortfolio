import { useEffect, useState } from "react";
import { useScramble } from "../motion";

const timeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

// 서울 기준 실시간 시계 (예: "10:40" + "PM")
function useSeoulTime() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const parts = timeFormat.formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    return { hour: get("hour"), minute: get("minute"), period: get("dayPeriod") };
}

export default function HeroSection() {
    const [profile, setProfile] = useState(null);
    const [err, setErr] = useState(null);
    const { hour, minute, period } = useSeoulTime();
    const [scrambledName, replayName] = useScramble(profile?.name ?? "", { delay: 250 });

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

    if (err || !profile) {
        return (
            <section id="about" className="min-h-svh flex items-end px-3 sm:px-6 pb-6">
                <p className="label">{err ? `Error: ${err}` : "Loading profile..."}</p>
            </section>
        );
    }

    const { name, email, headline, bio, git_url, linkedin_url, tech_stack = [], location, hero_background, profile_image } = profile;

    const links = [
        git_url && { href: git_url, label: "Github", external: true },
        linkedin_url && { href: linkedin_url, label: "LinkedIn", external: true },
        email && { href: `mailto:${email}`, label: "Email" },
    ].filter(Boolean);

    return (
        <section id="about" className="relative isolate overflow-hidden min-h-svh flex flex-col justify-between gap-16 px-3 sm:px-6 pt-20 pb-6">
            {/* Background */}
            {hero_background && (
                <div aria-hidden="true" className="absolute inset-0 -z-10">
                    <img src={hero_background} alt="" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>
            )}

            {/* Top: 시계 / 상태 */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1 fade-in" style={{ "--d": "100ms" }}>
                    <p className="label text-muted-foreground">Local time (UTC+9:00)</p>
                    <p className="font-display text-[80px] leading-[0.7] pt-3" aria-label={`서울 현재 시각 ${hour}:${minute} ${period}`}>
                        {hour}<span className="blink">:</span>{minute}<span className="text-[30px] ml-1">{period}</span>
                    </p>
                    <p className="label text-muted-foreground pt-2">{location || "Seoul, KR"}</p>
                </div>
                <p className="label flex items-center gap-2 fade-in" style={{ "--d": "200ms" }}>
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    Available for work
                </p>
            </div>

            {/* Bottom: 소개 / 링크 */}
            <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end">
                <div className="flex flex-col gap-3">
                    <div className="flex items-end gap-3 fade-in" style={{ "--d": "150ms" }}>
                        {profile_image && (
                            <img src={profile_image} alt={name} className="w-16 h-16 object-cover grayscale" />
                        )}
                        <p className="label text-muted-foreground">안녕하세요, 저는</p>
                    </div>
                    <h1
                        className="rise font-display text-[clamp(64px,12vw,160px)] leading-[0.7] pt-2 cursor-default"
                        aria-label={name}
                        onMouseEnter={() => replayName()}
                    >
                        <span aria-hidden="true" style={{ "--d": "200ms" }}>{scrambledName}</span>
                    </h1>
                    <h2 className="rise text-[22px] sm:text-[30px] leading-[1.13] max-w-[28ch] pt-2">
                        <span style={{ "--d": "380ms" }}>{headline || "Developer"}</span>
                    </h2>
                    <p className="max-w-[60ch] leading-[1.25] text-muted-foreground fade-in" style={{ "--d": "520ms" }}>
                        {bio || "자기소개 준비중입니다. 곧 업데이트 예정이니 조금만 기다려주세요!"}
                    </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end fade-in" style={{ "--d": "650ms" }}>
                    {links.length > 0 && (
                        <div className="flex flex-wrap gap-1 lg:justify-end">
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

                    {/* Skills */}
                    <div className="flex flex-col gap-2 lg:items-end">
                        <p className="label text-muted-foreground">Stack / {String(tech_stack.length).padStart(2, "0")}</p>
                        <ul className="flex flex-wrap gap-1 lg:justify-end max-w-[520px]">
                            {tech_stack.map((skill) => {
                                // 문자열("PHP") 또는 객체({ name, icon }) 모두 지원
                                const { name: label, icon } = typeof skill === "string" ? { name: skill } : skill;
                                return (
                                    <li key={label} className="pill hover:bg-transparent hover:text-foreground">
                                        {icon && (
                                            // 아이콘을 마스크로 써서 테마 글자색(단색)으로 표시
                                            <span
                                                aria-hidden="true"
                                                className="w-3 h-3 shrink-0 bg-current"
                                                style={{ mask: `url(${icon}) center / contain no-repeat` }}
                                            />
                                        )}
                                        {label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
