# 🚦 Drive Legal AI

Drive Legal AI is an AI-assisted traffic monitoring and road safety system that simulates automatic traffic rule enforcement. The system provides separate dashboards for drivers and police officers, maintains a driving score, detects traffic violations, and can send SMS alerts using Twilio.

## 📌 Features

### 🚗 Driver Portal

- Driver registration
- Live GPS location
- Safe Driving Score
- Driver profile
- AI traffic violation simulation
- Fine calculation
- Real-time score updates

### 👮 Police Portal

- Police login
- Search registered drivers
- View violations
- Monitor fines
- Track safe drivers
- Dashboard statistics

### 🤖 AI Detection Simulation

The system randomly simulates detection of:

- ✅ Helmet detected
- ❌ No helmet
- ❌ Triple riding
- ❌ Over-speeding

Each violation updates:

- Driving score
- Fine amount
- Driver record

## 📱 SMS Alert Service

Backend uses:

- Express.js
- Twilio API

to send SMS notifications to registered drivers.

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- Twilio API
- CORS

## 📂 Project Structure

```
DriveLegal-AI/
│
├── index.html
├── dashboard.html
├── police-dashboard.html
├── style.css
├── index.js
├── dashboard.js
├── police-dashboard.js
├── server.js
├── package.json
├── user.json
└── README.md
```

## 🚀 Installation

Clone the repository

```
git clone <repository-url>
```

Install dependencies

```
npm install
```

Start the server

```
npm start
```

Server runs on:

```
http://localhost:5000
```

Open the frontend in your browser.

## 📊 Driver Dashboard

- Driver Profile
- GPS Tracking
- Safe Driving Score
- AI Detection
- Fine Status
- Traffic Rules

## 👮 Police Dashboard

- Total Registered Drivers
- Violation Statistics
- Fine Collection
- Safe Driver Count
- Driver Search
- Vehicle Information

## 🚦 Traffic Rules Included

- Helmet Mandatory
- Triple Riding Prohibited
- Over-speeding
- Mobile Phone Usage
- Drunk Driving
- Traffic Signal Compliance
- Lane Discipline
- Carry Valid Documents

## 🔔 AI Workflow

1. Driver registers.
2. Driver dashboard opens.
3. AI detection runs.
4. Violation is detected.
5. Fine is calculated.
6. Driving score is updated.
7. Police dashboard displays updated records.
8. SMS alerts can be sent using Twilio.

## Future Enhancements

- Real AI object detection using YOLO
- OpenCV integration
- Camera feed support
- Face recognition
- Number plate recognition (ANPR)
- Database (MongoDB/MySQL)
- Authentication with JWT
- Real GPS tracking
- Payment gateway for fines
- Analytics dashboard
## Author

Developed as an AI-powered Smart Traffic Management System project.
