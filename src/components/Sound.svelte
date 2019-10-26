<script>
  export let sound
  const handleRange = (type, val) => {
    switch (type) {
      case 'attack':
        sound.set({
          envelope: {
            attack: parseInt(val),
          },
        })
        envelope.attack = val
        break
      case 'sustain':
        sound.set({
          envelope: {
            sustain: parseInt(val),
          },
        })
        envelope.sustain = val
        break
      case 'release':
        sound.set({
          envelope: {
            release: parseInt(val),
          },
        })
        envelope.release = val
        break
    }
    console.log(sound.voices)
  }
  let envelope = {
    attack: sound.voices[0].envelope.attack,
    sustain: sound.voices[0].envelope.sustain,
    release: sound.voices[0].envelope.release,
  }
  const envelopeSliders = ['attack', 'sustain', 'release']
  const hasEnvelope = !!sound.voices[0].envelope
</script>

<style>
  .grid {
    display: grid;
    grid-gap: var(--px1);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
  }

  .box {
    padding: var(--px0);
    border-radius: var(--px0);
    border: 2px solid var(--primary);
  }
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
    border-color: var(--primary);
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
    width: 25px;
    height: 15px;
    background: var(--primary);
    cursor: pointer;
  }
</style>

<div class="grid">
  {#if hasEnvelope}
    {#each envelopeSliders as slider}
      <div class="box">
        <div class="info">
          <p>{slider}</p>
          <p>{envelope[slider]}</p>
        </div>
        <input
          class="slider"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={envelope[slider]}
          on:input={e => handleRange(slider, e.target.value)} />
      </div>
    {/each}
  {/if}
</div>
