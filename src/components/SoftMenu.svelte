<script>
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import { sequencer, playPause } from "../sequencer";
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
</style>

<div class="soft-menu">
  <button class="play-button" on:click={playPause}>PLAY</button>
</div>
