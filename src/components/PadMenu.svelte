<script>
  import Tone from 'tone'
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import { togglePadMenu, sounds, loadSound } from '../lib/state'
  import { synthLib } from '../lib/state'
  import { fade, fly } from 'svelte/transition'
  export let padID
  let trans = false

  afterUpdate(() => {
    console.log('update')
  })

  const handleValueChange = (e) => {
    loadSound(padID, e.target.value)
  }

  const closeMenu = () => {
    togglePadMenu(false, padID)
  }
  const nextMenu = () => {
    trans = true
    setTimeout(() => {
      togglePadMenu(true, padID !== 16 ? padID + 1 : 1)
      trans = false
    }, 200)
  }
</script>

<style>
  .wrapper {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
    overflow: hidden;
    position: relative;
  }
  .bubble {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 30px;
    border: 1px solid var(--primary);
    box-shadow: 0 0 1px 0 gray inset, 0 0 1px 0 gray;
    max-height: var(--px1);
    max-width: var(--px1);
  }
  .header,
  .content {
    border: 1px solid var(--primary);
    border-radius: var(--px0);
    padding: var(--px1);
    overflow: hidden;
  }
  .header {
    overflow: hidden;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .arrow {
    background: var(--secondary);
    width: 35px;
    height: 35px;
  }
  .back {
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
  }
  .forward {
    clip-path: polygon(100% 50%, 0 0, 0 100%);
  }

  h1 {
    text-align: center;
    font-size: 40px;
    color: var(--primary);
    font-family: var(--font);
  }
</style>

{#if !trans}
  <div class="wrapper">
    <div class="header" in:fly={{ y: -1000, duration: 500 }} out:fade>
      <div class="arrow back" on:click={closeMenu} />
      <div class="bubble">
        <h1>{padID}</h1>
      </div>
      <div class="arrow forward" on:click={nextMenu} />
    </div>
    <div class="content" in:fly={{ y: 1000, duration: 500 }} out:fade>
      <select value={get(sounds)[padID] ? get(sounds)[padID] : 0} on:change={handleValueChange}>  
        <option value="0">NONE</option>
        {#each Object.keys(synthLib) as synth}
          <option value={synth}>{synthLib[synth].label}</option>
        {/each}
      </select>
    </div>
  </div>
{/if}
