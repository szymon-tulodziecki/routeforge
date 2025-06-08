#!/usr/bin/env node
import { Command } from 'commander';
import { DependencyInstaller } from '../core/dependencyInstaller.js';
import { ConfigParser } from '../core/configParser.js';
import { FileGenerator } from '../core/fileGenerator.js';
import { RouterGenerator } from '../core/routerGenerator.js';

const program = new Command();

program
  .name('easyroutes')
  .description('🚀 Automatic React routing generator')
  .version('1.0.2');

program
  .command('init')
  .description('Initialize new project with example routes configuration')
  .action(async () => {
    try {
      console.log('🚀 Initializing EasyRoutes project...\n');
      await RouterGenerator.init();
    } catch (error) {
      console.error('\n❌ Error during initialization:', error.message);
      process.exit(1);
    }
  });

program
  .command('generate')
  .argument('[config]', 'Path to configuration file', 'routes.yaml')
  .description('Generate routing structure from config file')
  .action(async (configPath) => {
    try {
      console.log('🚀 Starting routing generation...\n');
      
      // STEP 1: Install required packages
      console.log('=== STEP 1: Installing dependencies ===');
      await DependencyInstaller.checkAndInstall();
      await DependencyInstaller.createIndexHtml();
      
      // STEP 2: Parse configuration
      console.log('\n=== STEP 2: Parsing configuration ===');
      const config = await ConfigParser.parse(configPath);
      console.log('✅ Configuration loaded!');
      
      // STEP 3: Generate file structure
      console.log('\n=== STEP 3: Generating components ===');
      await FileGenerator.generateStructure(config);
      
      // STEP 4: Generate router
      console.log('\n=== STEP 4: Generating router ===');
      await RouterGenerator.generateRouter(config);
      
      console.log('\n🎉 DONE! Routing generated successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. npm install -D vite @vitejs/plugin-react');
      console.log('   2. npm run dev');
      console.log('   3. Edit components in src/components/');
      
    } catch (error) {
      console.error('\n❌ Error during generation:', error.message);
      process.exit(1);
    }
  });

program.parse();
