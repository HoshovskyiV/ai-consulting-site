export default function Home() {
  return (
    <div className="container">
      <h1>AI Консалтинг</h1>
      <p>Професійні рішення з штучного інтелекту</p>
      <div className="services">
        <h2>Послуги</h2>
        <div className="service-card">
          <h3>Discovery Audit (15-25К грн)</h3>
          <p>Аналіз можливостей оптимізації через AI</p>
        </div>
        <div className="service-card">
          <h3>Навчання (30К+ грн)</h3>
          <p>Корпоративні тренінги з AI</p>
        </div>
        <div className="service-card">
          <h3>Менторство (20К грн/місяць)</h3>
          <p>Постійна підтримка та консультації</p>
        </div>
      </div>
    </div>
  )
}
