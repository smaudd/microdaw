import Tone from 'tone'
const play = (tone, note) => {
    if (note.length > 0) {
        tone.triggerAttackRelease(note, '2n').toMaster()
    }
}

const stop = (tone) => {
    // tone.synth.triggerRelease()
    // setTimeout(() => {
    //     tone.synth.releaseAll()
    // }, 50)
}
//repeated event every 8th note

Tone.Transport.schedule(function (time) {
    console.log(time)    //use the time argument to schedule a callback with Tone.Draw
    Tone.Draw.schedule(function () {
        console.log('dom!')
    }, time)
    //do something with the time
}, "8n")


export { play, stop }