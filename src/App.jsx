import { useState, useMemo, useEffect } from 'react'
import icon from '/icons8-list-64 (1).png'
import AddTask from './components/AddTask'
import Filter from './components/Filter'
import Lists from './components/Lists'
import Buttons from './components/Buttons'
import ThemeSwitcher from './components/ThemeSwitcher'

const STORAGE = {
  items: 'todo_items',
  search: 'todo_search',
  status: 'todo_status',
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [items, setItem] = useState(() => readJSON(STORAGE.items, []));
  const [search, setSearch] = useState(() => readJSON(STORAGE.search, ''));
  const [status, setStatus] = useState(() => readJSON(STORAGE.status, 'all'));

  useEffect(() => {
    localStorage.setItem(STORAGE.items, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE.search, JSON.stringify(search));
  }, [search]);

  useEffect(() => {
    localStorage.setItem(STORAGE.status, JSON.stringify(status));
  }, [status]);

  function handleAdd(value) {
    setItem(prev => [{ id: Date.now(), title: value, completed: false, createdAt: getFormatDate() }, ...prev]);
  }

  function handleSearch(value) {
    setSearch(value);
  }

  function handleUpdate(id) {
    const currentTask = items.find(item => item.id === id)
    const next = prompt("Edit task:", currentTask?.title ?? "")
    if (!next || !next.trim()) return

    setItem(prev => prev.map(item => item.id === id ? { ...item, title: next, createdAt: getFormatDate() } : item))

  }

  function handleStatusChange(next) {
    setStatus(next);
  }

  function handleToggle(id) {
    setItem(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function getFormatDate(date = Date.now()) {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, '0');
    const dd = pad(d.getDate());
    const mm = pad(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    const HH = pad(d.getHours());
    const MM = pad(d.getMinutes());
    const SS = pad(d.getSeconds());
    return `${dd}/${mm}/${yyyy}, ${HH}:${MM}:${SS}`;
  }

  function handleSetAllCompleted() {
    setItem(prev => {
      const allCompleted = prev.length > 0 && prev.every(it => it.completed)
      return prev.map(it => ({...it, completed: !allCompleted}))
    });
  }

  function handleDelete(id) {
    setItem(prev => prev.filter(item => item.id !== id));
  }

  function handleClearAllCompleted() {
    if (!confirm("Are you sure you want to delete all completed tasks?")) return
    setItem(prev => prev.filter(item => !item.completed))
  }

  function handleClearAll() {
    if (!confirm("Are you sure you want to delete all tasks?")) return
    setItem([])
  }


  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(item => {
      const matchesSearch = !q || item.title.toLowerCase().includes(q);
      const matchesStatus =
        status === 'all' ? true :
          status === 'active' ? !item.completed : item.completed;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  const allCompleted = items.length>0 && items.every(it => it.completed);
  const label = allCompleted ? "Set All Active" : "Set All Completed";
  const hasItems = items.length > 0;
  const hasCompleted = items.length>0 && items.some(it => it.completed);

  return (
    <div className='container motion-safe:animate-[hue_2s_linear_infinite]'>
      <div className="header">
        <h1>
          <img src={icon} alt="" /> My Todo List
        </h1>
        <ThemeSwitcher />
      </div>

      <AddTask onAdd={handleAdd} />
      <Filter
        search={search}
        status={status}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />
      <Lists items={filteredItems} onToggle={handleToggle} onDelete={handleDelete} onUpdate={handleUpdate} />
      <Buttons 
      label={label}
      disabledBtn={!hasItems}
      setAllCompleted={handleSetAllCompleted} 
      clearAllCompleted={handleClearAllCompleted} 
      clearAll={handleClearAll} 
      hasCompleted={!hasCompleted}
      />
    </div>
  )
}

export default App
