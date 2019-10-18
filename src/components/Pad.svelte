<script>
  import Tone from "tone";
  import { afterUpdate } from "svelte";
  export let padID;
  export let active;
  import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  const synth = new Tone.Synth().toMaster();
  afterUpdate(() => {
    if (active) {
      synth.triggerAttackRelease("C3", "2n");
    }
  });

  const handleClick = () => {
    active = true
    setTimeout(() => active = false, 200)
  }
</script>

<style>
  .pad {
    border-radius: 5px;
    background: lightsalmon;
    margin: 5px;
  }
  .active {
    background: lightpink;
  }
</style>

<div id={padID} on:click={handleClick} class={active ? 'pad active' : 'pad'} 
transition:scale={{duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut}} />
