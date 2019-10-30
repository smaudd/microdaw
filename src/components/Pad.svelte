<script>
  import Tone from 'tone'
  import { afterUpdate, onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { Plugins, HapticsImpactStyle } from '@capacitor/core'
  import {
    selectedPattern,
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
  let lastNoteCache
  let longPressHalfSecond
  let longPressSecond
  let info

  onChange.subscribe(value => {
    if (value) {
      blink = value
      return
    }
    blink = false
  })

  const hapticsImpact = async style => {
    info = await Device.getInfo()
    if (info.platform === 'ios' || info.platform === 'android') {
      Haptics.vibrate()
    }
  }

  const longPress = patternNote => {
    longPressHalfSecond = setTimeout(() => {
      hapticsImpact(HapticsImpactStyle.Light)
      if (patternNote.includes('N')) {
        return
      }
      setStep(padID, patternNote)
      lastNotePlayed.update(n => patternNote)
    }, 500)
    longPressSecond = setTimeout(() => {
      hapticsImpact(HapticsImpactStyle.Heavy)
      setStep(padID, note)
      lastNotePlayed.update(n => note)
    }, 1000)
  }

  const changeSelected = (val, id) => {
    switch (val) {
      case 'sound':
        selectedSound.update(() => id)
        break
      case 'pattern':
        selectedPattern.update(() => id)
        break
    }
    onChange.update(() => false)
  }

  const attack = async e => {
    // Change pattern/sound
    if (blink) {
      const id = parseInt(e.target.getAttribute('id'))
      return changeSelected(blink, id)
    }
    // Play
    switch (get(mode)) {
      case 'sound':
        lastNotePlayed.update(() => note)
        play(note)
        active = true
        break
      case 'pattern':
        const patternNote = e.target.childNodes[0].lastChild.innerHTML.slice(
          1,
          3
        )
        longPress(patternNote)
        if (step === 'N') {
          setStep(padID, get(lastNotePlayed))
          break
        }
        setStep(padID, false)
        break
    }
  }

  const release = () => {
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
    animation: 0.5s forwards;
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
    color: var(--secondary);
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
      /* background: transparent; */
    }
    to {
      background: var(--primary);
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
