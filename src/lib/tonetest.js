(function() {
  // Membrane Synth https://tonejs.github.io/docs/r12/MembraneSynth
  const synth = new Tone.MembraneSynth().toMaster();
  const synth2 = new Tone.MembraneSynth().toMaster();

  //   var fmSynth = new Tone.MetalSynth.toMaster()();
  const notes = ["C4", ["E4", "G4"], "A4"];

  const notes2 = ["Bb2", "C3", "G2"];

  // const synthPart = new Tone.Sequence(
  //   function(time, note) {
  //     console.log("007");
  //     synth.triggerAttackRelease(note, "500hz", time);
  //     synth2.triggerAttackRelease(note, "10hz", time);
  //   },
  //   notes,
  //   "4n"
  // );

  var pattern = new Tone.Pattern(
    function(time, note) {
      console.log("on pattern");
      synth.triggerAttackRelease(note, "10hz", time);
    },
    ["C2", "D4", "E5", "A6"],
    "upDown"
  );

  // //use an array of objects as long as the object has a "time" attribute
  var part = new Tone.Part(
    function(time, note) {
      //the notes given as the second element in the array
      //will be passed in as the second argument
      synth.triggerAttackRelease(note, "8n", time);
    },
    [[0, "C2"], ["0:2", "C3"], ["0:1.25", "G2"]]
  ).start(0);
  part.loop = 10;
  // var part = new Tone.Part(
  //   function(time, value) {
  //     //the value is an object which contains both the note and the velocity
  //     synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
  //   },
  //   [
  //     { time: 0, note: "C3", velocity: 0.9 },
  //     { time: "0:2", note: "C4", velocity: 0.5 }
  //   ]
  // ).start(0);
  // var part2 = new Tone.Part(
  //   function(time, value) {
  //     console.log(value);
  //     //the value is an object which contains both the note and the velocity
  //     synth.triggerAttackRelease(
  //       value.note,
  //       "8n",
  //       value.time,
  //       value.velocity
  //     );
  //   },
  //   [
  //     { time: 1, note: "C3", velocity: 0.9 },
  //     { time: "0:2", note: "C4", velocity: 0.5 }
  //   ]
  //   // ["C3", "C4"]
  // );
  // part2.start(0);
  // part2.loop = 8;
  Tone.Transport.start();
})();
