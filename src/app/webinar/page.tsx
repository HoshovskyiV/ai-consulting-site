import WebinarPayment from '../../components/WebinarPayment'

export default function WebinarPage() {
  return (
    <div className="container">
      <section className="webinar-hero">
        <div>
          <p className="webinar-label">Живий вебінар</p>
          <h1>AI для бізнесу: як швидко знайти точки росту</h1>
          <p className="subtitle">
            2-годинний практичний розбір, який покаже, де саме AI може дати миттєвий результат.
          </p>
          <div className="webinar-meta">
            <div>
              <span>Дата:</span>
              <strong> 12 квітня, 19:00 (онлайн)</strong>
            </div>
            <div>
              <span>Формат:</span>
              <strong> Zoom + запис на 7 днів</strong>
            </div>
          </div>
        </div>
        <div className="webinar-highlight">
          <h3>Для кого цей вебінар?</h3>
          <ul>
            <li>Власники бізнесу та керівники команд</li>
            <li>Маркетинг та продажі, які хочуть автоматизації</li>
            <li>Команди, що шукають швидкі AI-рішення</li>
          </ul>
        </div>
      </section>

      <section className="webinar-content">
        <div className="webinar-card">
          <h2>Що ви отримаєте</h2>
          <ul className="webinar-list">
            <li>Покрокову карту впровадження AI в бізнес-процеси</li>
            <li>Реальні кейси з ROI за 30-60 днів</li>
            <li>Добірку інструментів для маркетингу, продажів та операцій</li>
            <li>Сесія Q&A та персональні рекомендації</li>
          </ul>
        </div>

        <div className="webinar-card">
          <h2>Програма</h2>
          <ol className="webinar-steps">
            <li>Де AI дає найбільший ефект у 2024 році</li>
            <li>Аудит процесів: швидкі wins без великого бюджету</li>
            <li>Побудова AI-воронки для залучення клієнтів</li>
            <li>Як вимірювати результат і масштабувати рішення</li>
          </ol>
        </div>
      </section>

      <section className="webinar-payment-section">
        <WebinarPayment />
        <div className="webinar-guarantee">
          <h3>Гарантія якості</h3>
          <p>
            Якщо після вебінару ви зрозумієте, що формат вам не підходить — повертаю 100% оплати
            протягом 24 годин.
          </p>
          <p className="webinar-support">
            Підтримка: <strong>vasyl.hoshovskyi@gmail.com</strong>
          </p>
        </div>
      </section>
    </div>
  )
}
