<script>
  import Tone from 'tone'
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import { Plugins, HapticsImpactStyle } from '@capacitor/core'
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
  const { Haptics, Device } = Plugins
  export let padID
  export let active
  export let note
  export let play
  export let stop
  export let step
  let blink = false
  let trans = false
  let lastNoteCache
  let longPressHalfSecond
  let longPressSecond
  onChange.subscribe(value => {
    if (value) {
      blink = value
      return
    }
    blink = false
  })

  const hapticsImpact = async style => {
    const info = await Device.getInfo()
    if (info.platform === 'ios' || info.platform === 'android') {
      Haptics.vibrate()
    }
  }

  const attack = async e => {
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
        let copy = e.target.childNodes[0].lastChild.innerHTML.slice(1, 3)
        longPressHalfSecond = setTimeout(() => {
          hapticsImpact(HapticsImpactStyle.Light)
          if (copy.includes('N')) {
            return
          }
          lastNotePlayed.update(n => {
            setStep(padID, copy)
            return copy
          })
        }, 500)
        longPressSecond = setTimeout(() => {
          hapticsImpact(HapticsImpactStyle.Heavy)
          lastNotePlayed.update(n => {
            setStep(padID, note)
            return note
          })
        }, 1000)
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
    clearTimeout(longPressHalfSecond)
    clearTimeout(longPressSecond)
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
    animation: fade 0.1s forwards;
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
    text-align: center;
  }

  .step {
    pointer-events: none;
    user-select: none;
    margin: 0;
    color: var(--secondary);
  }

  .activeStep {
    background-color: var(--primary-light);
    color: var(--secondary);
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
  on:touchstart={attack}
  on:touchend={release}
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
