import React from 'react';

const SequenceList = ({ sequenceList }) => {


  return (
    <div className='sequence-list'>
      {
        (sequenceList) && (
          sequenceList.map((sequence, idx) => {
            if (sequence.sequence) {
              return (
                <div key={idx}> {sequence.sequence.join(' ')} </div>
              )
            }
          })
        )
      }
    </div>
  )
}

export default SequenceList