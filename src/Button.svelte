<script>
  export let buttonId;
  export let active;
</script>

<style>
  .pad {
    border: 1px solid black;
    border-radius: 5px;
    background: purple;
    margin: 5px;
  }
  .active {
    background: red;
  }
</style>

<div id={buttonId} class={active ? 'pad active' : 'pad'}>{buttonId}</div>
