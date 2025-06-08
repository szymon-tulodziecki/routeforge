import fs from 'fs-extra';
import yaml from 'js-yaml';

export class ConfigParser {
  static async parse(configPath) {
    if (!fs.existsSync(configPath)) {
      console.log(`❌ Configuration file not found: ${configPath}`);
      console.log('💡 Run: npx rr-generate init');
      process.exit(1);
    }

    const content = fs.readFileSync(configPath, 'utf8');
    const ext = configPath.split('.').pop().toLowerCase();
    
    switch(ext) {
      case 'yaml':
      case 'yml':
        return yaml.load(content);
      case 'json':
        return JSON.parse(content);
      default:
        throw new Error(`Unsupported extension: ${ext}`);
    }
  }

  static async createExampleConfig(configPath) {
    const exampleConfig = `# 🚀 EasyRoutes Configuration File
# 
# Edit this file to customize routing for your needs!
# After editing, run: npx rr-generate generate
#
# 📖 Documentation: https://github.com/szymon-tulodziecki/EASYROUTES

# ===== EXAMPLES OF DIFFERENT STRUCTURES =====

# 🏪 E-COMMERCE STORE:
# routes:
#   - path: "/"
#     component: "Shop"
#     children:
#       - path: "products"
#         component: "Products"
#         children:
#           - path: ":productId"
#             component: "ProductDetail"
#       - path: "cart"
#         component: "Cart"
#       - path: "checkout"
#         component: "Checkout"

# 📝 BLOG:
# routes:
#   - path: "/"
#     component: "Blog"
#     children:
#       - path: "posts"
#         component: "Posts"
#         children:
#           - path: ":slug"
#             component: "PostDetail"
#       - path: "about"
#         component: "About"
#       - path: "contact"
#         component: "Contact"

# 💼 PORTFOLIO:
# routes:
#   - path: "/"
#     component: "Portfolio"
#     children:
#       - path: "projects"
#         component: "Projects"
#         children:
#           - path: ":projectId"
#             component: "ProjectDetail"
#       - path: "about"
#         component: "About"
#       - path: "contact"
#         component: "Contact"

# 🏢 COMPANY WEBSITE:
# routes:
#   - path: "/"
#     component: "Home"
#     children:
#       - path: "services"
#         component: "Services"
#         children:
#           - path: "web-development"
#             component: "WebDevelopment"
#           - path: "mobile-apps"
#             component: "MobileApps"
#       - path: "about"
#         component: "About"
#         children:
#           - path: "team"
#             component: "Team"
#           - path: "history"
#             component: "History"
#       - path: "contact"
#         component: "Contact"

# ===== YOUR CONFIGURATION =====
# Uncomment and customize one of the above structures or create your own:

routes:
  - path: "/"
    component: "Home"
    children:
      - path: "about"
        component: "About"
      - path: "contact"
        component: "Contact"
        children:
          - path: ":id"
            component: "ContactDetails"
  - path: "products"
    component: "Products"
    children:
      - path: ":productId"
        component: "ProductDetail"

# 💡 TIPS:
# - path: "/" = home page
# - path: "about" = /about
# - path: ":id" = dynamic parameter (e.g., /contact/123)
# - children = nested routes
# - component = React component name (PascalCase)
#
# 🔄 After editing this file, run: npx rr-generate generate
`;

    fs.writeFileSync(configPath, exampleConfig);
    console.log(`📝 Created example configuration file: ${configPath}`);
  }
}
