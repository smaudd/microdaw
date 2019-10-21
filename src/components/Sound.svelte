<script>
  import Synth from './synths/Synth.svelte'
  export let sound
</script>

{#if sound.label === 'Synth'}
  <Synth engine={sound.engine} />
{/if}
