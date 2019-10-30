<script>
  import { sequencer } from '../lib/sequencer'
  import Tone from 'tone'
  import {
    padMenu,
    initPads,
    sounds,
    selectedSound,
    globalMenu,
    mode,
  } from '../lib/state'
  import { initSteps, initPatterns } from '../lib/sequencer'
  import Pads from './Pads.svelte'
  import PadMenu from './PadMenu.svelte'
  import Sound from './Sound.svelte'
  import GlobalMenu from './GlobalMenu.svelte'
  import SoftMenu from './SoftMenu.svelte'
  import { fade, fly } from 'svelte/transition'
  export let pads = []
  export let menuToggler = false
  export let padID = null
  initPads()
  initPatterns()
  initSteps()
  let note = null
  for (let i = 1; i <= 16; i++) {
    pads.push({ id: i, active: false })
  }
  padMenu.subscribe(value => {
    menuToggler = value.state
    padID = value.padID
  })
  // TODO manage unsubscription
  const sound = $sounds[$selectedSound]
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
  {#if menuToggler}
    <div class="menu-container" transition:fly={{ y: 1000, duration: 1000 }}>
      <PadMenu {padID} />
    </div>
  {:else}
    <div class="pads-container" transition:fly={{ y: 1000, duration: 1000 }}>
      <SoftMenu />
      <div class="container">
        {#if $globalMenu}
          <div transition:fly={{ x: 1000, duration: 1000 }}>
            <GlobalMenu />
          </div>
        {:else}
          <div transition:fly={{ x: 1000, duration: 1000 }}>
            <Sound sound={sound.synth} />
          </div>
        {/if}
      </div>
      <Pads {pads} />
    </div>
  {/if}
</div>
