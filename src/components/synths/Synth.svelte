<script>
  import { selectedSound } from '../../lib/state'
  export let engine
  const handleRange = (e) => {
    engine.envelope.release = e.target.value
  }
</script>

<div>
  <input type="range" min="1" max="500" on:change={handleRange} />
</div>
