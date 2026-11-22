import { useEffect, useState } from "react";

/*
 * The example page's colour-scheme switch — not the package's: System,
 * Light, Dark. One choice for every example, kept in this browser; an
 * example open in another tab follows it. index.html sets the first one
 * before the first paint; example.css reads data-scheme.
 */
const KEY = "pg-example-scheme";
const CHOICES = [
    ["system", "System"],
    ["light", "Light"],
    ["dark", "Dark"],
] as const;
type Choice = (typeof CHOICES)[number][0];

function saved(): Choice {
    try {
        const value = localStorage.getItem(KEY);
        if (CHOICES.some(([c]) => c === value)) return value as Choice;
    } catch {}
    return "system";
}

export function SchemeSwitch() {
    const [choice, setChoice] = useState<Choice>(saved);

    useEffect(() => {
        const system = matchMedia("(prefers-color-scheme: dark)");
        const apply = () => {
            const dark = choice === "dark" || (choice === "system" && system.matches);
            document.documentElement.dataset.scheme = dark ? "dark" : "light";
        };
        const onStorage = (e: StorageEvent) => e.key === KEY && setChoice(saved());
        apply();
        system.addEventListener("change", apply);
        addEventListener("storage", onStorage);
        return () => {
            system.removeEventListener("change", apply);
            removeEventListener("storage", onStorage);
        };
    }, [choice]);

    const choose = (c: Choice) => {
        try {
            localStorage.setItem(KEY, c);
        } catch {}
        setChoice(c);
    };

    return (
        <div className="scheme" role="group" aria-label="Colour scheme">
            {CHOICES.map(([c, label]) => (
                <button key={c} type="button" aria-pressed={choice === c} onClick={() => choose(c)}>
                    {label}
                </button>
            ))}
        </div>
    );
}
