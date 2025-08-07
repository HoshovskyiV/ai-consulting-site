// src/app/payment-success/page.tsx
export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>
}) {
  const params = searchParams ? await searchParams : undefined
  const bookingId = params?.booking

  return (
    <div className="container">
      <div className="success-page">
        <div className="success-icon">✅</div>
        <h1>Оплату успішно прийнято!</h1>
        <p>Дякуємо за довіру. Ваше бронювання опрацьовується.</p>

        {bookingId && (
          <div className="booking-info">
            <p>
              <strong>Номер бронювання:</strong> {bookingId}
            </p>
          </div>
        )}

        <div className="next-steps">
          <h3>Що далі?</h3>
          <ol>
            <li>Протягом 30&nbsp;хвилин отримаєте email з деталями</li>
            <li>За 24&nbsp;год до зустрічі надійде лінк на відеодзвінок</li>
            <li>Підготую персоналізовані матеріали на основі вашої заявки</li>
          </ol>
        </div>

        <div className="contact-info">
          <h3>Контакти</h3>
          <p>Email: vasyl.hoshovskyi@gmail.com</p>
          <p>Telegram: @hoshovskyiv</p>
        </div>

        <a href="/" className="back-home">
          ← Повернутися на головну
        </a>
      </div>
    </div>
  )
}
