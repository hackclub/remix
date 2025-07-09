export function createStrudelEditor() {
    const repl = document.createElement('strudel-editor');
    repl.setAttribute('code', `...`);
    repl.setAttribute(
        'code',
        `setcps(1)
n("<0 1 2 3 4>*8").scale('G4 minor')
.s("gm_lead_6_voice")
.clip(sine.range(.2,.8).slow(8))
.jux(rev)
.room(2)
.sometimes(add(note("12")))
.lpf(perlin.range(200,20000).slow(4))`,
    );
    document.getElementById('strudel').append(repl);
    console.log(repl);
}
