<script>
  import Slider from './Slider.svelte'
  import { afterUpdate } from 'svelte'
  export let sound
  console.log(sound)
  let envelopeSliders

  const handleRange = (type, val) => {
    switch (type) {
      case 'attack':
        sound.set({
          envelope: {
            attack: parseInt(val),
          },
        })
        envelopeSliders[0].value = val
        break
      case 'sustain':
        sound.set({
          envelope: {
            sustain: parseInt(val),
          },
        })
        envelopeSliders[1].value = val
        break
      case 'release':
        sound.set({
          envelope: {
            release: parseInt(val),
          },
        })
        envelopeSliders[2].value = val
        break
    }
  }

  const setEnvelopeSliders = () => {
    console.log(sound)
    envelopeSliders = [
      {
        min: 0.1,
        max: 10,
        type: 'attack',
        callback: handleRange,
        value: sound.voices[0].envelope.attack,
      },
      {
        min: 0.1,
        max: 5,
        type: 'sustain',
        callback: handleRange,
        value: sound.voices[0].envelope.sustain,
      },
      {
        min: 0.1,
        max: 8,
        type: 'release',
        callback: handleRange,
        value: sound.voices[0].envelope.release,
      },
    ]
  }

  afterUpdate(() => {
    setEnvelopeSliders()
  })
  setEnvelopeSliders()

  let envelope = {
    attack: sound.voices[0].envelope.attack,
    sustain: sound.voices[0].envelope.sustain,
    release: sound.voices[0].envelope.release,
  }
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
</style>

<div class="grid">
  {#if hasEnvelope}
    {#each envelopeSliders as slider}
      <div class="box">
        <Slider {slider} />
      </div>
    {/each}
  {/if}
</div>
