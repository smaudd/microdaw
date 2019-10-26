<script>
  import Pad from './Pad.svelte'
  import { get } from 'svelte/store'
  import { onDestroy } from 'svelte'
  import {
    changeSelectedSound,
    selectedSound,
    selectedPattern,
    generateScale,
    scaleToPadMap,
    lastNotePlayed,
    tones,
    sounds,
  } from '../lib/state'
  import { patterns, sequencer } from '../lib/sequencer'
  import { play, stop } from '../lib/audio'
  export let pads
  let scale
  let padMap
  let current
  let trans = false
  const padMapping = () => {
    pads.forEach((pad, index) => {
      pads[index].note = padMap[index]
      const soundStep = get(patterns)[get(selectedPattern)][index].filter(
        step => step.sound === get(selectedSound)
      )
      if (soundStep.length > 0) {
        pads[index].step = soundStep[0].note
        return
      }
      pads[index].step = 'N'
    })
  }
  const u1 = selectedSound.subscribe(value => {
    current = get(sounds)[value]
    scale = generateScale(current.tone, current.scale)
    padMap = scaleToPadMap(scale, current.octave)
    lastNotePlayed.update(() => padMap[0])
    padMapping()
  })
  const u2 = selectedPattern.subscribe(value => {
    padMapping()
  })
  const u3 = patterns.subscribe(value => {
    padMapping()
  })
  const u4 = sequencer.subscribe(value => {
    if (value.step > 0) {
      pads[value.step - 1].active = true
      setTimeout(() => {
        pads[value.step - 1].active = false
      }, 200)
    }
  })
  // Clean subscription
  onDestroy(u1, u2, u3, u4)
  let queue = []
  export const playCallback = note => {
    queue.push(note)
    setTimeout(() => {
      play(current, queue)
      setTimeout(() => {
        queue = []
      })
    })
  }

  export const stopCallback = note => {
    stop(current)
  }
</script>

<style>
  .pads-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: var(--px0);
  }
</style>

<div class="pads-grid">
  {#each pads as pad}
    <Pad
      padID={pad.id}
      active={pad.active}
      note={pad.note}
      step={pad.step}
      play={playCallback}
      stop={stopCallback} />
  {/each}
</div>
