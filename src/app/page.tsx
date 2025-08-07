import BookingForm from '../components/BookingForm'

export default function Home() {
  return (
    <div className="container">
      <header className="hero">
        <h1>AI Консалтинг</h1>
        <p className="subtitle">Професійні рішення з штучного інтелекту</p>
        <p className="description">
          17 років досвіду у відеопродакшні + 2.5 року інтенсивних досліджень AI.
          Допомагаю бізнесу знаходити приховані можливості оптимізації.
        </p>
      </header>

      <section className="services">
        <h2>Послуги</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Discovery Audit</h3>
            <div className="price">15-25К грн</div>
            <p>Аналіз можливостей оптимізації через AI на основі 17-річного досвіду аналізу клієнтського шляху</p>
            <ul>
              <li>Аудит поточних процесів</li>
              <li>Виявлення вузьких місць</li>
              <li>Рекомендації по впровадженню AI</li>
              <li>ROI прогноз</li>
            </ul>
          </div>
          
          <div className="service-card">
            <h3>AI Навчання</h3>
            <div className="price">30К+ грн</div>
            <p>Корпоративні тренінги та воркшопи для команд</p>
            <ul>
              <li>Практичні навички роботи з AI</li>
              <li>Інтеграція в робочі процеси</li>
              <li>Безпека та етика AI</li>
              <li>Кастомізовані сценарії</li>
            </ul>
          </div>
          
          <div className="service-card">
            <h3>Менторство</h3>
            <div className="price">20К грн/місяць</div>
            <p>Постійна підтримка та консультації</p>
            <ul>
              <li>Щотижневі дзвінки</li>
              <li>Аналіз результатів</li>
              <li>Стратегічне планування</li>
              <li>Доступ до ексклюзивних матеріалів</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="booking-section">
        <BookingForm />
      </section>

      <section className="about">
        <h2>Чому саме я?</h2>
        <div className="unique-value">
          <p>
            <strong>Унікальна комбінація:</strong> Єдиний в Україні експерт з поєднанням 
            "відео + AI + регіональні знання". Етичний підхід проти інфобізнесу.
          </p>
          <p>
            <strong>Результат:</strong> Допомагаю знаходити приховані можливості, 
            які конкуренти не помічають.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>AI Консалтинг © 2024 Василь Гошовський</p>
        <p>Івано-Франківськ, Україна</p>
      </footer>
    </div>
  )
}
