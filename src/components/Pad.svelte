<script>
  import Tone from 'tone'
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import {
    changeSelectedSound,
    changeSelectedPattern,
    selectedSound,
    mode,
    onChange,
    changeMode,
    lastNotePlayed,
  } from '../lib/state'
  import { fade } from 'svelte/transition'
  import { sounds } from '../lib/state'
  export let padID
  export let active
  export let note
  export let play
  export let stop
  let blink = false

  onChange.subscribe(status => {
    if (status) {
      blink = true
      return
    }
    blink = false
  })

  const attack = e => {
    const m = get(mode)
    if (blink) {
      if (m === 'sound') {
        changeSelectedSound(parseInt(e.target.getAttribute('id')))
      } else if (m === 'pattern') {
        changeSelectedPattern(parseInt(e.target.getAttribute('id')))
      }
      onChange.update(() => false)
      return
    }
    if (get(mode) === 'pattern') {
      console.log(get(lastNotePlayed))
      return
    }
    lastNotePlayed.update(() => note)
    play(note)
    active = true
  }

  const release = e => {
    active = false
    stop()
  }
</script>

<style>
  .pad {
    border-radius: var(--px0);
    margin: var(--px0);
    border: 2px solid var(--primary);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    animation: fade 0.5s forwards;
  }

  .blink {
    animation: fade;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .note {
    pointer-events: none;
  }

  @keyframes fade {
    from {
      background: transparent;
    }
    to {
      background: var(--secondary);
      opacity: 0.4;
    }
  }
</style>

<div
  id={padID}
  on:touchstart={attack}
  on:touchend={release}
  on:mouseleave={release}
  class="pad"
  class:active
  class:blink>
  <p class="note">{note}</p>
</div>
