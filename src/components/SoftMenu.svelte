<script>
  import Sound from './Sound.svelte'
  import { afterUpdate } from 'svelte'
  import { togglePadMenu, selectedSound, sounds } from '../lib/state'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { sequencer, playPause } from '../lib/sequencer'

  export let sound = null

  selectedSound.subscribe(value => {
    // console.log(value)
    sound = get(sounds)[value]
    console.log(get(sounds))
  })
</script>

<style>
  .soft-menu {
    height: 100%;
    width: 100%;
    padding-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-button {
    display: flex;
    justify-content: center;
    color: salmon;
    background: red;
  }

  .global {
  }
</style>

<div class="soft-menu">
  <div class="global">
    <div>SOUND {$selectedSound}</div>
    <div on:click={() => togglePadMenu(true, $selectedSound)}>OPEN MENU</div>
    {#if sound}
      <Sound sound={sound} />
    {/if}
  </div>
  <button class="play-button" on:click={playPause}>PLAY</button>
</div>
