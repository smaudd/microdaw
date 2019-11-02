const togglePadMenu = () => (padMenu = !padMenu)
const setWillChangeCurrent = val => {
    if (
        (val === 'sound' && willChangeCurrent === 'sound') ||
        (val === 'pattern' && willChangeCurrent === 'pattern')
    ) {
        willChangeCurrent = false
        return
    }
    willChangeCurrent = val
}
const updateCurrentNote = note => (currentNote = note)
const changeSound = n => (currentSound = n)
const changePattern = n => (currentPattern = n)
const toggleMode = () => {
    mode === 'sound' ? (mode = 'pattern') : (mode = 'sound')
}
const updateSound = (id, { tone, scale, synth }) => {
    if (scale) {
        sounds[id].scale = scale
    }
    if (tone) {
        sounds[id].tone = tone
    }
    if (synth) {
        sounds[id].synth = synthLib[synth]
    }
}
const updatePattern = (step, note) => {
    const sound = sounds[currentSound]
    const indexedStep = step === 0 ? 0 : step - 1
    const ref = patterns[currentPattern][indexedStep]
    // erase step
    if (!note) {
        const pop = ref.filter(step => step.sound !== currentSound)
        patterns[currentPattern][indexedStep] = pop
        return
    }
    // write step
    if (ref.length < maxVoices) {
        ref.push({
            note,
            synth: sound.synth,
            sound: currentSound,
        })
        patterns[currentPattern][indexedStep] = ref
        return
    }
}

export { 
    toggleMode,
    togglePadMenu,
    setWillChangeCurrent,
    updateCurrentNote,
    updatePattern,
    updateSound,
    changePattern,
    changeSound,
}