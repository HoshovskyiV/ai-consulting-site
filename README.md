# AI Консалтинг Сайт

Повнофункціональний сайт з CMS, бронюванням та платежами через Monobank.

## Технології

- **Payload 3.0** - CMS + Admin панель  
- **Next.js 15** - Frontend framework
- **Vercel Postgres** - База даних
- **Monobank API** - Платежі
- **TypeScript** - Типізація

## Швидкий старт

### 1. Встановлення залежностей
```bash
pnpm install
```

### 2. Налаштування оточення
```bash
cp .env.example .env.local
```

Заповніть значення в `.env.local`:
- `POSTGRES_URL` - з Vercel Postgres
- `PAYLOAD_SECRET` - випадковий рядок 32+ символи  
- `MONOBANK_TOKEN` - з https://api.monobank.ua/
- `MONOBANK_WEBHOOK_SECRET` - випадковий рядок

### 3. Генерація типів
```bash
pnpm generate:types
pnpm generate:schema
```

### 4. Розробка
```bash
pnpm dev
```

Відкрийте:
- http://localhost:3000 - фронтенд
- http://localhost:3000/admin - CMS

## Деплой

### Vercel
1. Підключіть GitHub репозиторій
2. Додайте змінні оточення  
3. Увімкніть Vercel Postgres
4. Задеплойте

### Після деплою
1. Створіть адміна через `/admin`
2. Налаштуйте webhook в Monobank консолі
3. Протестуйте платежі

## Структура

```
src/
├── app/
│   ├── api/
│   │   ├── create-payment/    # API створення платежу
│   │   └── monobank-webhook/  # Webhook обробка
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── ...

payload.config.ts              # Конфігурація CMS
```

## Колекції CMS

- **Users** - адміністратори
- **Pages** - статичні сторінки
- **Bookings** - бронювання з платежами

## API Endpoints

- `POST /api/create-payment` - створити Monobank платіж
- `POST /api/monobank-webhook` - обробка callback від Monobank
