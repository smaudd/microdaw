<script>
  import { sequencer } from "../sequencer";
  import Pads from "./Pads.svelte";
  import Tools from "./Tools.svelte";
  import SoftMenu from "./SoftMenu.svelte";
  import Tone from "tone";
  export let pads = [];
  for (let i = 1; i <= 16; i++) {
    pads.push({ id: i, active: false });
  }
  sequencer.subscribe(value => {
    console.log(value);
    if (value !== 0) {
      pads.forEach(pad => (pad.active = false));
      pads[value - 1].active = true;
      // console.log(pads);
    }
  });
</script>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.1fr;
    overflow: hidden;
  }

</style>

<div class="container">
  <Pads {pads} />
  <SoftMenu />
</div>
