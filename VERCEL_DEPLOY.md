# VERCEL DEPLOY ІНСТРУКЦІЇ

## 1. Підготовка до деплою

Репозиторій готовий: https://github.com/HoshovskyiV/ai-consulting-site

## 2. Деплой на Vercel

### 2.1 Підключіть GitHub репозиторій
1. Йдіть на https://vercel.com/new
2. Виберіть "Import Git Repository"
3. Введіть: `HoshovskyiV/ai-consulting-site`
4. Натисніть "Import"

### 2.2 Налаштування змінних оточення
В Vercel додайте ці змінні (Settings → Environment Variables):

```
PAYLOAD_SECRET=ai_consulting_secret_2024_vasyl_hoshovskyi_super_secure_key
MONOBANK_TOKEN=mbk7N9RqE31TcuhSYI09ssQ
MONOBANK_WEBHOOK_SECRET=webhook_secret_mono_2024_secure
NEXTAUTH_URL=https://ВАШ_ДОМЕН.vercel.app
NEXT_PUBLIC_PAYLOAD_URL=https://ВАШ_ДОМЕН.vercel.app
```

### 2.3 Додайте Vercel Postgres
1. В проекті Vercel йдіть у вкладку "Storage"
2. Натисніть "Create Database" → "Postgres"
3. Назва: `ai-consulting-db`
4. Vercel автоматично додасть `POSTGRES_URL`

### 2.4 Деплой
1. Натисніть "Deploy"
2. Дочекайтеся завершення (2-3 хвилини)
3. Відкрийте сайт: `https://ВАШ_ДОМЕН.vercel.app`

## 3. Післядеплойна налаштування

### 3.1 Створіть адміна
1. Йдіть на `https://ВАШ_ДОМЕН.vercel.app/admin`
2. Створіть першого користувача-адміна

### 3.2 Налаштуйте Monobank webhook
1. Увійдіть в особистий кабінет https://api.monobank.ua/
2. Додайте webhook URL: `https://ВАШ_ДОМЕН.vercel.app/api/monobank-webhook`
3. Використовуйте секрет: `webhook_secret_mono_2024_secure`

### 3.3 Тестування
1. Створіть тестове бронювання в `/admin`
2. Протестуйте створення платежу
3. Перевірте webhook обробку

## 4. Що вже готово

✅ Payload 3.0 CMS з admin панеллю  
✅ Колекції: Users, Pages, Bookings  
✅ Monobank API інтеграція  
✅ Webhook обробка платежів  
✅ TypeScript типи згенеровані  
✅ Налаштована Vercel конфігурація  

## 5. Наступні кроки після деплою

1. Створити форму бронювання на фронтенді
2. Додати Google Calendar інтеграцію
3. Налаштувати email сповіщення
4. Додати кастомні сторінки через CMS

---

**GitHub:** https://github.com/HoshovskyiV/ai-consulting-site  
**Ready for Vercel deploy!** 🚀
