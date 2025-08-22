import React, { useState } from 'react'

function AddTask({onAdd}) {
    const [task, setTask] = useState('')

    function addBtn(){
        const value = task.trim()
        if(!value) return
        onAdd?.(value)
        setTask('')
    }

    function enterKeyBtn(e){
        if(e.key === 'Enter') addBtn()
    }


    return (
        <div className='addTaskSection'>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={enterKeyBtn} className='searchInput text-2xl' placeholder='Add new...' />
            <button onClick={addBtn} disabled={!task.trim()} className='buttons max-w-[150px]  border  text-2xl'>+ Add</button>
        </div>
    )
}

export default AddTask