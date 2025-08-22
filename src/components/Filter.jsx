import searchIcon from '/icons8-search-50.png'

function Filter({ search, status, onSearch, onStatusChange }) {
  return (
    <div className='filterMainDiv'>
      <div className='searchDiv '>
        <img src={searchIcon} alt="" className='w-[20px] h-[20px]' />
        <input
          type="search"
          placeholder='Search...'
          className='searchInput'
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onSearch('')
          }}
        />
      </div>

      <div className='w-[25%] shadow'>
        <select
          className='selectOptions'
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
