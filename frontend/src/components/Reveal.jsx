import { useEffect, useRef, useState } from "react";

// 화면에 들어오면 한 번 페이드업 (스타일은 App.css의 .reveal)
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShown(true);
                io.disconnect();
            }
        }, { rootMargin: "0px 0px -10% 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal ${shown ? "is-in" : ""} ${className}`}
            style={{ "--d": `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
