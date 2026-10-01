import { useCallback, useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

// 텍스트가 무작위 글리프에서 왼쪽부터 원래 글자로 풀리는 효과. replay()로 다시 실행한다.
export function useScramble(text, { duration = 900, delay = 0 } = {}) {
    const [output, setOutput] = useState(text);
    const frame = useRef(0);

    const replay = useCallback((wait = 0) => {
        cancelAnimationFrame(frame.current);
        const skip = !text || prefersReducedMotion();
        let start = null;
        const tick = (now) => {
            start ??= now + wait;
            const progress = Math.max(0, now - start) / duration;
            if (skip || progress >= 1) {
                setOutput(text);
                return;
            }
            const resolved = Math.floor(progress * text.length);
            setOutput(
                text
                    .split("")
                    .map((ch, i) => (i < resolved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
                    .join("")
            );
            frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
    }, [text, duration]);

    useEffect(() => {
        replay(delay);
        return () => cancelAnimationFrame(frame.current);
    }, [replay, delay]);

    return [output, replay];
}
