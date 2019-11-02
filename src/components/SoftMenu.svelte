<script>
  import { onDestroy } from 'svelte'
  import { afterUpdate } from 'svelte'
  import {
    selectedSound,
    selectedPattern,
    changeMode,
    onChange,
  } from '../lib/state'
  import { fade } from 'svelte/transition'
  import { sequencer, playPause } from '../lib/sequencer'
  export let togglePadMenu
  export let mode
  export let currentPattern
  export let currentSound
  export let willChangeCurrent
  export let toggleGlobalMenu
</script>

<style>
  .soft-menu {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--px0);
  }

  .btn {
    border: 2px solid var(--primary);
    border-radius: var(--px0);
    text-align: center;
    transition: 0.3s all;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .btn:active {
    background: var(--primary-light);
  }
  .box {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: var(--px0);
  }
</style>

<div class="soft-menu">
  <div class="box">
    <div class="btn" on:click={() => willChangeCurrent.update('pattern')}>
      P{currentPattern.value}
    </div>
    <div class="btn" on:click={() => willChangeCurrent.update('sound')}>
      S{currentSound.value}
    </div>
  </div>
  <div class="box">
    <div class="btn" on:click={() => toggleGlobalMenu()}>global</div>
    <div class="btn" on:click={togglePadMenu}>settings</div>
  </div>
  <div class="btn" on:click={() => mode.update(mode.value)}>{mode.value}</div>
  <div class="btn" on:click={playPause}>play</div>
</div>
