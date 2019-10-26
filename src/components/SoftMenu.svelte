<script>
  import { onDestroy } from 'svelte'
  import { afterUpdate } from 'svelte'
  import {
    togglePadMenu,
    selectedSound,
    selectedPattern,
    sounds,
    mode,
    changeMode,
    onChange,
  } from '../lib/state'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { sequencer, playPause } from '../lib/sequencer'

  const sound = $selectedSound
  const engines = $sounds
  let patternLabel = get(selectedPattern)
  let soundLabel = get(selectedSound)
  const modeHandler = () => {
    mode.update(value => (value === 'sound' ? 'pattern' : 'sound'))
  }
  const u1 = selectedPattern.subscribe(value => (patternLabel = value))
  const u2 = selectedSound.subscribe(value => (soundLabel = value))
  const u3 = mode.subscribe(value => {
    if (value === 'sound') {
      soundLabel = get(selectedSound)
      return
    }
    patternLabel = get(selectedPattern)
  })
  onDestroy(u1, u2)
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
  <!-- <div class="box"> -->
  <div class="box">
    <div class="btn" on:click={() => onChange.update(n => n === 'pattern' ? false : 'pattern')}>
      P{patternLabel}
    </div>
    <div class="btn" on:click={() => onChange.update(n => n === 'sound' ? false : 'sound')}>
      S{soundLabel}
    </div>
  </div>
  <div class="btn" on:click={modeHandler}>{$mode}</div>
  <!-- </div> -->
  <div
    class="btn"
    on:click={() => {
      togglePadMenu(true, $selectedSound)
    }}>
    settings
  </div>
  <button class="btn" on:click={playPause}>PLAY</button>
</div>
