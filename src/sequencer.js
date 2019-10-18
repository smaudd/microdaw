import Tone from "tone";
import { writable } from "svelte/store";

const sequencer = writable(0);
const starter = writable(false);

const playPause = () => {
  starter.update(n => !n);
};

const synth = new Tone.MembraneSynth().toMaster();

const notes = ["Bb2", "C3", "G2", "G2"];

const synthPart = new Tone.Sequence(
  function(time, note) {
    sequencer.update(n => (n === 16 ? 1 : n + 1));
  },
  notes,
  "4n"
).start(0);

synthPart.loop = true;

starter.subscribe(value => {
  if (value) {
    Tone.Transport.start();
    return;
  }
  Tone.Transport.stop();
});

export { sequencer, playPause };
