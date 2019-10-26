<script>
  import { sequencer } from '../lib/sequencer'
  import { padMenu, initPads } from '../lib/state'
  import { initSteps, initPatterns } from '../lib/sequencer'
  import Pads from './Pads.svelte'
  import PadMenu from './PadMenu.svelte'
  import Tools from './Tools.svelte'
  import SoftMenu from './SoftMenu.svelte'
  import { fade, fly } from 'svelte/transition'
  import Tone from 'tone'
  export let pads = []
  export let menuToggler = false
  export let padID = null
  initPads()
  initPatterns()
  initSteps()
  let note = null
  for (let i = 1; i <= 16; i++) {
    pads.push({ id: i, active: false, note: '' })
  }
  // sequencer.subscribe(n => {
  //   if (n.step !== 0) {
  //     pads.forEach(pad => (pad.active = false))
  //     pads[n.step - 1].active = true
  //     pads[n.step - 1].note = n.note
  //   }
  // })
  padMenu.subscribe(value => {
    menuToggler = value.state
    padID = value.padID
  })
  // TODO manage unsubscription
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
  .pads-container {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    background: var(--background);
  }
  .menu-container {
    height: 100vh;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
  }
</style>

{#if menuToggler}
  <div class="menu-container" transition:fly={{ y: 1000, duration: 1000 }}>
    <PadMenu {padID} />
  </div>
{:else}
  <div class="pads-container" transition:fly={{ y: 1000, duration: 1000 }}>
    <SoftMenu />
    <Pads {pads} />
  </div>
{/if}
