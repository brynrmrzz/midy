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
    this.getSequences = this.getSequences.bind(this);
    this.playNote = this.playNote.bind(this);
    this.saveSequence = this.saveSequence.bind(this);
    this.playSequence = this.playSequence.bind(this);
    this.clearNotes = this.clearNotes.bind(this);
  }

  getSequences() {
    const { isPlaying, sequence } = this.state;
    axios.get('/sequences')
      .then((res) => {
        this.setState({
          isPlaying,
          sequence,
          sequenceList: res.data
        })
      })
      .catch(err => console.error(err))
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

  saveSequence() {
    const { sequence, sequenceList, isPlaying } = this.state;
    if (sequence.length > 3) {
      axios.post('/sequences', sequence)
        .then((res) => {
          let newSequenceList = sequenceList;
          newSequenceList.push(sequence)
          this.setState({
            sequence: [],
            sequenceList: newSequenceList,
            isPlaying
          })
        })
        .catch(err => console.error(err))
    }
  }

  playSequence(sequence, start) {
    console.log('play sequence clicked!')
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
    this.getSequences();
  }

  componentDidUpdate() {
    this.getSequences();
  }


  render() {
    return (
      <div className="midy">
        <h1> Midy </h1>
        <div id='seq-container'>
          <div id='note-list'>
            {
              this.state.sequence.map((note, idx) => {
                return (
                  <span key={idx}> {note} </span>
                )
              })
            }
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
          </div>
        </div>
        <div>
          <Keyboard playNote={this.playNote} />
          <SequenceList sequenceList={this.state.sequenceList} />
        </div>
      </div>
    );
  }
}

export default App;