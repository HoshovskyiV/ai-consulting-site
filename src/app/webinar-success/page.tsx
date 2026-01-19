export default function WebinarSuccess() {
  return (
    <div className="container">
      <div className="success-page">
        <div className="success-icon">🎉</div>
        <h1>Оплату підтверджено!</h1>
        <p>Дякуємо за участь у вебінарі. Перевірте пошту — посилання на Zoom вже летить до вас.</p>

        <div className="next-steps">
          <h3>Що далі?</h3>
          <ol>
            <li>Отримайте лист з календарем та посиланням</li>
            <li>Додайте подію у свій календар</li>
            <li>Приєднайтеся за 5 хвилин до старту</li>
          </ol>
        </div>

        <div className="contact-info">
          <h3>Потрібна допомога?</h3>
          <p>Пишіть на: vasyl.hoshovskyi@gmail.com</p>
        </div>

        <a href="/webinar" className="back-home">
          ← Повернутися до сторінки вебінару
        </a>
      </div>
    </div>
  )
}
