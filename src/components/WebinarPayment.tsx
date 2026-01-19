'use client'

import { useState } from 'react'

type WebinarFormState = {
  name: string
  email: string
}

export default function WebinarPayment() {
  const [formData, setFormData] = useState<WebinarFormState>({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/webinar-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Payment creation failed')
      }

      const { paymentUrl } = await response.json()
      window.location.href = paymentUrl
    } catch (error) {
      console.error('Webinar payment error:', error)
      alert('Не вдалося створити оплату. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="webinar-payment" onSubmit={handleSubmit}>
      <h3>Реєстрація та оплата</h3>
      <p className="webinar-note">Після оплати ви отримаєте лист з доступом до кімнати.</p>

      <div className="form-group">
        <label htmlFor="name">Ваше ім'я *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="price-info">
        <strong>Вартість участі: 1 500 грн</strong>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Формуємо рахунок...' : 'Сплатити через monobank'}
      </button>
    </form>
  )
}
