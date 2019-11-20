<script>
  import Slider from './Slider.svelte'
  import Tone from 'tone'
  import { afterUpdate, onMount } from 'svelte'
  import Sampler from './Sampler.svelte'

  export let sound

  let sliders
  let muted = false
  let looped = false
  let envelope
  const hasEnvelope = !!sound.voices

  const handleRange = (type, val) => {
    switch (type) {
      case 'attack':
        sound.set({
          envelope: {
            attack: val,
          },
        })
        sliders[0].value = val
        break
      case 'sustain':
        sound.set({
          envelope: {
            sustain: val,
          },
        })
        sliders[1].value = val
        break
      case 'release':
        sound.set({
          envelope: {
            release: val,
          },
        })
        sliders[2].value = val
        break
      case 'gain':
        sound.volume.value = val
        break
    }
  }

  const setSliders = () => {
    if (hasEnvelope) {
      envelope = {
        attack: sound.voices[0].envelope.attack,
        sustain: sound.voices[0].envelope.sustain,
        release: sound.voices[0].envelope.release,
        gain: sound.volume.value,
      }
      sliders = [
        {
          min: 0.1,
          step: 0.1,
          max: 10,
          type: 'attack',
          callback: handleRange,
          value: sound.voices[0].envelope.attack,
        },
        {
          min: 0.1,
          step: 0.1,
          max: 5,
          type: 'sustain',
          callback: handleRange,
          value: sound.voices[0].envelope.sustain,
        },
        {
          min: 0.1,
          step: 0.1,
          max: 8,
          type: 'release',
          callback: handleRange,
          value: sound.voices[0].envelope.release,
        },
        {
          min: -60,
          step: 1,
          max: 6,
          type: 'gain',
          callback: handleRange,
          value: parseInt(sound.volume.value),
        },
      ]
    }
  }

  setSliders()

  afterUpdate(() => {
    setSliders()
  })

  const mute = () => {
    if (!muted) {
      sound._volume.mute = true
      muted = !muted
      return
    }
    sound._volume.mute = false
    muted = !muted
  }
</script>

<style>
  .grid {
    display: grid;
    grid-gap: var(--px0);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .box {
    padding: var(--px0);
    border-radius: var(--px0);
    border: 2px solid var(--primary);
  }

  .btn {
    background: transparent;
    color: var(--primary-light);
  }

  .muted {
    background: transparent;
    color: var(--secondary);
    animation: opacity 1s forwards;
  }

  @keyframes opacity {
    to {
      opacity: 1;
      background: var(--primary);
    }
  }
</style>

{#if hasEnvelope}
  <div class="grid">
    {#each sliders as slider}
      <div class="box">
        <Slider {slider} />
      </div>
    {/each}
    <div class="box btn" on:click={mute} class:muted>mute</div>
  </div>
{:else}
  <Sampler {sound} />
{/if}
