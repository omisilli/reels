import { ForgetSeen, Reels, ReelsInit, type Vars } from "./Example";
import { reels } from "./data";
import { SchemeSwitch } from "./Scheme";

/*
 * The React example, running: the static example's page, built from data
 * with the components in Example.tsx. The package comes from its source
 * (../../index.ts), so a change there shows at once.
 */
export function App() {
    // ?duration=2s, ?seen=off, ?seen-for=1h — as in the static example.
    const query = new URLSearchParams(location.search);
    const style: Vars = {};
    if (query.get("duration")) style["--pg-reels-duration"] = query.get("duration")!;
    if (query.get("seen")) style["--pg-reels-seen"] = query.get("seen")!;
    if (query.get("seen-for")) style["--pg-reels-seen-for"] = query.get("seen-for")!;

    return (
        <main>
            <ReelsInit />
            <header>
                <h1>From our feed</h1>
                <p>
                    The React example: the same six groups as the static one, rendered from data. Every card in
                    sight plays, muted; press a card for the full view.
                </p>
                <SchemeSwitch />
                <ForgetSeen className="forget" />
            </header>
            <Reels reels={reels} style={style} />
        </main>
    );
}
