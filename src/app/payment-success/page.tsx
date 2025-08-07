// src/app/payment-success/page.tsx
interface PageProps {
  searchParams: {
    booking?: string
  }
}

export default function PaymentSuccess({ searchParams }: PageProps) {
  const bookingId = searchParams.booking

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
            <li>Протягом 30 хв дістанете email з деталями</li>
            <li>За 24 години надійде лінк на відеодзвінок</li>
            <li>Підготую персоналізовані матеріали</li>
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
