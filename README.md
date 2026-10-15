# Beta Optic — Premium Eyewear & Optometry Experience

A modern, high-performance web experience for **Beta Optic**, crafted with **React 19**, **Vite**, and **Tailwind CSS v4**.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd BetaOptic

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Production Build

```bash
npm run build
```

This compiles optimized assets into the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
BetaOptic/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and videos
│   ├── components/         # React UI sections & modals
│   │   ├── AtelierSection.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── FrameBrandsSection.jsx
│   │   ├── HeroSection.jsx
│   │   ├── InstagramSection.jsx
│   │   ├── LensBrandsSection.jsx
│   │   ├── LocationSection.jsx
│   │   ├── Modals.jsx
│   │   ├── ProcessTimelineSection.jsx
│   │   └── QAFormSection.jsx
│   ├── data/               # Dynamic data and content
│   │   ├── doctorsData.js
│   │   └── opticData.js
│   ├── App.jsx             # Main application component & routing
│   ├── index.css           # Global Tailwind CSS styles & themes
│   └── main.jsx            # React root mount
├── index.html              # HTML entry point
├── package.json            # Scripts & dependencies
├── vercel.json             # Vercel deployment & SPA routing configuration
└── vite.config.js          # Vite configuration
```

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the **Vite** framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.
