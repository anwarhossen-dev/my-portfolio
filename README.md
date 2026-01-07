# Professional Portfolio

A modern, responsive portfolio website built with React.js, Tailwind CSS, and Vite. Features a clean design, dark mode support, and professional presentation of skills, projects, and experience.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Dark Mode**: System preference detection with manual toggle
- **Performance Optimized**: Built with Vite for fast development and production builds
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **SEO Friendly**: Optimized meta tags and structured data
- **Professional Standards**: ESLint, Prettier, and proper code organization

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Material Icons, Font Awesome
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Code Quality**: ESLint, Prettier
- **Type Checking**: PropTypes

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── SkillsSection.jsx
│   ├── EducationSection.jsx
│   ├── ExperienceSection.jsx
│   ├── ProjectsSection.jsx
│   ├── ContactSection.jsx
│   ├── Sidebar.jsx
│   └── Footer.jsx
├── constants/           # Application constants
│   └── index.js
├── hooks/              # Custom React hooks
│   ├── useTheme.js
│   └── useScrollSpy.js
├── utils/              # Utility functions
│   └── index.js
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-react.git
cd portfolio-react
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables with your information

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build directory

## 🎨 Customization

### Personal Information

Update the constants in `src/constants/index.js`:

```javascript
export const PERSONAL_INFO = {
  name: 'MD.Anwar hossen',
  title: 'Jr.Programmer',
  email: 'anwarhossendeveloper21@gmail.com',
  // ... other details
};
```

### Colors and Theme

Modify the Tailwind configuration in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      // ... custom colors
    },
  },
}
```

### Content Sections

Each section is a separate component in `src/components/`. Update the content by modifying the respective component files.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 🔧 Performance Optimizations

- Lazy loading for images
- Code splitting with React.lazy()
- Optimized bundle size with Vite
- CSS purging with Tailwind
- Efficient re-renders with React hooks

## 🚀 Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: anwarhossendeveloper21@gmail.com
- **LinkedIn**: [linkedin.com/in/anowar21](https://linkedin.com/in/anowar21)
- **GitHub**: [https://github.com/anwarhossen-dev](https://github.com/anwarhossen-dev)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Material Icons](https://fonts.google.com/icons) - Icon library
- [Font Awesome](https://fontawesome.com/) - Icon library

---

⭐ Star this repository if you found it helpful!