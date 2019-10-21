import { writable } from "svelte/store";
import Tone from 'tone'

const type = writable('sound')
const selectedSound = writable(1)
const sounds = writable({})

const synthLib = {
    synth: { label: 'Synth', engine: new Tone.Synth() },
    metalSynth: { label: 'Metal Synth', engine: new Tone.MetalSynth() },
}

const initSounds = () => {
    sounds.update(n => {
        for (let i = 1; i <= 16; i++) {
            // Este es un buen sitio para cargar datos de memoria
            // Si encuentra datos, propiedad con los datos si no, null
            n[i] = null
        }
        console.log(n)
        return n
    })
}

const loadSound = (pad, synthType) => {
    sounds.update(n => {
        n[pad] = synthLib[synthType]
        console.log(n)
        return n
    })
}

const changeType = (val) => {
    type.update(val)
}

const changeSelectedSound = (val) => {
    selectedSound.update(n => val)
}

const padMenu = writable(false)
const togglePadMenu = (state, padID) => {
    padMenu.update(() => ({ state, padID }))
}

export { 
    changeType,
    togglePadMenu,
    padMenu,
    changeSelectedSound,
    selectedSound,
    initSounds,
    sounds,
    loadSound,
    synthLib,
}