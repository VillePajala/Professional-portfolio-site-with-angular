# Portfolio of Ville Pajala

A professional portfolio to showcase some of the things that I have done over the years. Site is now live at [www.villepajala.com](https://www.villepajala.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VillePajala/Professional-portfolio-site-with-angular)

## ✨ Features

* **Fully Responsive** - Optimized for different screen sizes
* **Animated menus** - Smooth transitions and interactions
* **Animated page load** - Enhanced user experience
* **Active page indicator** - Menu shows current page with icon
* **Accordion navigation** - Organized content sections
* **Modern Architecture** - Built with Angular 18 and Bootstrap 5
* **Continuous Deployment** - Automated deployment with Vercel

## 🚀 Tech Stack

* **Angular 18** - Latest stable version
* **TypeScript 5.4+** - Type-safe development
* **Bootstrap 5** - Modern responsive framework
* **RxJS 7** - Reactive programming
* **Vercel** - Modern deployment platform
* **Node.js 20+** - Latest LTS runtime

## 📋 Prerequisites

* **Node.js** 20.0.0 or higher
* **npm** 10.0.0 or higher
* **Angular CLI** 18+ (install globally: `npm install -g @angular/cli`)

## 🛠️ Development Setup

### Clone and Install
```bash
git clone https://github.com/VillePajala/Professional-portfolio-site-with-angular.git
cd Professional-portfolio-site-with-angular
npm install
```

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload when you change source files.

### Code Generation
```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 🏗️ Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

Build artifacts are stored in the `dist/Portfolio/` directory.

## 🧪 Testing

### Unit Tests
```bash
ng test
```
Executes unit tests via [Karma](https://karma-runner.github.io).

### Code Quality
Modern linting and formatting tools are configured for code quality.

## 🚀 Deployment

### Automatic Deployment
This project is configured for automatic deployment to Vercel:
- Push to `master` branch triggers automatic deployment
- Pull requests create preview deployments

### Manual Deployment
```bash
npm install -g vercel
vercel --prod
```

### Build Configuration
The project includes optimized build settings:
- **Bundle size**: ~123KB gzipped
- **Build time**: ~9 seconds
- **Tree shaking** and **minification** enabled

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # About page component
│   ├── art/            # Art portfolio component
│   ├── contact/        # Contact page component
│   ├── curriculum/     # CV/Resume component
│   ├── design/         # Design portfolio component
│   ├── dev/            # Development portfolio component
│   ├── games/          # Games portfolio component
│   ├── music/          # Music portfolio component
│   └── app.module.ts   # Root module
├── assets/             # Static assets (images, PDFs)
└── styles.css         # Global styles
```

## 🔄 Migration History

This project was successfully migrated from:
- **Angular 7** → **Angular 18** (complete modernization)
- **Node 10** → **Node 20+**
- **Bootstrap 4** → **Bootstrap 5**
- **Heroku** → **Vercel** deployment
- **113 security vulnerabilities** → **11** (92% improvement)

See [Migration Documentation](.docs/MIGRATION_PLAN.md) for detailed migration steps.

## 🐛 Known Issues

- One Bootstrap 5 CSS selector warning (non-blocking)
- Some development-only dependency warnings (don't affect production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Help

For Angular CLI help:
```bash
ng help
```

For more information, visit the [Angular CLI Documentation](https://angular.io/cli).

---

**Built with ❤️ using Angular 18**