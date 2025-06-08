import fs from 'fs-extra';
import path from 'path';
import { ConfigParser } from './configParser.js';

export class RouterGenerator {
  static async init() {
    console.log('🔍 Checking project setup...\n');
    
    // 1. Check if package.json exists
    const packageJsonPath = 'package.json';
    if (!(await fs.pathExists(packageJsonPath))) {
      console.log('❌ No package.json found! Run first: npm init -y');
      return;
    }

    // 2. Create example configuration file
    console.log('📝 Creating example configuration file...');
    await ConfigParser.createExampleConfig('routes.yaml');
    
    // 3. Create basic directory structure
    console.log('📁 Creating basic directory structure...');
    await fs.ensureDir('src');
    
    // 4. Create vite.config.js if it doesn't exist
    const viteConfigPath = 'vite.config.js';
    if (!(await fs.pathExists(viteConfigPath))) {
      console.log('⚡ Creating vite.config.js...');
      const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})`;
      await fs.writeFile(viteConfigPath, viteConfig);
    }

    // 5. Update package.json with scripts and type: "module"
    console.log('📦 Updating package.json...');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.type = 'module';
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    };
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    
    console.log('\n✅ Project initialized successfully!');
    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Edit routes.yaml - customize routing to your needs');
    console.log('2. Run: npx rr-generate generate');
    console.log('3. Install Vite: npm install -D vite @vitejs/plugin-react');
    console.log('4. Start development: npm run dev');
    console.log('\n💡 TIP: Check routes.yaml for examples of different project structures!');
  }

  static async generateRouter(config) {
    console.log('🔗 Generating main router...');
    
    // Generate App.jsx
    await this.generateAppComponent(config);
    
    // Generate main.jsx
    await this.generateMainFile();
    
    console.log('✅ Router generated!');
  }

  static async generateAppComponent(config) {
    const imports = this.generateImports(config.routes);
    const routes = this.generateRoutes(config.routes, 2);
    const navigationLinks = this.generateNavigationFromConfig(config.routes);
    
    const appCode = `import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Component imports
${imports}

// Main navigation
function Navigation() {
  return (
    <nav style={{ padding: '20px', backgroundColor: '#333', marginBottom: '20px' }}>
      ${navigationLinks}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
          <Routes>
${routes}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;`;

    await fs.writeFile(path.join('src', 'App.jsx'), appCode);
  }

  static generateNavigationFromConfig(routes) {
    const mainRoutes = routes.filter(route => !route.path.includes(':'));
    return mainRoutes.map(route => {
      const displayName = route.component;
      const linkPath = route.path === '/' ? '/' : (route.path.startsWith('/') ? route.path : `/${route.path}`);
      return `<Link to="${linkPath}" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>${displayName}</Link>`;
    }).join('\n        ');
  }

  static generateImports(routes) {
    const imports = [];
    
    const addImports = (routeList) => {
      routeList.forEach(route => {
        imports.push(`const ${route.component} = React.lazy(() => import('./components/${route.component}/${route.component}'));`);
        if (route.children) {
          addImports(route.children);
        }
      });
    };
    
    addImports(routes);
    return imports.join('\n');
  }

  static generateRoutes(routes, indent, parentPath = '') {
    const spaces = '  '.repeat(indent);
    let allRoutes = [];
    
    routes.forEach(route => {
      let fullPath = parentPath + route.path;
      if (route.path === '/' && parentPath === '') {
        fullPath = '/';
      } else if (!fullPath.startsWith('/')) {
        fullPath = '/' + fullPath;
      }
      
      allRoutes.push(`${spaces}<Route path="${fullPath}" element={<${route.component} />} />`);
      
      if (route.children && route.children.length > 0) {
        const childPath = route.path === '/' ? '' : route.path;
        const childRoutes = this.generateRoutes(route.children, indent, parentPath + childPath + '/');
        allRoutes = allRoutes.concat(childRoutes);
      }
    });
    
    return allRoutes.join('\n');
  }

  static async generateMainFile() {
    const mainCode = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

    await fs.writeFile(path.join('src', 'main.jsx'), mainCode);
  }
}