import { useState } from 'react'

export default function AuthSignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) throw new Error('Signup failed')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      window.history.back()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border p-6 mt-10">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Full name</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Password</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        </div>
        {error && <div className="text-rose-600 text-sm">{error}</div>}
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded py-2">Sign up</button>
      </form>
    </div>
  )
}


