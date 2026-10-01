import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { prefersReducedMotion, useScramble } from '../motion'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [scrolled, setScrolled] = useState(false)
    const [wordmark, replayWordmark] = useScramble('MINSEOK', { duration: 600 })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 기본은 다크(:root), 라이트일 때만 <html class="light">
    // 지원 브라우저에서는 누른 버튼 위치에서 원형으로 퍼지며 전환
    const toggleTheme = (e) => {
        // 전환 스냅샷에 버튼 라벨까지 반영되도록 동기 렌더
        const apply = () => {
            flushSync(() => setIsDark(!isDark))
            document.documentElement.classList.toggle('light')
        }
        if (!document.startViewTransition || prefersReducedMotion()) return apply()
        const root = document.documentElement
        root.style.setProperty('--vt-x', `${e.clientX}px`)
        root.style.setProperty('--vt-y', `${e.clientY}px`)
        document.startViewTransition(apply)
    }

    const navLinks = [
        { href: '#about', label: '소개' },
        { href: '#experience', label: '경력' },
        { href: '#projects', label: '프로젝트' },
        { href: '#contact', label: '연락' },
    ]

    const themeButton = (
        <button onClick={toggleTheme} className="pill" aria-label="테마 전환">
            {isDark ? 'Light' : 'Dark'}
        </button>
    )

    return (
        <header className="fixed top-0 left-0 right-0 z-50 isolate">
            {/* 배경은 투명도만 애니메이션한다 (색까지 전환하면 테마 전환 중에 이전 색이 비침) */}
            <div
                aria-hidden="true"
                className={`absolute inset-0 -z-10 bg-background transition-opacity duration-300 ${scrolled || isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            />
            <nav className="px-3 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    {/* Wordmark */}
                    <a
                        href="#"
                        className="font-display text-4xl leading-none tracking-tight fade-in"
                        aria-label="MINSEOK 홈"
                        onMouseEnter={() => replayWordmark()}
                    >
                        <span aria-hidden="true">{wordmark}</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 fade-in" style={{ "--d": "150ms" }}>
                        {navLinks.map((link, idx) => (
                            <a key={link.href} href={link.href} className="label hover:underline underline-offset-4 decoration-accent">
                                <span className="text-muted-foreground">0{idx + 1}</span> {link.label}
                            </a>
                        ))}
                        {themeButton}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-1 md:hidden">
                        {themeButton}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="pill"
                            aria-label="메뉴 열기/닫기"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? 'Close' : 'Menu'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col gap-1 pb-4">
                        {navLinks.map((link, idx) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="label py-2"
                            >
                                <span className="text-muted-foreground">0{idx + 1}</span> {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}
