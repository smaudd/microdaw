<script>
  import Button from "./Button.svelte";
  export let name;
  export let toggle = true;
  const data = [
    { id: 0, active: false },
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
    { id: 8, active: false },
    { id: 9, active: false },
    { id: 10, active: false },
    { id: 11, active: false }
  ];

  const initPadInterface = (() => {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 49:
          data[0].active = !data[0].active;
          break;
        case 50:
          data[1].active = !data[1].active;
          break;
        case 51:
          data[2].active = !data[2].active;
          break;
        case 52:
          data[3].active = !data[3].active;
          break;
        case 53:
          data[4].active = !data[4].active;
          break;
        case 54:
          data[5].active = !data[5].active;
          break;
        case 55:
          data[6].active = !data[6].active;
          break;
        case 56:
          data[7].active = !data[7].active;
          break;
        case 57:
          data[8].active = !data[8].active;
          break;
        case 170:
          data[9].active = !data[9].active;
          break;
        case 48:
          data[10].active = !data[10].active;
          break;
        case 163:
          data[11].active = !data[11].active;
          break;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case 49:
          data[0].active = !data[0].active;
          break;
        case 50:
          data[1].active = !data[1].active;
          break;
        case 51:
          data[2].active = !data[2].active;
          break;
        case 52:
          data[3].active = !data[3].active;
          break;
        case 53:
          data[4].active = !data[4].active;
          break;
        case 54:
          data[5].active = !data[5].active;
          break;
        case 55:
          data[6].active = !data[6].active;
          break;
        case 56:
          data[7].active = !data[7].active;
          break;
        case 57:
          data[8].active = !data[8].active;
          break;
        case 170:
          data[9].active = !data[9].active;
          break;
        case 48:
          data[10].active = !data[10].active;
          break;
        case 163:
          data[11].active = !data[11].active;
          break;
      }
    });
  })();
</script>

<style>
  .grid {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
</style>

<div class="grid">
  {#each data as pad}
    <Button buttonId={pad.id} active={pad.active} />
  {/each}
</div>
