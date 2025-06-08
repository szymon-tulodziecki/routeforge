# 🚀 routeforge

**Stop writing React Router boilerplate. Generate a complete routing structure from YAML configuration in seconds.**

<div align="center">
  <p>
    <a href="https://badge.fury.io/js/routeforge">
        <img src="https://badge.fury.io/js/routeforge.svg" alt="npm version" />
    </a>
    <a href="https://github.com/szymon-tulodziecki/routeforge">
        <img src="https://img.shields.io/github/stars/szymon-tulodziecki/routeforge.svg?style=social" alt="GitHub stars" />
    </a>
    <a href="https://www.npmjs.com/package/routeforge">
        <img src="https://img.shields.io/npm/dm/routeforge.svg?style=flat-square&color=blue" alt="npm downloads" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
    </a>
    <a href="https://reactjs.org/">
        <img src="https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white" alt="React" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
        <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
    </a>
    <a href="https://reactjs.org/docs/introducing-jsx.html">
        <img src="https://img.shields.io/badge/JSX-Supported-61DAFB?logo=react&logoColor=white" alt="JSX" />
    </a>
    <a href="https://vitejs.dev/">
        <img src="https://img.shields.io/badge/Vite-Ready-646CFF?logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://reactrouter.com/">
        <img src="https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white" alt="React Router" />
    </a>
    <a href="https://yaml.org/">
        <img src="https://img.shields.io/badge/YAML-Config-CB171E?logo=yaml&logoColor=white" alt="YAML" />
    </a>
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white" alt="Node.js" />
    </a>
    <a href="https://github.com/szymon-tulodziecki/routeforge">
        <img src="https://img.shields.io/badge/CLI-Tool-000000?logo=windows-terminal&logoColor=white" alt="CLI" />
    </a>
  </p>
</div>

## 🎯 Why routeforge?

**Before routeforge** (30+ minutes of boilerplate):
```javascript
// Manually creating 20+ files...
// Setting up React Router...
// Writing repetitive component code...
// Configuring navigation...
// Testing routing structure...
```

**With routeforge** (30 seconds):
```bash
npx routeforge init        # Creates YAML config with examples
npx routeforge generate    # Generates complete React app
npm run dev                # Ready to code features!
```

## ✨ Features That Save Hours

- 🔧 **Zero Configuration** – Works out of the box with Vite
- ⚛️ **Smart Component Generation** – Creates React components with proper structure
- 🏗️ **Nested Routing Support** – Handles complex routing hierarchies
- 📝 **YAML Configuration** – Human-readable, version-controllable
- 🎯 **Multiple Templates** – E-commerce, Blog, Portfolio, SaaS ready
- ⚡ **Automatic Dependencies** – Installs and configures everything
- 🧭 **Navigation Generation** – Creates working navigation between routes
- 🎨 **Clean Code Output** – Follows React best practices

## 🚀 Quick Start

### 1. Install
```bash
npm install routeforge
```

### 2. Initialize Project
```bash
npx routeforge init
```

This creates `routes.yaml` with multiple project templates:

### 3. Choose Your Template

**🏪 E-commerce Store:**
```yaml
routes:
  - path: "/"
    component: "Shop"
    children:
      - path: "products"
        component: "Products"
        children:
          - path: ":productId"
            component: "ProductDetail"
      - path: "cart"
        component: "Cart"
      - path: "checkout"
        component: "Checkout"
```

**📝 Blog Platform:**
```yaml
routes:
  - path: "/"
    component: "Blog"
    children:
      - path: "posts"
        component: "Posts"
        children:
          - path: ":slug"
            component: "PostDetail"
      - path: "categories"
        component: "Categories"
      - path: "about"
        component: "About"
```

**💼 Portfolio Site:**
```yaml
routes:
  - path: "/"
    component: "Portfolio"
    children:
      - path: "projects"
        component: "Projects"
        children:
          - path: ":projectId"
            component: "ProjectDetail"
      - path: "about"
        component: "About"
      - path: "contact"
        component: "Contact"
```

### 4. Generate & Run
```bash
npx routeforge generate                  # Generate components
npm install -D vite @vitejs/plugin-react # Install dev dependencies
npm run dev                              # Start development server
```

## 📁 Generated Structure

```
your-project/
├── src/
│   ├── App.jsx                 # Main router with navigation
│   ├── main.jsx                # Application entry point
│   └── components/
│       ├── Shop/
│       │   └── Shop.jsx        # Clean, functional components
│       ├── Products/
│       │   └── Products.jsx    # With navigation to children
│       ├── ProductDetail/
│       │   └── ProductDetail.jsx # Dynamic route handling
│       └── Cart/
│           └── Cart.jsx
├── routes.yaml                 # Your routing configuration
├── vite.config.js              # Vite configuration
└── index.html                  # HTML template
```

## 🎯 Real-World Examples

