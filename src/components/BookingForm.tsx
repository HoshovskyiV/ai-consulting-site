'use client'

import { useState } from 'react'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    service: '',
    scheduledDate: '',
  })
  const [loading, setLoading] = useState(false)

  const services = [
    { value: 'audit', label: 'AI Discovery Audit', price: 20000 },
    { value: 'training', label: 'AI Training Session', price: 35000 },
    { value: 'mentorship', label: 'Monthly Mentorship', price: 20000 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const selectedService = services.find(s => s.value === formData.service)
      
      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: selectedService?.price || 0,
        }),
      })

      if (!bookingResponse.ok) throw new Error('Booking creation failed')
      
      const booking = await bookingResponse.json()

      // Create payment
      const paymentResponse = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id }),
      })

      if (!paymentResponse.ok) throw new Error('Payment creation failed')
      
      const { paymentUrl } = await paymentResponse.json()
      
      // Redirect to payment
      window.location.href = paymentUrl
    } catch (error) {
      console.error('Error:', error)
      alert('Помилка створення бронювання. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const selectedService = services.find(s => s.value === formData.service)

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h2>Замовити консультацію</h2>
      
      <div className="form-group">
        <label htmlFor="customerName">Ім'я *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">Послуга *</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Оберіть послугу</option>
          {services.map(service => (
            <option key={service.value} value={service.value}>
              {service.label} - {service.price.toLocaleString()} грн
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="scheduledDate">Бажана дата *</label>
        <input
          type="datetime-local"
          id="scheduledDate"
          name="scheduledDate"
          value={formData.scheduledDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>

      {selectedService && (
        <div className="price-info">
          <strong>До сплати: {selectedService.price.toLocaleString()} грн</strong>
        </div>
      )}

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Створення...' : 'Замовити та оплатити'}
      </button>
    </form>
  )
}
