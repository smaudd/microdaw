<script>
  import Pad from "./Pad.svelte";
  export let pads;
</script>

<style>
  .pads-grid {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    background: black;
  }
</style>

<div class="pads-grid">
  {#each pads as pad}
    <Pad padID={pad.id} active={pad.active} />
  {/each}
</div>
