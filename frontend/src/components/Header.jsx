import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle('dark')
    }

    const navLinks = [
        { href: '#about', label: '소개' },
        { href: '#experience', label: '경력' },
        { href: '#projects', label: '프로젝트' },
        { href: '#contact', label: '연락' },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-background transition-transform group-hover:scale-110">
                            MS
                        </div>
                        <span className="font-semibold text-lg hidden sm:block">Minsuk</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-foreground-muted hover:text-primary transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-surface-elevated hover:bg-border transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-surface-elevated hover:bg-border transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg bg-surface-elevated hover:bg-border transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-3 text-foreground-muted hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}