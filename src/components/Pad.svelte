<script>
  import { Plugins, HapticsImpactStyle } from '@capacitor/core'
  import { setStep } from '../lib/sequencer'
  import { fade, slide, fly } from 'svelte/transition'
  const { Haptics, Device } = Plugins
  export let willChangeCurrent
  export let pad
  export let play
  export let stop
  export let currentNote
  export let currentSound
  export let currentPattern
  export let mode
  export let patterns

  let longPressHalfSecond
  let longPressSecond

  const hapticsImpact = async style => {
    const info = await Device.getInfo()
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
      patterns.update(pad.id, patternNote)
      currentNote.update(patternNote)
    }, 500)
    longPressSecond = setTimeout(() => {
      hapticsImpact(HapticsImpactStyle.Heavy)
      patterns.update(pad.id, false)
      currentNote.update(pad.note)
    }, 1000)
  }

  const changeCurrent = (val, id) => {
    switch (val) {
      case 'sound':
        currentSound.update(id)
        break
      case 'pattern':
        currentPattern.update(id)
        break
    }
    willChangeCurrent.update(false)
  }

  const attack = async e => {
    // Change pattern/sound
    if (willChangeCurrent.value) {
      const id = parseInt(e.target.getAttribute('id'))
      return changeCurrent(willChangeCurrent.value, id)
    }
    // Play
    switch (mode.value) {
      case 'sound':
        currentNote.update(pad.note)
        play(pad.note, pad.id)
        pad.active = true
        break
      case 'pattern':
        const patternNote = e.target.childNodes[0].lastChild.innerHTML.slice(
          1,
          3
        )
        longPress(patternNote)
        if (pad.step === 'N') {
          patterns.update(pad.id, currentNote.value)
          break
        }
        patterns.update(pad.id, false)
        break
    }
  }

  const release = () => {
    clearTimeout(longPressHalfSecond)
    clearTimeout(longPressSecond)
    stop(pad.note, pad.id)
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

  .willChangeCurrent {
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
  id={pad.id}
  on:touchstart={attack}
  on:touchend={release}
  on:mouseleave={release}
  class={`
    pad 
    ${pad.active ? 'active' : ''} 
    ${willChangeCurrent.value ? 'willChangeCurrent' : ''}
    ${pad.step !== 'N' ? 'activeStep' : ''}
  `}
>
  {#if mode.value === 'pattern'}
    <div class="box" transition:fly={{ x: 100, duration: 200, opacity: 0 }}>
      <p class="note">{pad.note}</p>
      <p class="step">[{pad.step}]</p>
    </div>
  {:else}
    <div
      class="box-index"
      transition:fly={{ x: -100, duration: 200, opacity: 0 }}>
      <p class="note">{pad.note}</p>
    </div>
  {/if}
</div>