### **Complex E-commerce Application**
```yaml
routes:
  - path: "/"
    component: "MainLayout"
    children:
      - path: ""
        component: "Home"
      - path: "shop"
        component: "ShopLayout"
        children:
          - path: "products"
            component: "Products"
            children:
              - path: ":productId"
                component: "ProductDetail"
          - path: "categories/:categorySlug"
            component: "Category"
          - path: "cart"
            component: "Cart"
          - path: "checkout"
            component: "Checkout"
      - path: "account"
        component: "AccountLayout"
        children:
          - path: "profile"
            component: "Profile"
          - path: "orders"
            component: "Orders"
            children:
              - path: ":orderId"
                component: "OrderDetail"
      - path: "admin"
        component: "AdminLayout"
        children:
          - path: ""
            component: "AdminDashboard"
          - path: "products"
            component: "AdminProducts"
          - path: "users"
            component: "UserManagement"
      - path: "*"
        component: "NotFound"
```

**Result:** Complete e-commerce application with 15+ components, admin panel, user accounts, and proper 404 handling.

### **Multi-language Blog**
```yaml
routes:
  - path: "/"
    component: "BlogLayout"
    children:
      - path: ""
        component: "BlogHome"
      - path: "category/:categorySlug"
        component: "Category"
      - path: "post/:postSlug"
        component: "PostDetail"
      - path: "archive/:year/:month"
        component: "Archive"
      - path: "author/:authorId"
        component: "AuthorProfile"
      - path: "search"
        component: "SearchResults"
```

**Result:** Professional blog platform with category filtering, archive browsing, and author profiles.

## 🔧 Advanced Configuration

### **Dynamic Routes**
```yaml
routes:
  - path: "/user/:userId"
    component: "UserProfile"
    children:
      - path: "posts/:postId"
        component: "UserPost"
      - path: "settings"
        component: "UserSettings"
```

### **Catch-All Routes**
```yaml
routes:
  - path: "/docs/*"
    component: "Documentation"
  - path: "*"
    component: "NotFound"
```

### **Index Routes**
```yaml
routes:
  - path: "/"
    component: "Layout"
    children:
      - path: ""          # Index route
        component: "Home"
      - path: "about"
        component: "About"
```

## 🎨 Generated Component Example

**Input YAML:**
```yaml
- path: "products"
  component: "Products"
  children:
    - path: ":productId"
      component: "ProductDetail"
```

**Generated `Products.jsx`:**
```javascript
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <nav>
        {/* Links to child routes */}
        <Link to=":productId">ProductDetail</Link>
      </nav>
      <div>
        This is the Products page
        {/* Add your content here */}
      </div>
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}
```

## 🚀 Use Cases

### **Rapid Prototyping**
```bash
# 30 seconds to working React app
npx routeforge init
# Edit routes.yaml for your needs
npx routeforge generate
npm run dev
```

### **Learning React Router**
- See best practices in action
- Understand nested routing patterns
- Learn proper component structure

### **Team Consistency**
- Standardized routing patterns
- Consistent component structure
- Version-controlled configuration

### **Project Scaffolding**
- Start with solid foundation
- Focus on business logic, not boilerplate
- Scale from simple to complex

## 📊 Performance & Quality

- ✅ **React 18 Compatible** – Uses latest React features
- ✅ **React Router v6** – Modern routing patterns
- ✅ **Code Splitting** – Lazy loading with Suspense
- ✅ **TypeScript Ready** – Clean component structure
- ✅ **SEO Friendly** – Proper route structure
- ✅ **Mobile Responsive** – Works on all devices

### **Quick Development Setup**
```bash
git clone https://github.com/szymon-tulodziecki/routeforge.git
cd routeforge
npm install
npm test
```

### **Feature Requests**
Have an idea? [Open an issue](https://github.com/szymon-tulodziecki/routeforge/issues) with the `enhancement` label.

## 🔗 Ecosystem

### **Works Great With:**
- ⚡ **Vite** – Lightning fast development
- 🎨 **Tailwind CSS** – Utility-first styling
- 🔄 **React Query** – Server state management
- 🐻 **Zustand** – Client state management
- 📱 **React Native** – Mobile development

### **Planned Integrations:**
- 🎨 **CSS Modules** – Automatic styling
- 📝 **TypeScript** – Type-safe components
- 🧪 **Testing** – Automated test generation
- 📱 **PWA** – Progressive web app features

## 🏷️ Keywords

`react` `router` `routing` `generator` `automation` `cli` `scaffold` `boilerplate` `vite` `yaml` `components` `navigation`

## 📄 License

MIT License – see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Router team for amazing routing library
- Vite team for blazing fast development experience
- Open source community for inspiration and feedback

---

**Made with ❤️ by [Szymon Tulodziecki](https://github.com/szymon-tulodziecki)**

*Transform your React development workflow today!*

```bash
npm install routeforge
npx routeforge init
# Your next React app starts here! 🚀
```

---