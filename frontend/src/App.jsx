import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/api'

const inputStyle = { display: 'block', margin: '6px 0', padding: 6, width: 280 }

function Children() {
  const [children, setChildren] = useState([])
  const [form, setForm] = useState({ name: '', age: '', guardian: '', phone: '' })

  const load = () => fetch(`${API}/children`).then(r => r.json()).then(setChildren).catch(() => {})
  useEffect(load, [])

  const add = async (e) => {
    e.preventDefault()
    await fetch(`${API}/children`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, age: Number(form.age) })
    })
    setForm({ name: '', age: '', guardian: '', phone: '' })
    load()
  }

  return (
    <div>
      <h2>Children Roster</h2>
      <ul>{children.map(c => <li key={c._id}>{c.name}, age {c.age} — guardian: {c.guardian} ({c.phone})</li>)}</ul>
      <h3>Register a child</h3>
      <form onSubmit={add}>
        <input style={inputStyle} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input style={inputStyle} placeholder="Age" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} required />
        <input style={inputStyle} placeholder="Guardian" value={form.guardian} onChange={e => setForm({ ...form, guardian: e.target.value })} required />
        <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

function Schedule() {
  const [items, setItems] = useState([])
  const [program, setProgram] = useState('preschool')

  useEffect(() => {
    fetch(`${API}/schedule?program=${program}`).then(r => r.json()).then(setItems).catch(() => {})
  }, [program])

  return (
    <div>
      <h2>Weekly Schedule</h2>
      <select value={program} onChange={e => setProgram(e.target.value)}>
        <option value="infant">Infant</option>
        <option value="toddler">Toddler</option>
        <option value="preschool">Preschool</option>
      </select>
      <ul>{items.map(i => <li key={i._id}>{i.day} {i.time} — {i.activity}</li>)}</ul>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('children')
  return (
    <div style={{ maxWidth: 700, margin: '30px auto', fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Daycare Management Portal</h1>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab('children')}>Children</button>{' '}
        <button onClick={() => setTab('schedule')}>Schedule</button>
      </div>
      {tab === 'children' ? <Children /> : <Schedule />}
    </div>
  )
}
