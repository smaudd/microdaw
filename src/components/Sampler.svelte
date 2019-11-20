<script>
  import Slider from './Slider.svelte'
  import Tone from 'tone'
  import { afterUpdate, onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { waveUI } from '../lib/state'

  export let sound

  let sliders
  let muted = false
  let looped = false
  let envelope
  let sampler
  let rec
  const motu = new Tone.UserMedia()
  let buffer
  let region

  console.log(waveUI)

  let wavesurfer
  afterUpdate(() => {
    if (!get(waveUI).instance) {
      waveUI.init('red', sound)
    }
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

  const record = userMedia => {
    const chunks = []
    const options = {
      audioBitsPerSecond: 32000,
      mimeType: 'audio/webm;codecs=pcm',
    }
    rec = new MediaRecorder(userMedia._stream, options)

    rec.ondataavailable = e => {
      chunks.push(e.data)
    }
    rec.onstop = () => {
      console.log(chunks)
      let blob = new Blob(chunks, { type: 'audio/mpeg-3' })
      const blobURL = URL.createObjectURL(blob)
      buffer = new Tone.Buffer(blobURL)
      sound.add('C4', blobURL)
      waveUI.load(blob, buffer)
    }

    rec.start(100)
  }

  const handleRecording = e => {
    const chunks = []
    if (e.type == 'touchstart') {
      motu.open().then(record)
    }
    if (e.type === 'touchend') {
      rec.stop()
    }
  }

  const reverse = () => {
    const { buffer } = get(waveUI)
    if (buffer) {
      console.log(buffer)
      if (buffer.reverse) {
        buffer.reverse = false
        waveUI.reverse(sound)
        return
      }
      buffer.reverse = true
      waveUI.reverse(sound)
    }
  }
</script>

<style>
  .sampler {
    display: grid;
    grid-row-gap: var(--px0);
    grid-template-rows: repeat(2, 1fr);
  }
  .box,
  .wave {
    padding: var(--px0);
    border-radius: var(--px0);
    border: 2px solid var(--primary);
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btns {
    display: grid;
    grid-gap: var(--px0);
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>

<div class="sampler">
  <div class="btns">
    <div
      class="box record"
      on:touchstart={handleRecording}
      on:touchend={handleRecording}>
      record
    </div>
    <div class="box btn" on:click={mute} class:muted>mute</div>
    <div class="box btn" on:click={reverse}>reverse</div>
  </div>
  <div class="wave">
    <div id="waveform" />
  </div>
</div>
