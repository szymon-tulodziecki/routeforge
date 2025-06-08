import fs from 'fs-extra';
import path from 'path';

export class FileGenerator {
  static async generateStructure(config) {
    console.log('📁 Generating directory structure...');
    
    // Create main src directory
    await fs.ensureDir('src');
    await fs.ensureDir('src/components');
    
    // Generate components
    await this.generateComponents(config.routes);
    
    console.log('✅ Directory structure created!');
  }

  static async generateComponents(routes, parentPath = '') {
    for (const route of routes) {
      await this.createComponent(route, parentPath);
      
      if (route.children) {
        await this.generateComponents(route.children, route.path);
      }
    }
  }

  static async createComponent(route, parentPath) {
    const componentDir = path.join('src', 'components', route.component);
    await fs.ensureDir(componentDir);
    
    const componentPath = path.join(componentDir, `${route.component}.jsx`);
    
    // Don't overwrite existing components
    if (fs.existsSync(componentPath)) {
      console.log(`⚠️  Component ${route.component} already exists - skipping`);
      return;
    }

    const navigationLinks = this.generateNavigationLinks(route);
    
    const componentCode = `import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function ${route.component}() {
  return (
    <div>
      <h1>${route.component}</h1>
      ${navigationLinks ? `
      <nav style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5' }}>
        ${navigationLinks}
      </nav>` : ''}
      
      <div>
        <p>This is the ${route.component} page</p>
        {/* Add your content here */}
      </div>
      
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}`;

    fs.writeFileSync(componentPath, componentCode);
    console.log(`✅ Created component: ${route.component}`);
  }

  static generateNavigationLinks(route) {
    if (!route.children || route.children.length === 0) {
      return null;
    }

    return route.children
      .filter(child => !child.path.includes(':')) // Skip parameterized paths
      .map(child => `<Link to="${child.path}" style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>${child.component}</Link>`)
      .join('\n        ');
  }
}
