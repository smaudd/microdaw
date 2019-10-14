import "es6-shim";
import initNavigation from "./navigation.js";
import App from "./App.svelte";

// initNavigation();

const app = new App({
  target: document.body,
  props: {
    name: "world"
  }
});

export default app;
