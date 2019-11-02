<script>
  import { sequencer, trigger } from '../lib/sequencer'
  import Tone from 'tone'
  import {
    initPads,
    selectedSound,
    bootstrap,
    synthLib,
    notifier,
  } from '../lib/state'
  import { initSteps, initPatterns } from '../lib/sequencer'
  import Pads from './Pads.svelte'
  import PadMenu from './PadMenu.svelte'
  import Sound from './Sound.svelte'
  import GlobalMenu from './GlobalMenu.svelte'
  import SoftMenu from './SoftMenu.svelte'
  import { fade, fly } from 'svelte/transition'
  import { afterUpdate } from 'svelte'

  let {
    pads,
    sounds,
    patterns,
    mode,
    currentPattern,
    currentSound,
    currentNote,
    willChangeCurrent,
  } = bootstrap()
  const maxVoices = 4
  let padMenu = false
  let globalMenu = false

  notifier.subscribe(notification => {
    if (!notification) {
      return
    }
    switch (notification.type) {
      case 'currentNote':
        currentNote = notification.value
        break
      case 'mode':
        mode = notification.value
        break
      case 'currentSound':
        currentSound = notification.value
        break
      case 'currentPattern':
        currentPattern = notification.value
        break
      case 'patterns':
        patterns = notification.value
        break
      case 'sounds':
        sounds = notification.value
        break
      case 'willChangeCurrent':
        willChangeCurrent = notification.value
        break
    }
  })

  sequencer.subscribe(({ step }) => {
    if (step !== 0) {
      const toPlay = patterns.value[currentPattern.value][step - 1]
      if (toPlay.length > 0) {
        trigger(toPlay)
      }
    }
  })

  const togglePadMenu = () => (padMenu = !padMenu)
  const toggleGlobalMenu = () => (globalMenu = !globalMenu)
</script>

<style>
  :global(:root) {
    --primary: #fa8072;
    --primary-light: #f7b2b7;
    --secondary: #7f2982;
    --background: #16001e;
    --font: sans-serif;
    --px0: 5px;
    --px1: 10px;
    --px2: 20px;
  }
  :global(body) {
    height: 100vh;
    padding: var(--px0);
  }
  .container {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .pads-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr 1fr;
    overflow: hidden;
    background: var(--background);
    grid-gap: var(--px0);
  }
  .menu-container {
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
  }
</style>

<div class="container">
  {#if padMenu}
    <div class="menu-container" transition:fly={{ y: 1000, duration: 1000 }}>
      <PadMenu
        sound={sounds.value[currentSound.value]}
        {currentSound}
        {sounds}
        {togglePadMenu} />
    </div>
  {:else}
    <div class="pads-container" transition:fly={{ y: 1000, duration: 1000 }}>
      <SoftMenu
        {togglePadMenu}
        {toggleGlobalMenu}
        {mode}
        {willChangeCurrent}
        {currentSound}
        {currentPattern} />
      <div class="container">
        <!-- {#if $globalMenu}
          <div transition:fly={{ x: 1000, duration: 1000 }}>
            <GlobalMenu />
          </div>
        {:else} -->
        <div transition:fly={{ x: 1000, duration: 1000 }}>
          <Sound sound={sounds.value[currentSound.value].synth} />
        </div>
        <!-- {/if} -->
      </div>
      <Pads
        {mode}
        {sounds}
        {patterns}
        {willChangeCurrent}
        {pads}
        {currentNote}
        {currentSound}
        {currentPattern}
        pattern={patterns.value[currentPattern.value]}
        sound={sounds.value[currentSound.value]} />
    </div>
  {/if}
</div>
