import * as Tone from 'tone';


const playNote = (note) => {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease(`${note}0`, "8n", now);
}

const playSequence = (notes) => {

}

export default {playNote, playSequence};