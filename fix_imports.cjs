const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Define where each component lives now
const componentMap = {
  AboutPage: 'pages',
  ContactPage: 'pages',
  MyMediaPage: 'pages',
  ProjectsPage: 'pages',
  ResumePage: 'pages',
  AboutSection: 'sections',
  ContactSection: 'sections',
  HeroSection: 'sections',
  ProjectsSection: 'sections',
  StorySection: 'sections',
  TechStackSection: 'sections',
  PortfolioLayout: 'layout',
  Navbar: 'layout',
  ThemeSwitcher: 'layout',
  LoadingIntro: 'ui',
  Masonry: 'ui',
  ProjectModal: 'ui',
  SplashCursor: 'ui',
  SpaceBackground: 'ui',
  ParticleText: 'ui',
  RibbonTransition: 'ui',
  MailboxGraphic: 'ui'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // 1. Fix asset imports in TSX/JSX/CSS
      const relativeToSrc = path.relative(srcDir, fullPath);
      const depth = relativeToSrc.split(path.sep).length;
      
      if (depth === 3 && fullPath.includes('components')) {
        // Change '../assets' to '../../assets'
        if (content.includes('../assets')) {
          content = content.replace(/\.\.\/assets/g, '../../assets');
          modified = true;
        }
      }

      // 2. Fix TSX/JSX component imports
      if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
        const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
        
        content = content.replace(importRegex, (match, importPath) => {
          if (importPath.startsWith('.') && !importPath.includes('assets') && !importPath.endsWith('.css')) {
            const componentName = importPath.split('/').pop();
            if (componentMap[componentName]) {
              const targetFolder = componentMap[componentName];
              
              let newPath = '';
              if (depth === 1) { // App.tsx
                newPath = `./components/${targetFolder}/${componentName}`;
              } else if (depth === 3) { // Inside a subfolder
                const currentFolder = relativeToSrc.split(path.sep)[1];
                if (currentFolder === targetFolder) {
                  newPath = `./${componentName}`;
                } else {
                  newPath = `../${targetFolder}/${componentName}`;
                }
              }
              
              if (newPath && newPath !== importPath) {
                modified = true;
                return match.replace(importPath, newPath);
              }
            }
          }
          return match;
        });

        // Also fix CSS imports for components (e.g. import './AboutSection.css')
        const cssImportRegex = /import\s+['"]([^'"]+\.css)['"]/g;
        content = content.replace(cssImportRegex, (match, importPath) => {
          if (importPath.startsWith('.')) {
            const cssName = importPath.split('/').pop().replace('.css', '');
            if (componentMap[cssName]) {
              const targetFolder = componentMap[cssName];
              let newPath = '';
              if (depth === 1) {
                newPath = `./components/${targetFolder}/${cssName}.css`;
              } else if (depth === 3) {
                const currentFolder = relativeToSrc.split(path.sep)[1];
                if (currentFolder === targetFolder) {
                  newPath = `./${cssName}.css`;
                } else {
                  newPath = `../${targetFolder}/${cssName}.css`;
                }
              }
              if (newPath && newPath !== importPath) {
                modified = true;
                return match.replace(importPath, newPath);
              }
            }
          }
          return match;
        });
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${relativeToSrc}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Import fix script completed.');
