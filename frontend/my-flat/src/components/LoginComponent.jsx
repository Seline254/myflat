import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../css/auth.css";


const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  })

  // user interaction
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading('Creating account...')
    try {
      const res = await axios.post(`https://your-api.com/api/auth/register/${formData.role}`, formData)
      localStorage.setItem('token', res.data.token)
      navigate(`/${formData.role}-dashboard`)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>{loading}</p>}
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterComponent
