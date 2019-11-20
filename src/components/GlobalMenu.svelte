<script>
  import Tone from 'tone'
  import Slider from './Slider.svelte'
  export let sounds
  let bpm = {
    type: 'BPM',
    value: Tone.Transport.bpm.value,
    min: 40,
    max: 400,
    step: 1,
  }

  bpm.callback = (_, value) => {
    Tone.Transport.bpm.value = value
    bpm.value = value
  }

  let masterGain = {
    type: 'Master',
    value: Tone.Master.volume.value,
    min: 0.1,
    max: 20,
    step: 0.1,
  }

  masterGain.callback = (_, value) => {
    Tone.Master.volume.value = value
    masterGain.value = value
  }
</script>

<style>
  .slider-container {
    border: 2px solid var(--primary);
    padding: var(--px0);
    border-radius: var(--px0);
  }
  .container {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: var(--px0);
  }
</style>

<div class="container">
  <div class="slider-container">
    <Slider slider={bpm} />
  </div>
  <div class="slider-container">
    <Slider slider={masterGain} />
  </div>
</div>
