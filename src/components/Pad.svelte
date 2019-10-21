<script>
  import Tone from 'tone'
  import { afterUpdate } from 'svelte'
  import { changeSelectedSound } from '../lib/state'
  export let padID
  export let active
  export let note
  const synth = new Tone.Synth().toMaster()
  let timeout
  afterUpdate(() => {
    if (active) {
      // synth.triggerAttackRelease("C3", "2n");
    }
  })

  const mousedown = e => {
    timeout = setTimeout(() => {
      changeSelectedSound(padID)
    }, 400)
  }

  const mouseup = () => {
    clearTimeout(timeout)
  }
</script>

<style>
  .pad {
    border-radius: var(--px0);
    margin: var(--px0);
    border: 1px solid var(--primary);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  .active {
    animation: fade 0.5s forwards;
  }

  @keyframes fade {
    from {
      border: 0;
      background: transparent;
    }
    to {
      border: 5px solid var(--secondary);
      background: var(--primary-light);
    }
  }
</style>

<div
  id={padID}
  on:mousedown={mousedown}
  on:mouseup={mouseup}
  class="pad"
  class:active>
  <p>{note}</p>
</div>
