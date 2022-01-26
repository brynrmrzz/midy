import React from 'react';
import axios from 'axios';
import Keyboard from './components/Keyboard.jsx';
import SequenceList from './components/SequenceList.jsx'
import * as Tone from 'tone';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      sequence: [],
      sequenceList: [],
    }
    this.playNote = this.playNote.bind(this);
    this.saveSequence = this.saveSequence.bind(this);
    this.changeSequence = this.changeSequence.bind(this);
    this.deleteSequences = this.deleteSequences.bind(this);
    this.playSequence = this.playSequence.bind(this);
    this.clearNotes = this.clearNotes.bind(this);
  }


  playNote(note) {
    const synth = new Tone.PolySynth().toDestination();
    const { isPlaying, sequence } = this.state;
    const newSequence = sequence;
    if (newSequence.length === 12) {
      newSequence.shift();
      newSequence.push(note);
    } else {
      newSequence.push(note)
    }
    this.setState({ isPlaying, newSequence })
    synth.triggerAttackRelease(`${note}4`, "8n", Tone.now());
  }

  changeSequence(sequence) {
    const { sequenceList, isPlaying } = this.state;
    this.setState({ sequence, sequenceList, isPlaying })
    Tone.Transport.stop();
  }

  deleteSequences() {
    const { sequence, isPlaying } = this.state;
    axios.post('/delete')
      .then((res) => {
        this.setState({
          sequence,
          sequenceList: res.data,
          isPlaying
        })
      })
      .catch(err => console.error(err))
    Tone.Transport.stop();
  }

  saveSequence() {
    const { sequence, sequenceList, isPlaying } = this.state;
    if (sequence.length >= 3) {
      axios.post('/sequences', sequence)
        .then((res) => {
          this.setState({
            sequence: [],
            sequenceList: res.data,
            isPlaying
          })
        })
        .catch(err => console.error(err))
    }
    Tone.Transport.stop();

  }

  playSequence() {
    Tone.Transport.stop();
    let time = 0;
    const { sequence } = this.state;
    const synth = new Tone.PolySynth().toDestination();
    const notes = sequence.map((note, time) => {
      time += .5
      note = `${note}4`
      return ({ note, time })
    })
    const part = new Tone.Part(((time, value) => {
      synth.triggerAttackRelease(value.note, "8n", time);
    }), notes).start(0);
    Tone.Transport.start();

  }

  clearNotes() {
    const { isPlaying, sequenceList } = this.state;
    const sequence = [];
    this.setState({
      isPlaying,
      sequenceList,
      sequence
    })
  }

  componentDidMount() {
    axios.get('/sequences')
      .then((res) => {
        this.setState({
          isPlaying: false,
          sequence: [],
          sequenceList: res.data
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="midy">
        <h1> Midy </h1>
        <div id='seq-container'>
          <div id='note-list'>
            {this.state.sequence.join(' ')}
          </div>
          <div className='btn-container'>
            <button
              className='seq-btn'
              onClick={() => { this.playSequence(this.state.sequence) }}> Play
            </button>
            <button
              className='seq-btn'
              onClick={() => { this.saveSequence() }}>
              Save
            </button>
            <button
              className='seq-btn'
              onClick={() => { this.clearNotes() }}>
              Clear
            </button>
            <button
              className='seq-btn'
              onClick={() => { this.deleteSequences() }}>
              Delete
            </button>
          </div>
        </div>
        <div>
          <Keyboard playNote={this.playNote} />
          <SequenceList
            changeSequence={this.changeSequence}
            sequenceList={this.state.sequenceList} />
        </div>
      </div>
    );
  }
}

export default App;