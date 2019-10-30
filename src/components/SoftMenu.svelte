<script>
  import { onDestroy } from 'svelte'
  import { afterUpdate } from 'svelte'
  import {
    togglePadMenu,
    toggleGlobalMenu,
    selectedSound,
    selectedPattern,
    mode,
    changeMode,
    onChange,
  } from '../lib/state'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { sequencer, playPause } from '../lib/sequencer'

  const modeHandler = () => {
    mode.update(value => (value === 'sound' ? 'pattern' : 'sound'))
  }
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
    <div
      class="btn"
      on:click={() => onChange.update(n =>
          n === 'pattern' ? false : 'pattern'
        )}>
      P{$selectedPattern}
    </div>
    <div
      class="btn"
      on:click={() => onChange.update(n => (n === 'sound' ? false : 'sound'))}>
      S{$selectedSound}
    </div>
  </div>
  <div class="box">
    <div
      class="btn"
      on:click={() => toggleGlobalMenu()}>
      global
    </div>
    <div
      class="btn"
      on:click={() => {
        togglePadMenu(true, get(selectedPattern))
      }}>
      settings
    </div>
  </div>
  <div class="btn" on:click={modeHandler}>{$mode}</div>
  <div class="btn" on:click={playPause}>play</div>
</div>
