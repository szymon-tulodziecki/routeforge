import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

export class DependencyInstaller {
  static requiredPackages = {
    dependencies: [
      'react-router-dom@^6.22.0'
    ],
    devDependencies: [
      'js-yaml@^4.1.0'
    ]
  };

  static async checkAndInstall() {
    console.log('🔍 Checking required packages...');
    
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    let packageJson = {};
    
    if (fs.existsSync(packageJsonPath)) {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } else {
      console.log('❌ No package.json found! Run first: npm init');
      process.exit(1);
    }

    // Check and install dependencies
    const missingDeps = this.getMissingPackages(
      packageJson.dependencies || {}, 
      this.requiredPackages.dependencies
    );

    const missingDevDeps = this.getMissingPackages(
      packageJson.devDependencies || {}, 
      this.requiredPackages.devDependencies
    );

    // Install missing packages
    if (missingDeps.length > 0) {
      console.log(`📦 Installing: ${missingDeps.join(', ')}`);
      execSync(`npm install ${missingDeps.join(' ')}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    }

    if (missingDevDeps.length > 0) {
      console.log(`🔧 Installing dev deps: ${missingDevDeps.join(', ')}`);
      execSync(`npm install -D ${missingDevDeps.join(' ')}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    }

    if (missingDeps.length === 0 && missingDevDeps.length === 0) {
      console.log('✅ All required packages already installed!');
    } else {
      console.log('✅ Installation completed successfully!');
    }
  }

  static getMissingPackages(installed, required) {
    return required.filter(pkg => {
      const [name] = pkg.split('@');
      return !installed[name];
    });
  }

  static async createIndexHtml() {
    const indexPath = path.join(process.cwd(), 'index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.log('📄 Creating index.html...');
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Router App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
      
      fs.writeFileSync(indexPath, htmlContent);
    }
  }
}
