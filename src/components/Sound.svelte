<script>
  export let sound
  const handleRange = (type, val) => {
    switch (type) {
      case 'attack':
        sound.envelope.attack = val
        break
      case 'sustain':
        sound.envelope.sustain = val
        break
      case 'release':
        sound.envelope.release = val
        break
    }
    sound.envelope
  }
</script>

<div>
  {#if sound.envelope}
    <p>Attack</p>
    <input
      type="range"
      min="1"
      max="500"
      on:change={e => handleRange('attack', e.target.value)} />
    <p>Sustain</p>
    <input
      type="range"
      min="1"
      max="500"
      on:change={e => handleRange('sustain', e.target.value)} />
    <p>Release</p>
    <input
      type="range"
      min="1"
      max="500"
      on:change={e => handleRange('release', e.target.value)} />
  {/if}
</div>
