# 🍽️ MessMate – Hostel Mess Feedback & Voting App

> Replace **MessMate** with your chosen name.

A cross-platform mobile app for hostel students to **view daily/weekly menus**, **rate meals**, and **vote on dish options**, with an **admin web dashboard** for real-time analytics.

---

## ✨ Features

- 📅 **Menu Viewer**: Breakfast/Lunch/Dinner by date/week
- ⭐ **Meal Ratings**: 1–5 stars + optional comments
- 🗳️ **Weekly Polls**: Vote on special dishes / changes
- 🔔 **Push Notifications**: Menu updates, poll reminders
- 📈 **Admin Dashboard**: Averages, trends, top issues, export CSV/PDF
- 👤 **Auth**: Email/OTP via Firebase Authentication
- 🔍 **Search & Filters**: Meal type, date, sentiment
- 🛡️ **Role-Based Access**: student / admin

---

## 🏗️ Architecture

- **Mobile App**: React Native (Expo)
- **Backend**: Firebase (Auth, Firestore, Cloud Functions, Cloud Messaging)
- **Admin Dashboard**: Next.js (Vercel) or CRA (optional)
- **Storage**: Firestore; optional Storage for assets
- **Analytics**: Firestore + Cloud Functions scheduled jobs

