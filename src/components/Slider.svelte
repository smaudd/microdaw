<script>
  import { afterUpdate } from 'svelte'
  export let slider
  afterUpdate(() => {
    // if (slider.type === 'gain') console.log(slider)
  })
</script>

<style>
  .info {
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 0;
  }
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    background: var(--background);
    border: 2px solid var(--primary);
    border-radius: var(--px0);
    margin-top: var(--px0);
    margin-bottom: var(--px0);
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 5%;
    height: 15px;
    background: var(--primary);
    cursor: pointer;
  }
</style>

<div class="info">
  <p>{slider.type}</p>
  <p>{slider.value}</p>
</div>
<input
  class="slider"
  type="range"
  min={slider.min}
  max={slider.max}
  step={slider.step}
  value={slider.value}
  on:input={e => slider.callback(slider.type, e.target.value)} />
