# Fahim Muntasir - Personal Portfolio Website

A human-crafted, modern, and high-performance developer portfolio website designed for **Fahim Muntasir** (Software Engineer & Tech Researcher).

---

## 🌟 Key Features

1. **Human & Natural Voice:**
   - Authentic first-person narrative without robotic AI buzzwords.
   - Dynamic real-time greeting based on visitor's/Dhaka local time.
   - Live Dhaka clock (`Asia/Dhaka`, GMT+6) with active status indicators.

2. **Research & Publications Spotlight:**
   - Dedicated showcase for **IEEE SPICSCON 2026** (Federated Intrusion Detection Framework).
   - Medical AI research breakdown for Multi-Class Alzheimer’s Disease Severity classification from structural Brain MRI.

3. **Engineering Projects Showcase:**
   - Interactive category filtering (`All`, `Full-Stack (MERN)`, `Research & ML`, `Systems & PHP`).
   - Deep-dive case study modal with **The Problem**, **The Architecture**, and **Key Features**.

4. **Interactive Sandbox & Micro-Interactions:**
   - Embedded interactive terminal emulator with real commands (`whoami`, `skills`, `research`, `experience`, `interests`, `contact`).
   - One-click email copy button with toast feedback.
   - Dark / Light mode toggle with saved localStorage preferences.

5. **Printable / ATS-Friendly Resume Page (`resume.html`):**
   - Recruiter-friendly standalone view matching your CV layout with a 1-click **"Print / Save as PDF"** feature.

---

## 📂 Project Structure

```
D:\project\fahim-portfolio\
├── index.html               # Main portfolio landing page
├── resume.html              # Printable / ATS-compliant CV page
├── README.md                # Project documentation & deployment guide
└── assets\
    ├── css\
    │   └── style.css        # Custom responsive styling & design tokens
    ├── js\
    │   └── main.js          # Interactive features (clock, terminal, filter, modals)
    └── images\
        └── fahim.jpg        # Your professional portrait photograph
```

---

## 🚀 How to View Locally

### Option 1: Direct File Open
Simply double-click on `index.html` to open it in your default web browser (Chrome, Edge, Firefox, Brave, etc.).

### Option 2: Using VS Code Live Server
1. Open the folder `D:\project\fahim-portfolio` in VS Code.
2. Right click on `index.html` and choose **"Open with Live Server"**.

### Option 3: Python Local Server
Open PowerShell in `D:\project\fahim-portfolio` and run:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Free Deployment (GitHub Pages, Netlify, Vercel)

### Deploy to GitHub Pages (Recommended):
1. Create a repository on GitHub (e.g. `fahim-m30.github.io` or `portfolio`).
2. Push this folder's contents to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of personal portfolio"
   git branch -M main
   git remote add origin https://github.com/fahim-m30/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. In GitHub repo Settings -> **Pages** -> Select `main` branch -> Click **Save**.
4. Your website is live in 60 seconds!

---

Crafted with care for **Fahim Muntasir**.
