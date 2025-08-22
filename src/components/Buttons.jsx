import React from 'react'

function Buttons({ setAllCompleted, clearAllCompleted, clearAll, setAllActive }) {
    return (
        <div className='buttonsSection'>
            <button className='buttons' onClick={setAllCompleted}>Set All Completed</button>
            <button className="buttons" onClick={setAllActive}>Set All Active</button>
            <button className='buttons' onClick={clearAllCompleted}>Clear All Completed</button>
            <button className='buttons' onClick={clearAll}>Clear All</button>
        </div>
    )
}

export default Buttons