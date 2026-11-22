/*
 * The rings' switches, as the static example has them: --pg-reels-seen and
 * --pg-reels-seen-for through the address (?seen=off, ?seen-for=1h) — App
 * reads it and sets them on the section. Each choice a link to this page
 * with it; the chosen one marked.
 */
const ROWS = [
    {
        label: "Rings once seen",
        key: "seen",
        choices: [
            ["", "go pale"],
            ["off", "stay bright"],
        ],
    },
    {
        label: "Bright again after",
        key: "seen-for",
        choices: [
            ["1m", "1 minute"],
            ["1h", "1 hour"],
            ["", "24 hours"],
            ["forever", "never"],
        ],
    },
] as const;

export function SeenSettings() {
    const query = new URLSearchParams(location.search);
    const href = (key: string, value: string) => {
        const next = new URLSearchParams(query);
        if (value) next.set(key, value);
        else next.delete(key);
        return `?${next}`;
    };
    return (
        <div className="settings">
            {ROWS.map(({ label, key, choices }) => (
                <div key={key}>
                    <span>{label}</span>
                    <div className="choices">
                        {choices.map(([value, name]) => (
                            <a key={value} href={href(key, value)} aria-current={(query.get(key) ?? "") === value}>
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
