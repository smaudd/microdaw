import { writable } from "svelte/store";
import Tone from 'tone'


const mode = writable('sound')
const onChange = writable(false)
const tones = writable({})
const selectedSound = writable(1)
const selectedPattern = writable(1)
const sounds = writable({})
const lastNotePlayed = writable(null)
const globalMenu = writable(false)

const synthLib = {
    'Synth': new Tone.PolySynth(4, Tone.Synth),
    'FMSynth': new Tone.PolySynth(4, Tone.FMSynth)
}


const scaleLib = {
    'Major': [0, 2, 4, 5, 7, 9, 11],
    'Minor': [0, 2, 3, 5, 7, 8, 10]
}

const toneLib = [
    'C', // 0
    'C#', // 1 
    'D', // 2
    'D#', // 3
    'E', // 4
    'F', // 5 
    'F#', // 6
    'G', // 7
    'G#', // 8
    'A', // 9
    'A#', // 10
    'B', // 11
]

const generateScale = (tone, scale) => {
    const toneRef = [...toneLib]
    const scaleRef = {...scaleLib}
    const index = toneRef.indexOf(tone)
    const firstSlice = toneRef.slice(0, index)
    const secondSlice = toneRef.splice(index)
    const tones = [...secondSlice, ...firstSlice]
    return scaleRef[scale].map(interval => tones[interval])
}

const scaleToPadMap = (scale, octave) => {
    // Esta funcion es mejorable
    let shouldContinueLow = false
    let shouldContinueHigh = false
    const low = scale.map((note, index) => {
        if (note === 'C' || note === 'C#' && scale[index - 1] === 'B' || shouldContinueLow) {
            shouldContinueLow = true
            return `${note}${octave + 1}`
        }
        return `${note}${octave}`
    })
    const high = scale.map((note, index) => {
        if (note === 'C' || note === 'C#' && scale[index - 1] === 'B' || shouldContinueHigh) {
            // 420
            shouldContinueHigh = true
            return `${note}${octave + 2}`
        }
        return `${note}${octave + 1}`
    })
    high.push(high[0])
    low.push(low[0])
    return [...low, ...high]
}


const initPads = () => {
    initSounds(toneLib, scaleLib)
}

const initSounds = () => {
    sounds.update(n => {
        for (let i = 1; i <= 16; i++) {
            // Este es un buen sitio para cargar datos de memoria
            // Si encuentra datos, propiedad con los datos si no, null
            n[i] = {}
            n[i].octave = 3
            n[i].tone = 'C'
            n[i].scale = 'Major'
            n[i].synth = synthLib["Synth"]
        }
        return n
    })
}

const loadSound = (pad, { tone, scale, synth }) => {
    sounds.update(n => {
        if (scale) {
            n[pad].scale = scale
        }
        if (tone) {
            n[pad].tone = tone
         }
        if (synth) {
            n[pad].synth = synthLib[synth]
        }
        return n
    })
}

const loadTone = (pad, tone) => {
    tones.update(n => {
        n[pad] = tone
        return n
    })
}


const clearSound = (pad) => {
    sounds.update(n => {
        n[pad] = null
    })
}

const changeMode = (val) => {
    mode.update(() => val)
}

const padMenu = writable(false)
const togglePadMenu = (state, padID) => {
    padMenu.update(() => ({ state, padID }))
}

const toggleGlobalMenu = () => {
    globalMenu.update(n => !n)
}

export { 
    changeMode,
    togglePadMenu,
    padMenu,
    selectedSound,
    selectedPattern,
    generateScale,
    scaleToPadMap,
    initPads,
    sounds,
    tones,
    loadSound,
    loadTone,
    synthLib,
    toneLib,
    scaleLib,
    clearSound,
    mode,
    onChange,
    lastNotePlayed,
    globalMenu,
    toggleGlobalMenu
}