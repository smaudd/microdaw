<script>
  export let sounds
  let banks = Object.keys(sounds.value).map(sound => {
    const gain = sounds.value[sound].synth.volume.value
    return {
      type: sound,
      min: -60,
      max: 6,
      step: 1,
      gain: sounds.value[sound].synth.volume.value,
    }
  })

  const changeSelectedBank = () => {}

  let bank1 = banks.slice(0, 8)
  let bank2 = banks.slice(8, 16)
  let selectedBank = bank1
  const sensitivity = 5

  const dBToPercentage = dB => (dB * 100) / 6
  const handleVolume = e => {
      sounds.update()
      selectedBank[e.target.getAttribute('id') - 1].gain = e.target.value
  }
</script>

<style>
  .mixer {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 100%;
  }
  .slider-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0;
  }
  .slider {
    -webkit-appearance: none;
    appearance: none;
    margin: 5px;
    width: 100%;
    height: 25px;
    border: 2px solid var(--primary);
    background: transparent;
    border-radius: var(--px0);
    overflow: hidden;
  }
  .slider:active {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: var(--primary);
    box-shadow: -100vw 0 0 calc(100vw - 12px) var(--primary);
    cursor: pointer;
    border-radius: 1px;
  }
</style>

<div class="mixer">
  {#each selectedBank as fader}
    <!-- <div class="fader" id={fader.type} on:touchmove={handleVolume}>
      <div
        class="volume"
        id={fader.type}
        style={`height: ${fader.gain === 0 ? '60%' : dBToPercentage(fader.gain)}`} />
    </div> -->
    <div class="slider-wrapper">
      <input
        class="slider"
        type="range"
        min={fader.min}
        max={fader.max}
        value={fader.gain}
        id={fader.type}
        on:change={handleVolume} />
    </div>
  {/each}
</div>
