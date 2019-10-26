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
  import { setStep } from '../lib/sequencer'
  import { fade, slide, fly } from 'svelte/transition'
  import { sounds } from '../lib/state'
  export let padID
  export let active
  export let note
  export let play
  export let stop
  export let step
  let blink = false
  let trans = false
  let lastNoteCache
  let timeout
  onChange.subscribe(value => {
    if (value) {
      blink = value
      return
    }
    blink = false
  })

  const attack = e => {
    const m = get(mode)
    // Change pattern/sound
    if (blink) {
      switch (blink) {
        case 'sound':
          changeSelectedSound(parseInt(e.target.getAttribute('id')))
          break
        case 'pattern':
          changeSelectedPattern(parseInt(e.target.getAttribute('id')))
          break
        default:
          break
      }
      onChange.update(() => false)
      return
    }

    switch (m) {
      case 'sound':
        lastNotePlayed.update(() => note)
        play(note)
        active = true
        break
      case 'pattern':
        // Long press to change lastNotePlayed
        const copy = e.target.childNodes[0].lastChild.innerHTML.slice(1, 3)
        timeout = setTimeout(() => {
          if (copy.includes('N')) {
            return
          }
          lastNotePlayed.update(n => {
            console.log(step)
            setStep(padID, copy)
            return copy
          })
        }, 500)
        // Write if void
        if (step === 'N') {
          setStep(padID, get(lastNotePlayed))
          break
        }
        // erase
        setStep(padID, false)
        break
      default:
        break
    }
  }

  const release = e => {
    clearTimeout(timeout)
    active = false
  }
</script>

<style>
  .pad {
    border-radius: var(--px0);
    border: 2px solid var(--primary);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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
    user-select: none;
    margin: 0;
  }

  .step {
    pointer-events: none;
    user-select: none;
    margin: 0;
    color: var(--secondary);
  }

  .activeStep {
    background-color: var(--primary-light);
    animation: 0.5s forwards;
  }

  .box,
  .box-index {
    pointer-events: none;
  }

  .box-index {
    position: absolute;
    z-index: 2;
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
  on:mousedown={attack}
  on:mouseup={release}
  on:mouseleave={release}
  class={`pad ${step !== 'N' ? 'activeStep' : null}`}
  class:active
  class:blink>
  {#if $mode === 'pattern'}
    <div class="box" transition:fly={{ x: 100, duration: 200, opacity: 0 }}>
      <p class="note">{note}</p>
      <p class="step">[{step}]</p>
    </div>
  {:else}
    <div
      class="box-index"
      transition:fly={{ x: -100, duration: 200, opacity: 0 }}>
      <p class="note">{note}</p>
    </div>
  {/if}
</div>
