<script>
  import Pad from './Pad.svelte'
  import { get } from 'svelte/store'
  import { onDestroy } from 'svelte'
  import {
    changeSelectedSound,
    selectedSound,
    generateScale,
    scaleToPadMap,
    lastNotePlayed,
    tones,
    sounds,
  } from '../lib/state'
  import { play, stop } from '../lib/audio'
  export let pads
  let scale
  let padMap
  let current
  const unsubscribe = selectedSound.subscribe(value => {
    current = get(sounds)[value]
    scale = generateScale(current.tone, current.scale)
    padMap = scaleToPadMap(scale, current.octave)
    lastNotePlayed.update(() => padMap[0])
    pads.forEach((pad, index) => {
      pads[index].note = padMap[index]
    })
  })
  onDestroy(unsubscribe)
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
  }
</style>

<div class="pads-grid">
  {#each pads as pad}
    <Pad
      padID={pad.id}
      active={pad.active}
      note={pad.note}
      play={playCallback}
      stop={stopCallback} />
  {/each}
</div>
