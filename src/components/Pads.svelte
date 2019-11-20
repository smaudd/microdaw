<script>
  import Pad from './Pad.svelte'
  import {
    generateScale,
    scaleToPadMap,
  } from '../lib/state'
  import { afterUpdate, onDestroy } from 'svelte'
  import { sequencer, recording } from '../lib/sequencer'
  import { play, stop } from '../lib/audio'
  export let pads
  export let willChangeCurrent
  export let sound
  export let sounds
  export let pattern
  export let patterns
  export let mode
  export let currentNote
  export let currentSound
  export let currentPattern

  let scale
  let padMap

  afterUpdate(() => {
    padMapping()
  })
  const padMapping = () => {
    pads.forEach((pad, index) => {
      scale = generateScale(sound.tone, sound.scale)
      padMap = scaleToPadMap(scale, sound.octave)
      pads[index].note = padMap[index]
      const step = pattern[index].filter(step => step.sound === currentSound.value)
      if (step.length > 0) {
        pads[index].step = step[0].note
        return
      }
      pads[index].step = 'N'
    })
  }
  const unsubscribe = sequencer.subscribe(value => {
    if (value.step > 0) {
      pads[value.step - 1].active = true
      setTimeout(() => {
        pads[value.step - 1].active = false
      }, 200)
    }
  })
  onDestroy(unsubscribe)
  let queue = []
  const playCallback = (note, id) => {
    const index = id === 0 ? 0 : id - 1
    pads[index].active = true
    queue.push(note)
    if ($recording) {
      patterns.update($sequencer.step, note)
    }
    play(sound.synth, queue, sound.type !== 'Sampler' ? '2n' : false)
    queue = []
  }

  const stopCallback = (note, id) => {
    const index = id === 0 ? 0 : id - 1
    pads[index].active = false
    stop(sound.synth)
  }
</script>

<style>
  .pads-grid {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: var(--px0);
  }
</style>

<div class="pads-grid">
  {#each pads as pad}
    <Pad
      {willChangeCurrent}
      {pad}
      {patterns}
      {mode}
      {currentSound}
      {currentPattern}
      {currentNote}
      {currentNote}
      play={playCallback}
      stop={stopCallback} />
  {/each}
</div>
