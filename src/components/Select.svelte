<script>
  import { slide, fade } from 'svelte/transition'
  import { afterUpdate } from 'svelte'
  export let callback
  export let items
  export let selected
  export let type
  export let placeholder
  let dropdown = false
  console.log(selected)
  const toggleDropDown = () => {
    dropdown = !dropdown
  }
</script>

<style>
  .select {
    margin: var(--px1);
    border: 2px solid var(--primary);
    border-radius: var(--px0);
  }

  .selected {
    background: var(--secondary);
    padding: var(--px1);
  }

  li {
    list-style: none;
    margin: var(--px0);
    padding: var(--px1);
    border-radius: var(--px0);
    border: 2px solid var(--primary);
    text-align: center;
  }
</style>

<div on:click={toggleDropDown} transition:fade class="select">
  <div class="selected">{selected}</div>
  {#if dropdown}
    {#each items as item}
      <li on:click={() => callback(type, item)} transition:slide>{item}</li>
    {/each}
  {/if}
</div>
