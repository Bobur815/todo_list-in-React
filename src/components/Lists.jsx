import React from 'react'

export default function Lists({ items, onToggle, onDelete, onUpdate }) {

    return (
        <ul className="ulLists">
            {items.map(it => (
                <li key={it.id} className='group'>
                    <label >
                        <input
                            type="checkbox"
                            checked={it.completed}
                            onChange={() => onToggle(it.id)}
                            className="accent-black w-6 h-6 cursor-pointer"
                        />
                        <div className='flex flex-col'>
                            <span className={it.completed ? 'line-through text-gray-400' : 'searchInput'}>
                                {it.title}
                            </span>
                            <span className={it.completed ? 'line-through text-gray-400' : 'searchInput'}>
                                {it.createdAt}
                            </span>
                        </div>
                    </label>

                    <div className='flex gap-6'>
                        <button
                            onClick={() => onUpdate(it.id)}
                            className="editBtn"
                            aria-label="Delete"
                        >
                            ✏️
                        </button>

                        <button
                            onClick={() => onDelete(it.id)}
                            className="delBtn"
                            aria-label="Delete"
                        >
                            ✕
                        </button>
                    </div>
                </li>
            ))}

            {items.length === 0 && (
                <li className="text-gray-500 italic">Empty… add your first task</li>
            )}
            <div className='searchInput space-y-4 sticky bottom-0 bg-surface'>
                <hr className='w-full h-[2px] bg-gray-400' />
                <span className='searchInput'>Total: {items.length}</span>
            </div>
        </ul>
    )
}
