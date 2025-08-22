import React from 'react'

function Buttons({ setAllCompleted, clearAllCompleted, clearAll, label, disabledBtn, hasCompleted }) {
    return (
        <div className='buttonsSection'>
            <button className='buttons' onClick={setAllCompleted} disabled={disabledBtn}>{label}</button>
            <button className='buttons' onClick={clearAllCompleted} disabled={hasCompleted}>Clear All Completed</button>
            <button className='buttons' onClick={clearAll} disabled={disabledBtn}>Clear All</button>
        </div>
    )
}

export default Buttons