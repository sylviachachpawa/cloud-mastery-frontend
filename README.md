# 🌩️ Cloud Mastery – Pawa IT Training App

Welcome to the **Cloud Mastery Training App**, a hands-on project designed exclusively for the **Pawa IT Cloud Mastery 2025 Event**.

> 🎯 This app is built using [Next.js](https://nextjs.org), and is designed to help you explore **Google Cloud Platform (GCP)**, and API-driven application development — guided by real-world cloud experts from **Pawa IT Solutions** and **Google Cloud Africa**.

---

## 📍 Event Details

**📅 Date:** June 26, 2025  
**📍 Location:** The Social House, Nairobi  
**🎓 Theme:** _"Ready to Master the Cloud?"_

This full-day, in-person event will guide you through:
- Housekeeping
- App migration to GCP ☁️  
- DevOps pipelines & CI/CD 🔁  
- Data analytics using Looker Studio 📊  
- AI/ML workflows 🤖  
- Conversational agents with Dialogflow CX 💬  

Meet your trainers from **Pawa IT Solutions** and **Google Cloud Africa**, including:
- Oscar Limoke
- Eddie Ngugi
- Basil Ndonga
- John Higi
- Nelson Ameyo
- Josiah Mugambi

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Pawa-IT-Solutions/cloud-mastery-frontend.git
cd cloud-mastery-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment File

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_APP_NAME="CLOUD MASTERY TRAINING"
NEXT_PUBLIC_API_URL="https://your-assigned-api-url/api/v1"
```

> 🔐 Each participant will be assigned a unique API endpoint. Make sure to replace the placeholder above!

---

## 🧪 Development Server

Start the dev server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

Edit `app/page.tsx` or other components to start building — changes are hot-reloaded automatically.

---

## 🧱 Tech Stack

| Feature      | Tool / Framework                    |
|--------------|-------------------------------------|
| Frontend     | [Next.js](https://nextjs.org) (App Router) |
| Styling      | Tailwind CSS                        |
| Fonts        | [Geist](https://vercel.com/font) via `next/font` |
| HTTP Client  | Axios                               |

---

## 🐳 Docker Support

### Production Dockerfile

```Dockerfile
"Check the docker file in the root directory"
```

### Build & Run

```bash
docker build -t cloud-mastery-app .
docker run -p 3000:3000 --env-file .env.local cloud-mastery-app
```

---

## 📚 Learn More

### Next.js

- [Official Docs](https://nextjs.org/docs)
- [Interactive Tutorial](https://nextjs.org/learn)
 

### Google Cloud (Topics from the Event)

- [BigQuery](https://cloud.google.com/bigquery)
- [Dialogflow CX](https://cloud.google.com/dialogflow/cx/docs)
- [Looker Studio](https://lookerstudio.google.com/)
- [Cloud Run](https://cloud.google.com/run)

---

## 📦 Deployment (Optional)

Deploy this app instantly with Cloud Run:

[![Deploy with Cloud Run](https://cloud.google.com/run)]

---

## 💬 Need Help?

If you encounter issues:

- Ask a trainer at the event
- Visit our support desk
- Email: [events@pawait.co.ke](mailto:events@pawait.co.ke)

---

## 👩‍💻 License & Credits

This training is powered by **Pawa IT Solutions** in partnership with **Google Cloud Africa**.

© 2025 Pawa IT Solutions. All rights reserved.  
Website: [pawait.africa](https://pawait.africa)  
Privacy: [Privacy Policy](https://pawait.africa/privacy)

---

### 🌟 Ready to Master the Cloud?

_Yes you are. Let’s build something awesome together._ 🚀
