# Angular Portfolio Modernization & Vercel Migration Plan

## Project Overview
- **Current State**: Angular 7, Node 10.5, Heroku deployment
- **Target State**: Angular 18+, Node 20 LTS, Vercel deployment
- **Security Issues**: 113 vulnerabilities (20 critical, 54 high)
- **Estimated Time**: 4-6 hours

## Migration Checklist

### Phase 1: Backup & Preparation
- [x] Create full backup of current project
- [x] Create new branch `modernization-2025`
- [x] Document current functionality and routes
- [x] List all current features to preserve

### Phase 2: Incremental Angular Migration

#### Step 1: Angular 7 → 9
- [x] Update Angular CLI globally to v9
- [x] Run `ng update @angular/core@9 @angular/cli@9`
- [x] Update TypeScript to 3.8
- [x] Update RxJS to 6.5
- [x] Fix any Ivy renderer compatibility issues
- [x] Test application functionality

#### Step 2: Angular 9 → 12 (LTS)
- [x] Run `ng update @angular/core@12 @angular/cli@12`
- [x] Enable Ivy renderer in `tsconfig.json`
- [x] Update to TypeScript 4.3
- [x] Replace deprecated APIs
- [x] Update Angular Material if used
- [x] Test application functionality

#### Step 3: Angular 12 → 15
- [x] Run `ng update @angular/core@15 @angular/cli@15`
- [x] Update to TypeScript 4.8
- [x] Consider migrating to standalone components
- [x] Update RxJS to v7
- [x] Remove deprecated `--prod` flag, use `--configuration production`
- [x] Test application functionality

#### Step 4: Angular 15 → 18 (Current)
- [x] Run `ng update @angular/core@18 @angular/cli@18`
- [x] Update to TypeScript 5.4+
- [ ] Implement new control flow syntax (@if, @for, @switch)
- [x] Update to Node 20 LTS
- [x] Test application functionality

### Phase 3: Dependencies & Security

#### Update Core Dependencies
- [x] Update Bootstrap 4 → 5
  - [ ] Update CSS classes for Bootstrap 5 breaking changes
  - [ ] Update grid system usage
- [x] Remove `core-js` polyfills (not needed for modern browsers)
- [x] Update `zone.js` to latest
- [x] Update `tslib` to v2.x
- [x] Remove `xmlhttprequest-ssl` (security vulnerability)

#### Testing Framework Updates
- [ ] Replace Protractor with Cypress or Playwright
- [ ] Update Karma to latest
- [ ] Update Jasmine to latest
- [ ] Configure new e2e testing framework

#### Security Fixes
- [ ] Run `npm audit fix`
- [ ] Manually update packages that can't be auto-fixed
- [ ] Verify all critical vulnerabilities are resolved
- [ ] Document any remaining low-priority issues

### Phase 4: Code Modernization

#### Component Updates
- [ ] Convert to standalone components:
  - [ ] AboutComponent
  - [ ] ArtComponent
  - [ ] MusicComponent
  - [ ] DesignComponent
  - [ ] GamesComponent
  - [ ] DevComponent
  - [ ] CurriculumComponent
  - [ ] ContactComponent
- [ ] Remove AppModule if all components are standalone
- [ ] Update routing to use standalone components

#### Performance Optimizations
- [ ] Implement lazy loading for routes
- [ ] Add image optimization directives
- [ ] Remove unnecessary polyfills from `polyfills.ts`
- [ ] Configure budgets in `angular.json`
- [ ] Enable build optimization settings

#### Modern Angular Features
- [ ] Update to new control flow syntax in templates
- [ ] Consider implementing Signals (optional)
- [ ] Use built-in image optimization
- [ ] Update to inject() function instead of constructor injection

### Phase 5: Vercel Migration

#### Remove Heroku Configuration
- [x] Delete `server.js` (Express server)
- [x] Remove `engines` field from `package.json`
- [x] Remove `heroku-run-build-script` from `package.json`
- [x] Remove any Heroku-specific scripts

#### Configure for Vercel
- [x] Create `vercel.json` configuration:
  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "dist/portfolio"
        }
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/index.html"
      }
    ]
  }
  ```
- [ ] Update `package.json` scripts:
  - [ ] Change build script to `ng build --configuration production`
  - [ ] Add `vercel-build` script
- [ ] Configure output path in `angular.json`

#### Deploy to Vercel
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel` command for initial setup
- [ ] Connect GitHub repository
- [ ] Configure environment variables (if any)
- [ ] Set up custom domain (if needed)
- [ ] Configure automatic deployments from main branch

### Phase 6: Testing & Optimization

#### Functional Testing
- [ ] Test all routes work correctly
- [ ] Verify all images load properly
- [ ] Check responsive design on mobile devices
- [ ] Test all interactive features
- [ ] Verify contact form (if applicable)
- [ ] Check PDF downloads work

#### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Optimize images (convert to WebP where possible)
- [ ] Implement lazy loading for images
- [ ] Check bundle size is within budget
- [ ] Verify Time to First Byte (TTFB)
- [ ] Test Core Web Vitals

#### Progressive Web App (Optional)
- [ ] Add PWA support with `ng add @angular/pwa`
- [ ] Configure manifest.json
- [ ] Set up service worker
- [ ] Test offline functionality

#### CI/CD Setup
- [ ] Create `.github/workflows/ci.yml` for GitHub Actions
- [ ] Configure automated testing on PR
- [ ] Set up automated deployment to Vercel
- [ ] Add build status badges to README

### Phase 7: Documentation & Cleanup

#### Update Documentation
- [ ] Update README.md with new setup instructions
- [ ] Document new npm scripts
- [ ] Add deployment instructions for Vercel
- [ ] Update technology stack section
- [ ] Add contributing guidelines

#### Final Cleanup
- [ ] Remove old/unused dependencies
- [ ] Clean up commented code
- [ ] Update copyright years
- [ ] Remove console.log statements
- [ ] Optimize asset files

### Post-Migration Checklist
- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] All links work (internal and external)
- [ ] Images display properly
- [ ] Responsive design works on all devices
- [ ] Performance metrics are acceptable
- [ ] SEO meta tags are present
- [ ] Security vulnerabilities resolved
- [ ] Deployment to Vercel successful
- [ ] Custom domain configured (if applicable)

## Notes Section

### Known Issues to Address:
- 

### Decisions Made:
- 

### Resources:
- [Angular Update Guide](https://update.angular.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [Bootstrap 5 Migration](https://getbootstrap.com/docs/5.0/migration/)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)

## Progress Tracking
- **Started**: 
- **Completed**: 
- **Total Time Spent**: 
- **Blockers Encountered**: