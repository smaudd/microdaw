import Tone from 'tone'
import { selectedSound, tone, sounds } from './state'
import { writable } from "svelte/store";

scales = {
    "c major": ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C4']
}

selectedSound.subscribe(value => {
    
})

