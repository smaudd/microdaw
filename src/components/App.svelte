<script>
  import { sequencer, trigger } from '../lib/sequencer'
  import { bootstrap, notifier } from '../lib/state'
  import Pads from './Pads.svelte'
  import PadMenu from './PadMenu.svelte'
  import Sound from './Sound.svelte'
  import GlobalMenu from './GlobalMenu.svelte'
  import SoftMenu from './SoftMenu.svelte'
  import Mixer from './Mixer.svelte'
  import { fade, fly } from 'svelte/transition'

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
    if (!notification) return
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
    /* --primary: green; */
    --primary-light: #f7b2b7;
    /* --primary-light: green; */

    --secondary: #7f2982;

    /* --secondary: green; */
    --background: #16001e;

    /* --background: blue; */
    /* font-family:  */
    --font: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    --px0: 5px;
    --px1: 10px;
    --px2: 20px;
  }
  :global(body) {
    height: 100vh;
    padding: var(--px0);
    /* font-family: var(--font);
     */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
  }

  :global(.wavesurfer-handle) {
    background-color: hsla(356, 81%, 83%, 0.1);
    border: 10px solid hsla(356, 81%, 83%, 0.1);
    width: 0% !important;
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
    position: relative;
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
  .globalMenu {
    z-index: 99;
    position: absolute;
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
        {#if globalMenu}
          <GlobalMenu {sounds} />
        {:else}
          <Sound sound={sounds.value[currentSound.value].synth} />
        {/if}
      </div>
      {#if !globalMenu}
        <!-- <div class:globalMenu > -->
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
        <!-- </div> -->
      {:else}
        <!-- <div> -->
        <Mixer {sounds} />
        <!-- </div> -->
      {/if}
    </div>
  {/if}
</div>
