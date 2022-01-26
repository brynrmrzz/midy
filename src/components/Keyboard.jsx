import React from 'react';

const Keyboard = ({ sequence, playNote }) => {

  const notes = ['C', 'D', 'E', 'G', 'A', 'B'];
  const sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];

  return (
    <div id="keyboard-container">
      <div className='note-container'>
        {
          notes.map((note, idx) => {
            return (
              <button
                className='note-btn'
                key={idx}
                onClick={() => {
                  playNote(`${note}`);
                }}>{note}
              </button>
            )
          })
        }
      </div>
      <div className='note-container'>
        {
          sharps.map((note, idx) => {
            return (
              <button
                className='note-btn'
                key={idx}
                onClick={() => {
                  playNote(`${note}`);
                }}>{note}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Keyboard;