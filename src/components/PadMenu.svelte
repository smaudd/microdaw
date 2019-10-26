<script>
  import Tone from 'tone'
  import Select from './Select.svelte'
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import {
    togglePadMenu,
    sounds,
    loadSound,
    clearSound,
    scaleLib,
    synthLib,
    toneLib,
  } from '../lib/state'
  import { fade, fly, slide } from 'svelte/transition'
  export let padID
  export let synthDropdown = false
  export let toneDropdown = false
  let trans = false
  let selectedSynth = null
  let selectedTone = null
  let selectedScale = null
  let data = {}
  sounds.subscribe(value => {
    if (value[padID]) {
      selectedSynth = value[padID].synth
      selectedTone = value[padID].tone
      selectedScale = value[padID].scale
    }
  })

  const handleSelection = (type, value) => {
    switch (type) {
      case 'synth':
        loadSound(padID, { synth: value })
        break
      case 'tone':
        loadSound(padID, { tone: value })
        break
      case 'scale':
        loadSound(padID, { scale: value })
        break
    }
  }

  const setSound = () => {
    loadSound(padID, data)
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
    display: grid;
    height: 100%;
    grid-template-rows: 0.2fr 1fr;
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
    overflow-y: scroll;
  }
  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background-color: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--background);
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
      <Select
        callback={handleSelection}
        placeholder="Choose your engine"
        items={Object.keys(synthLib)}
        type="synth"
        selected={selectedSynth.voices[0]} />
      <Select
        callback={handleSelection}
        placeholder="Choose your tone"
        items={toneLib}
        type="tone"
        selected={selectedTone} />
      <Select
        callback={handleSelection}
        placeholder="Choose your scale"
        items={Object.keys(scaleLib)}
        type="scale"
        selected={selectedScale} />
    </div>
  </div>
{/if}
