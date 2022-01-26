import React from 'react';

const SequenceList = ({ sequenceList, changeSequence }) => {


  return (
    <div className='sequence-list'>
      {
        (sequenceList) && (
          sequenceList.map((sequence) => {
            if (sequence.sequence) {
              return (
                <button
                id={sequence._id}
                key={sequence._id}
                className='seq-btn'
                onClick={()=>{
                  changeSequence(sequence.sequence)
                }}>
                {sequence.sequence.join(' ')}

                </button>
              )
            }
          })
        )
      }
    </div>
  )
}

export default SequenceList