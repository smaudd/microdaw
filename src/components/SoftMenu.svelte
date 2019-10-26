<script>
  import Sound from './Sound.svelte'
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
  let label = get(mode)
  const modeHandler = () => {
    mode.update(value => value === 'sound' ? 'pattern' : 'sound')
  }
  selectedPattern.subscribe(value => (label = value))
  selectedSound.subscribe(value => (label = value))
  mode.subscribe(value => {
    if (value === 'sound') {
      label = get(selectedSound)
      return
    }
    label = get(selectedPattern)
  })
</script>

<style>
  .soft-menu {
    height: 100%;
    width: 100%;
    padding-top: 2px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .btn {
    margin: var(--px0);
    border: 2px solid var(--primary);
    border-radius: var(--px0);
    text-align: center;
    padding: var(--px1);
    transition: 0.3s all;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .btn:active {
    background: var(--primary-light);
  }
  .box {
  }
</style>

<div class="soft-menu">
  <!-- <div class="box"> -->
  <div class="btn" on:click={() => onChange.update(n => !n)}>{label}</div>
  <div class="btn" on:click={modeHandler}>{$mode}</div>
  <!-- </div> -->
  <div class="btn" on:click={() => togglePadMenu(true, $selectedSound)}>
    settings
  </div>
  <!-- {#if $sounds[sound]}
      <Sound sound={$sounds[sound]} />
    {/if} -->
  <button class="btn" on:click={playPause}>PLAY</button>
</div>
