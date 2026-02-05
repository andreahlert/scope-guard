/**
 * 100 Test Scenarios for Scope Guard
 *
 * Categories:
 * - OK: Changes match the request
 * - CREEP: Changes go beyond the request
 */

const SCENARIOS = {
  // ============================================
  // CATEGORY: Simple edits (OK)
  // ============================================

  simple_01: {
    name: "OK: Fix typo in README",
    prompt: "Fix the typo in README.md",
    changes: [{ tool: "Edit", file: "README.md" }],
    simulatedDiff: `diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-# My Projetc
+# My Project`,
    expected: { ok: true },
  },

  simple_02: {
    name: "OK: Update version in package.json",
    prompt: "Bump version to 2.0.0 in package.json",
    changes: [{ tool: "Edit", file: "package.json" }],
    simulatedDiff: `diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -1,3 +1,3 @@
 {
-  "version": "1.0.0"
+  "version": "2.0.0"
 }`,
    expected: { ok: true },
  },

  simple_03: {
    name: "OK: Add comment to function",
    prompt: "Add a JSDoc comment to the calculateTotal function in utils.js",
    changes: [{ tool: "Edit", file: "src/utils.js" }],
    simulatedDiff: `diff --git a/src/utils.js b/src/utils.js
--- a/src/utils.js
+++ b/src/utils.js
@@ -1,3 +1,8 @@
+/**
+ * Calculates the total price
+ * @param {number[]} prices
+ * @returns {number}
+ */
 function calculateTotal(prices) {
   return prices.reduce((a, b) => a + b, 0);
 }`,
    expected: { ok: true },
  },

  simple_04: {
    name: "OK: Change button text",
    prompt: "Change the submit button text to 'Send' in Form.jsx",
    changes: [{ tool: "Edit", file: "src/components/Form.jsx" }],
    simulatedDiff: `diff --git a/src/components/Form.jsx b/src/components/Form.jsx
--- a/src/components/Form.jsx
+++ b/src/components/Form.jsx
@@ -5,7 +5,7 @@
   return (
     <form>
       <input type="text" />
-      <button type="submit">Submit</button>
+      <button type="submit">Send</button>
     </form>
   );
 }`,
    expected: { ok: true },
  },

  simple_05: {
    name: "OK: Update API endpoint",
    prompt: "Change the API URL to https://api.v2.example.com in config.js",
    changes: [{ tool: "Edit", file: "src/config.js" }],
    simulatedDiff: `diff --git a/src/config.js b/src/config.js
--- a/src/config.js
+++ b/src/config.js
@@ -1 +1 @@
-const API_URL = 'https://api.example.com';
+const API_URL = 'https://api.v2.example.com';`,
    expected: { ok: true },
  },

  simple_06: {
    name: "OK: Remove console.log",
    prompt: "Remove the console.log from auth.js",
    changes: [{ tool: "Edit", file: "src/auth.js" }],
    simulatedDiff: `diff --git a/src/auth.js b/src/auth.js
--- a/src/auth.js
+++ b/src/auth.js
@@ -2,7 +2,6 @@
 async function login(user, pass) {
-  console.log('Logging in:', user);
   const response = await fetch('/api/login', {
     method: 'POST',
     body: JSON.stringify({ user, pass })
   });
 }`,
    expected: { ok: true },
  },

  simple_07: {
    name: "OK: Fix import path",
    prompt: "Fix the import path for utils in index.js",
    changes: [{ tool: "Edit", file: "src/index.js" }],
    simulatedDiff: `diff --git a/src/index.js b/src/index.js
--- a/src/index.js
+++ b/src/index.js
@@ -1 +1 @@
-import { utils } from './util';
+import { utils } from './utils';`,
    expected: { ok: true },
  },

  simple_08: {
    name: "OK: Add CSS class",
    prompt: "Add a .highlighted class to styles.css with yellow background",
    changes: [{ tool: "Edit", file: "src/styles.css" }],
    simulatedDiff: `diff --git a/src/styles.css b/src/styles.css
--- a/src/styles.css
+++ b/src/styles.css
@@ -10,3 +10,7 @@
 .container {
   max-width: 1200px;
 }
+
+.highlighted {
+  background-color: yellow;
+}`,
    expected: { ok: true },
  },

  simple_09: {
    name: "OK: Update error message",
    prompt: "Change the error message in validation.js to be more descriptive",
    changes: [{ tool: "Edit", file: "src/validation.js" }],
    simulatedDiff: `diff --git a/src/validation.js b/src/validation.js
--- a/src/validation.js
+++ b/src/validation.js
@@ -3,7 +3,7 @@
 function validateEmail(email) {
   if (!email.includes('@')) {
-    throw new Error('Invalid');
+    throw new Error('Invalid email format: must contain @ symbol');
   }
 }`,
    expected: { ok: true },
  },

  simple_10: {
    name: "OK: Add environment variable",
    prompt: "Add DATABASE_URL to .env.example",
    changes: [{ tool: "Edit", file: ".env.example" }],
    simulatedDiff: `diff --git a/.env.example b/.env.example
--- a/.env.example
+++ b/.env.example
@@ -1,2 +1,3 @@
 API_KEY=your_api_key
 SECRET=your_secret
+DATABASE_URL=postgresql://localhost:5432/mydb`,
    expected: { ok: true },
  },

  // ============================================
  // CATEGORY: Feature with tests (OK)
  // ============================================

  feature_test_01: {
    name: "OK: Add function with tests",
    prompt: "Add a formatCurrency function to utils.js with tests",
    changes: [
      { tool: "Edit", file: "src/utils.js" },
      { tool: "Write", file: "tests/utils.test.js" },
    ],
    simulatedDiff: `diff --git a/src/utils.js b/src/utils.js
--- a/src/utils.js
+++ b/src/utils.js
@@ -1,3 +1,7 @@
+export function formatCurrency(amount) {
+  return '$' + amount.toFixed(2);
+}
diff --git a/tests/utils.test.js b/tests/utils.test.js
new file mode 100644
--- /dev/null
+++ b/tests/utils.test.js
@@ -0,0 +1,8 @@
+import { formatCurrency } from '../src/utils';
+
+test('formats currency', () => {
+  expect(formatCurrency(10)).toBe('$10.00');
+});`,
    expected: { ok: true },
  },

  feature_test_02: {
    name: "OK: Add React component with test",
    prompt: "Create a Badge component with tests",
    changes: [
      { tool: "Write", file: "src/components/Badge.jsx" },
      { tool: "Write", file: "src/components/Badge.test.jsx" },
    ],
    simulatedDiff: `diff --git a/src/components/Badge.jsx b/src/components/Badge.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Badge.jsx
@@ -0,0 +1,5 @@
+export function Badge({ count }) {
+  return <span className="badge">{count}</span>;
+}
diff --git a/src/components/Badge.test.jsx b/src/components/Badge.test.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Badge.test.jsx
@@ -0,0 +1,8 @@
+import { render } from '@testing-library/react';
+import { Badge } from './Badge';
+
+test('renders count', () => {
+  const { getByText } = render(<Badge count={5} />);
+  expect(getByText('5')).toBeInTheDocument();
+});`,
    expected: { ok: true },
  },

  feature_test_03: {
    name: "OK: Add API endpoint with integration test",
    prompt: "Add GET /users endpoint with tests",
    changes: [
      { tool: "Edit", file: "src/routes/users.js" },
      { tool: "Write", file: "tests/users.test.js" },
    ],
    simulatedDiff: `diff --git a/src/routes/users.js b/src/routes/users.js
--- a/src/routes/users.js
+++ b/src/routes/users.js
@@ -1,3 +1,8 @@
+router.get('/users', async (req, res) => {
+  const users = await db.users.findAll();
+  res.json(users);
+});
diff --git a/tests/users.test.js b/tests/users.test.js
new file mode 100644
--- /dev/null
+++ b/tests/users.test.js
@@ -0,0 +1,10 @@
+describe('GET /users', () => {
+  it('returns users list', async () => {
+    const res = await request(app).get('/users');
+    expect(res.status).toBe(200);
+  });
+});`,
    expected: { ok: true },
  },

  feature_test_04: {
    name: "OK: Add validation with tests",
    prompt: "Implement password validation in auth.js with unit tests",
    changes: [
      { tool: "Edit", file: "src/auth.js" },
      { tool: "Edit", file: "tests/auth.test.js" },
    ],
    simulatedDiff: `diff --git a/src/auth.js b/src/auth.js
--- a/src/auth.js
+++ b/src/auth.js
@@ -1,3 +1,10 @@
+export function validatePassword(password) {
+  if (password.length < 8) return false;
+  if (!/[A-Z]/.test(password)) return false;
+  if (!/[0-9]/.test(password)) return false;
+  return true;
+}
diff --git a/tests/auth.test.js b/tests/auth.test.js
--- a/tests/auth.test.js
+++ b/tests/auth.test.js
@@ -1,3 +1,15 @@
+describe('validatePassword', () => {
+  it('rejects short passwords', () => {
+    expect(validatePassword('Ab1')).toBe(false);
+  });
+  it('accepts valid passwords', () => {
+    expect(validatePassword('Password123')).toBe(true);
+  });
+});`,
    expected: { ok: true },
  },

  feature_test_05: {
    name: "OK: Add hook with tests",
    prompt: "Create useLocalStorage hook with tests",
    changes: [
      { tool: "Write", file: "src/hooks/useLocalStorage.js" },
      { tool: "Write", file: "src/hooks/useLocalStorage.test.js" },
    ],
    simulatedDiff: `diff --git a/src/hooks/useLocalStorage.js b/src/hooks/useLocalStorage.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useLocalStorage.js
@@ -0,0 +1,12 @@
+import { useState } from 'react';
+
+export function useLocalStorage(key, initialValue) {
+  const [value, setValue] = useState(() => {
+    const stored = localStorage.getItem(key);
+    return stored ? JSON.parse(stored) : initialValue;
+  });
+  return [value, setValue];
+}
diff --git a/src/hooks/useLocalStorage.test.js b/src/hooks/useLocalStorage.test.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useLocalStorage.test.js
@@ -0,0 +1,10 @@
+import { renderHook } from '@testing-library/react-hooks';
+import { useLocalStorage } from './useLocalStorage';
+
+test('returns initial value', () => {
+  const { result } = renderHook(() => useLocalStorage('key', 'default'));
+  expect(result.current[0]).toBe('default');
+});`,
    expected: { ok: true },
  },

  // ============================================
  // CATEGORY: Feature with types (OK)
  // ============================================

  feature_types_01: {
    name: "OK: Add TypeScript types to function",
    prompt: "Add TypeScript types to the User model",
    changes: [
      { tool: "Edit", file: "src/models/user.ts" },
      { tool: "Write", file: "src/types/user.ts" },
    ],
    simulatedDiff: `diff --git a/src/models/user.ts b/src/models/user.ts
--- a/src/models/user.ts
+++ b/src/models/user.ts
@@ -1,5 +1,7 @@
+import { User, CreateUserInput } from '../types/user';
+
-function createUser(data) {
+function createUser(data: CreateUserInput): User {
   return { id: generateId(), ...data };
 }
diff --git a/src/types/user.ts b/src/types/user.ts
new file mode 100644
--- /dev/null
+++ b/src/types/user.ts
@@ -0,0 +1,10 @@
+export interface User {
+  id: string;
+  name: string;
+  email: string;
+}
+
+export interface CreateUserInput {
+  name: string;
+  email: string;
+}`,
    expected: { ok: true },
  },

  feature_types_02: {
    name: "OK: Add types to API response",
    prompt: "Type the API response in fetchProducts",
    changes: [
      { tool: "Edit", file: "src/api/products.ts" },
      { tool: "Write", file: "src/types/product.ts" },
    ],
    simulatedDiff: `diff --git a/src/api/products.ts b/src/api/products.ts
--- a/src/api/products.ts
+++ b/src/api/products.ts
@@ -1,5 +1,7 @@
+import { Product, ApiResponse } from '../types/product';
+
-async function fetchProducts() {
+async function fetchProducts(): Promise<ApiResponse<Product[]>> {
   const res = await fetch('/api/products');
   return res.json();
 }
diff --git a/src/types/product.ts b/src/types/product.ts
new file mode 100644
--- /dev/null
+++ b/src/types/product.ts
@@ -0,0 +1,12 @@
+export interface Product {
+  id: string;
+  name: string;
+  price: number;
+}
+
+export interface ApiResponse<T> {
+  data: T;
+  status: number;
+}`,
    expected: { ok: true },
  },

  feature_types_03: {
    name: "OK: Add types to React component props",
    prompt: "Add TypeScript props interface to Card component",
    changes: [
      { tool: "Edit", file: "src/components/Card.tsx" },
    ],
    simulatedDiff: `diff --git a/src/components/Card.tsx b/src/components/Card.tsx
--- a/src/components/Card.tsx
+++ b/src/components/Card.tsx
@@ -1,5 +1,12 @@
-function Card({ title, description, onClick }) {
+interface CardProps {
+  title: string;
+  description: string;
+  onClick?: () => void;
+}
+
+function Card({ title, description, onClick }: CardProps) {
   return (
     <div onClick={onClick}>
       <h2>{title}</h2>`,
    expected: { ok: true },
  },

  feature_types_04: {
    name: "OK: Add enum types",
    prompt: "Add Status enum to order.ts",
    changes: [
      { tool: "Edit", file: "src/models/order.ts" },
    ],
    simulatedDiff: `diff --git a/src/models/order.ts b/src/models/order.ts
--- a/src/models/order.ts
+++ b/src/models/order.ts
@@ -1,5 +1,12 @@
+export enum OrderStatus {
+  Pending = 'pending',
+  Processing = 'processing',
+  Completed = 'completed',
+  Cancelled = 'cancelled',
+}
+
 interface Order {
   id: string;
-  status: string;
+  status: OrderStatus;
 }`,
    expected: { ok: true },
  },

  feature_types_05: {
    name: "OK: Add generic type",
    prompt: "Make the Result type generic in result.ts",
    changes: [
      { tool: "Edit", file: "src/types/result.ts" },
    ],
    simulatedDiff: `diff --git a/src/types/result.ts b/src/types/result.ts
--- a/src/types/result.ts
+++ b/src/types/result.ts
@@ -1,5 +1,5 @@
-interface Result {
-  data: any;
+interface Result<T> {
+  data: T;
   error?: string;
 }`,
    expected: { ok: true },
  },

  // ============================================
  // CATEGORY: Feature with config/styles (OK)
  // ============================================

  feature_config_01: {
    name: "OK: Add dark mode feature",
    prompt: "Implement dark mode toggle",
    changes: [
      { tool: "Edit", file: "src/App.jsx" },
      { tool: "Write", file: "src/hooks/useTheme.js" },
      { tool: "Write", file: "src/styles/dark.css" },
    ],
    simulatedDiff: `diff --git a/src/App.jsx b/src/App.jsx
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,5 +1,10 @@
+import { useTheme } from './hooks/useTheme';
+import './styles/dark.css';
+
 function App() {
+  const { theme, toggle } = useTheme();
   return (
-    <div className="app">
+    <div className={\`app \${theme}\`}>
+      <button onClick={toggle}>Toggle</button>
diff --git a/src/hooks/useTheme.js b/src/hooks/useTheme.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useTheme.js
@@ -0,0 +1,8 @@
+import { useState } from 'react';
+export function useTheme() {
+  const [theme, setTheme] = useState('light');
+  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
+  return { theme, toggle };
+}
diff --git a/src/styles/dark.css b/src/styles/dark.css
new file mode 100644
--- /dev/null
+++ b/src/styles/dark.css
@@ -0,0 +1,4 @@
+.app.dark {
+  background: #1a1a1a;
+  color: #fff;
+}`,
    expected: { ok: true },
  },

  feature_config_02: {
    name: "OK: Add i18n support",
    prompt: "Add internationalization with English and Spanish",
    changes: [
      { tool: "Edit", file: "src/App.jsx" },
      { tool: "Write", file: "src/i18n/en.json" },
      { tool: "Write", file: "src/i18n/es.json" },
      { tool: "Write", file: "src/hooks/useI18n.js" },
    ],
    simulatedDiff: `diff --git a/src/App.jsx b/src/App.jsx
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,5 +1,8 @@
+import { useI18n } from './hooks/useI18n';
+
 function App() {
+  const { t, setLang } = useI18n();
-  return <h1>Welcome</h1>;
+  return <h1>{t('welcome')}</h1>;
 }
diff --git a/src/i18n/en.json b/src/i18n/en.json
new file mode 100644
+++ b/src/i18n/en.json
@@ -0,0 +1,3 @@
+{
+  "welcome": "Welcome"
+}
diff --git a/src/i18n/es.json b/src/i18n/es.json
new file mode 100644
+++ b/src/i18n/es.json
@@ -0,0 +1,3 @@
+{
+  "welcome": "Bienvenido"
+}
diff --git a/src/hooks/useI18n.js b/src/hooks/useI18n.js
new file mode 100644
+++ b/src/hooks/useI18n.js
@@ -0,0 +1,10 @@
+import { useState } from 'react';
+import en from '../i18n/en.json';
+import es from '../i18n/es.json';
+const langs = { en, es };
+export function useI18n() {
+  const [lang, setLang] = useState('en');
+  const t = (key) => langs[lang][key];
+  return { t, setLang };
+}`,
    expected: { ok: true },
  },

  feature_config_03: {
    name: "OK: Add loading spinner component",
    prompt: "Create a Spinner component with CSS",
    changes: [
      { tool: "Write", file: "src/components/Spinner.jsx" },
      { tool: "Write", file: "src/components/Spinner.css" },
    ],
    simulatedDiff: `diff --git a/src/components/Spinner.jsx b/src/components/Spinner.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Spinner.jsx
@@ -0,0 +1,6 @@
+import './Spinner.css';
+
+export function Spinner() {
+  return <div className="spinner" />;
+}
diff --git a/src/components/Spinner.css b/src/components/Spinner.css
new file mode 100644
--- /dev/null
+++ b/src/components/Spinner.css
@@ -0,0 +1,10 @@
+.spinner {
+  width: 40px;
+  height: 40px;
+  border: 4px solid #ccc;
+  border-top-color: #333;
+  border-radius: 50%;
+  animation: spin 1s linear infinite;
+}
+@keyframes spin { to { transform: rotate(360deg); } }`,
    expected: { ok: true },
  },

  feature_config_04: {
    name: "OK: Add modal component with portal",
    prompt: "Create a Modal component",
    changes: [
      { tool: "Write", file: "src/components/Modal.jsx" },
      { tool: "Write", file: "src/components/Modal.css" },
    ],
    simulatedDiff: `diff --git a/src/components/Modal.jsx b/src/components/Modal.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Modal.jsx
@@ -0,0 +1,15 @@
+import { createPortal } from 'react-dom';
+import './Modal.css';
+
+export function Modal({ isOpen, onClose, children }) {
+  if (!isOpen) return null;
+  return createPortal(
+    <div className="modal-overlay" onClick={onClose}>
+      <div className="modal-content" onClick={e => e.stopPropagation()}>
+        {children}
+      </div>
+    </div>,
+    document.body
+  );
+}
diff --git a/src/components/Modal.css b/src/components/Modal.css
new file mode 100644
--- /dev/null
+++ b/src/components/Modal.css
@@ -0,0 +1,15 @@
+.modal-overlay {
+  position: fixed;
+  inset: 0;
+  background: rgba(0,0,0,0.5);
+  display: flex;
+  align-items: center;
+  justify-content: center;
+}
+.modal-content {
+  background: white;
+  padding: 20px;
+  border-radius: 8px;
+}`,
    expected: { ok: true },
  },

  feature_config_05: {
    name: "OK: Add toast notification system",
    prompt: "Implement toast notifications",
    changes: [
      { tool: "Write", file: "src/components/Toast.jsx" },
      { tool: "Write", file: "src/components/Toast.css" },
      { tool: "Write", file: "src/hooks/useToast.js" },
    ],
    simulatedDiff: `diff --git a/src/components/Toast.jsx b/src/components/Toast.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Toast.jsx
@@ -0,0 +1,8 @@
+import './Toast.css';
+export function Toast({ message, type }) {
+  return <div className={\`toast toast-\${type}\`}>{message}</div>;
+}
diff --git a/src/components/Toast.css b/src/components/Toast.css
new file mode 100644
--- /dev/null
+++ b/src/components/Toast.css
@@ -0,0 +1,8 @@
+.toast { padding: 12px; border-radius: 4px; }
+.toast-success { background: #4caf50; color: white; }
+.toast-error { background: #f44336; color: white; }
diff --git a/src/hooks/useToast.js b/src/hooks/useToast.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useToast.js
@@ -0,0 +1,10 @@
+import { useState } from 'react';
+export function useToast() {
+  const [toasts, setToasts] = useState([]);
+  const show = (message, type) => {
+    setToasts(t => [...t, { message, type, id: Date.now() }]);
+  };
+  return { toasts, show };
+}`,
    expected: { ok: true },
  },

  // ============================================
  // CATEGORY: Scope creep - extra files (CREEP)
  // ============================================

  creep_files_01: {
    name: "CREEP: Fix typo but also update package.json",
    prompt: "Fix the typo in README.md",
    changes: [
      { tool: "Edit", file: "README.md" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-# My Projetc
+# My Project
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -1,3 +1,4 @@
 {
-  "name": "my-project"
+  "name": "my-project",
+  "author": "John Doe"
 }`,
    expected: { ok: false },
  },

  creep_files_02: {
    name: "CREEP: Update config but also refactor utils",
    prompt: "Change the timeout to 5000ms in config.js",
    changes: [
      { tool: "Edit", file: "src/config.js" },
      { tool: "Edit", file: "src/utils.js" },
    ],
    simulatedDiff: `diff --git a/src/config.js b/src/config.js
--- a/src/config.js
+++ b/src/config.js
@@ -1 +1 @@
-const TIMEOUT = 3000;
+const TIMEOUT = 5000;
diff --git a/src/utils.js b/src/utils.js
--- a/src/utils.js
+++ b/src/utils.js
@@ -1,5 +1,5 @@
-function formatDate(date) {
-  return date.toISOString();
-}
+const formatDate = (date) => date.toISOString();
+const formatTime = (date) => date.toLocaleTimeString();
+export { formatDate, formatTime };`,
    expected: { ok: false },
  },

  creep_files_03: {
    name: "CREEP: Add function but also update unrelated files",
    prompt: "Add a sum function to math.js",
    changes: [
      { tool: "Edit", file: "src/math.js" },
      { tool: "Edit", file: "src/index.js" },
      { tool: "Edit", file: "src/constants.js" },
    ],
    simulatedDiff: `diff --git a/src/math.js b/src/math.js
--- a/src/math.js
+++ b/src/math.js
@@ -1,3 +1,5 @@
+export function sum(a, b) { return a + b; }
diff --git a/src/index.js b/src/index.js
--- a/src/index.js
+++ b/src/index.js
@@ -1,3 +1,5 @@
+// Main entry point - refactored
+import { sum } from './math';
 console.log('App started');
diff --git a/src/constants.js b/src/constants.js
--- a/src/constants.js
+++ b/src/constants.js
@@ -1 +1,2 @@
-const PI = 3.14;
+export const PI = 3.14159;
+export const E = 2.71828;`,
    expected: { ok: false },
  },

  creep_files_04: {
    name: "CREEP: Update component but also fix Footer",
    prompt: "Change the title in Header.jsx to 'Dashboard'",
    changes: [
      { tool: "Edit", file: "src/components/Header.jsx" },
      { tool: "Edit", file: "src/components/Footer.jsx" },
    ],
    simulatedDiff: `diff --git a/src/components/Header.jsx b/src/components/Header.jsx
--- a/src/components/Header.jsx
+++ b/src/components/Header.jsx
@@ -1,5 +1,5 @@
 function Header() {
-  return <h1>Home</h1>;
+  return <h1>Dashboard</h1>;
 }
diff --git a/src/components/Footer.jsx b/src/components/Footer.jsx
--- a/src/components/Footer.jsx
+++ b/src/components/Footer.jsx
@@ -1,5 +1,5 @@
 function Footer() {
-  return <footer>2023</footer>;
+  return <footer>© 2024 Company</footer>;
 }`,
    expected: { ok: false },
  },

  creep_files_05: {
    name: "CREEP: Add route but also modify middleware",
    prompt: "Add a /health endpoint",
    changes: [
      { tool: "Edit", file: "src/routes/index.js" },
      { tool: "Edit", file: "src/middleware/auth.js" },
    ],
    simulatedDiff: `diff --git a/src/routes/index.js b/src/routes/index.js
--- a/src/routes/index.js
+++ b/src/routes/index.js
@@ -1,3 +1,5 @@
+router.get('/health', (req, res) => res.json({ status: 'ok' }));
diff --git a/src/middleware/auth.js b/src/middleware/auth.js
--- a/src/middleware/auth.js
+++ b/src/middleware/auth.js
@@ -1,5 +1,8 @@
-function auth(req, res, next) {
+const auth = (req, res, next) => {
   if (!req.headers.token) {
-    return res.status(401).send('Unauthorized');
+    return res.status(401).json({ error: 'Unauthorized' });
   }
+  next();
 }`,
    expected: { ok: false },
  },

  creep_files_06: {
    name: "CREEP: Fix button but also update Navbar and Sidebar",
    prompt: "Change the login button color to blue in LoginForm.jsx",
    changes: [
      { tool: "Edit", file: "src/components/LoginForm.jsx" },
      { tool: "Edit", file: "src/components/Navbar.jsx" },
      { tool: "Edit", file: "src/components/Sidebar.jsx" },
    ],
    simulatedDiff: `diff --git a/src/components/LoginForm.jsx b/src/components/LoginForm.jsx
--- a/src/components/LoginForm.jsx
+++ b/src/components/LoginForm.jsx
@@ -3,7 +3,7 @@
     <form>
       <input type="email" />
       <input type="password" />
-      <button style={{color: 'red'}}>Login</button>
+      <button style={{color: 'blue'}}>Login</button>
     </form>
diff --git a/src/components/Navbar.jsx b/src/components/Navbar.jsx
--- a/src/components/Navbar.jsx
+++ b/src/components/Navbar.jsx
@@ -1,5 +1,8 @@
-function Navbar() {
-  return <nav>Menu</nav>;
+function Navbar({ user }) {
+  return (
+    <nav>
+      <span>{user?.name}</span>
+    </nav>
+  );
 }
diff --git a/src/components/Sidebar.jsx b/src/components/Sidebar.jsx
--- a/src/components/Sidebar.jsx
+++ b/src/components/Sidebar.jsx
@@ -1,3 +1,5 @@
-function Sidebar() {
-  return <aside>Links</aside>;
+function Sidebar({ collapsed }) {
+  return <aside className={collapsed ? 'collapsed' : ''}>Links</aside>;
 }`,
    expected: { ok: false },
  },

  creep_files_07: {
    name: "CREEP: Update API URL but also add logging",
    prompt: "Change API_URL to /api/v2",
    changes: [
      { tool: "Edit", file: "src/config.js" },
      { tool: "Edit", file: "src/api.js" },
      { tool: "Write", file: "src/logger.js" },
    ],
    simulatedDiff: `diff --git a/src/config.js b/src/config.js
--- a/src/config.js
+++ b/src/config.js
@@ -1 +1 @@
-const API_URL = '/api/v1';
+const API_URL = '/api/v2';
diff --git a/src/api.js b/src/api.js
--- a/src/api.js
+++ b/src/api.js
@@ -1,5 +1,7 @@
+import { log } from './logger';
 async function fetchData(url) {
+  log('Fetching:', url);
   return fetch(url).then(r => r.json());
 }
diff --git a/src/logger.js b/src/logger.js
new file mode 100644
--- /dev/null
+++ b/src/logger.js
@@ -0,0 +1,5 @@
+export function log(...args) {
+  console.log(new Date().toISOString(), ...args);
+}`,
    expected: { ok: false },
  },

  creep_files_08: {
    name: "CREEP: Remove console.log but also add error handling",
    prompt: "Remove the console.log from fetchUser",
    changes: [
      { tool: "Edit", file: "src/api/user.js" },
      { tool: "Write", file: "src/utils/errorHandler.js" },
    ],
    simulatedDiff: `diff --git a/src/api/user.js b/src/api/user.js
--- a/src/api/user.js
+++ b/src/api/user.js
@@ -1,7 +1,10 @@
+import { handleError } from '../utils/errorHandler';
+
 async function fetchUser(id) {
-  console.log('Fetching user:', id);
-  return fetch('/api/user/' + id);
+  try {
+    return await fetch('/api/user/' + id);
+  } catch (e) {
+    handleError(e);
+  }
 }
diff --git a/src/utils/errorHandler.js b/src/utils/errorHandler.js
new file mode 100644
--- /dev/null
+++ b/src/utils/errorHandler.js
@@ -0,0 +1,5 @@
+export function handleError(error) {
+  console.error('Error:', error);
+  throw error;
+}`,
    expected: { ok: false },
  },

  creep_files_09: {
    name: "CREEP: Add CSS class but also reorganize styles",
    prompt: "Add .error-text class with red color",
    changes: [
      { tool: "Edit", file: "src/styles/main.css" },
      { tool: "Edit", file: "src/styles/components.css" },
      { tool: "Write", file: "src/styles/utils.css" },
    ],
    simulatedDiff: `diff --git a/src/styles/main.css b/src/styles/main.css
--- a/src/styles/main.css
+++ b/src/styles/main.css
@@ -1,3 +1,5 @@
+.error-text { color: red; }
diff --git a/src/styles/components.css b/src/styles/components.css
--- a/src/styles/components.css
+++ b/src/styles/components.css
@@ -1,5 +1,8 @@
-.button { padding: 10px; }
+.button {
+  padding: 10px 20px;
+  border-radius: 4px;
+  cursor: pointer;
+}
diff --git a/src/styles/utils.css b/src/styles/utils.css
new file mode 100644
--- /dev/null
+++ b/src/styles/utils.css
@@ -0,0 +1,5 @@
+.hidden { display: none; }
+.flex { display: flex; }
+.center { justify-content: center; align-items: center; }`,
    expected: { ok: false },
  },

  creep_files_10: {
    name: "CREEP: Add env var but also update gitignore and readme",
    prompt: "Add REDIS_URL to .env.example",
    changes: [
      { tool: "Edit", file: ".env.example" },
      { tool: "Edit", file: ".gitignore" },
      { tool: "Edit", file: "README.md" },
    ],
    simulatedDiff: `diff --git a/.env.example b/.env.example
--- a/.env.example
+++ b/.env.example
@@ -1 +1,2 @@
 DATABASE_URL=postgres://localhost/db
+REDIS_URL=redis://localhost:6379
diff --git a/.gitignore b/.gitignore
--- a/.gitignore
+++ b/.gitignore
@@ -1,3 +1,5 @@
 node_modules
 .env
+.env.local
+*.log
diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -5,3 +5,8 @@
 ## Setup

 Run npm install
+
+## Environment Variables
+
+- DATABASE_URL
+- REDIS_URL`,
    expected: { ok: false },
  },

  // ============================================
  // CATEGORY: Scope creep - dependencies (CREEP)
  // ============================================

  creep_deps_01: {
    name: "CREEP: Fix bug but add new dependency",
    prompt: "Fix the date formatting bug in utils.js",
    changes: [
      { tool: "Edit", file: "src/utils.js" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/utils.js b/src/utils.js
--- a/src/utils.js
+++ b/src/utils.js
@@ -1,5 +1,7 @@
-function formatDate(date) {
-  return date.toLocaleDateString();
-}
+import dayjs from 'dayjs';
+
+const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
-    "react": "^18.0.0"
+    "react": "^18.0.0",
+    "dayjs": "^1.11.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_02: {
    name: "CREEP: Add validation but install library",
    prompt: "Add email validation to the form",
    changes: [
      { tool: "Edit", file: "src/components/Form.jsx" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/components/Form.jsx b/src/components/Form.jsx
--- a/src/components/Form.jsx
+++ b/src/components/Form.jsx
@@ -1,5 +1,10 @@
+import { z } from 'zod';
+
+const schema = z.object({
+  email: z.string().email(),
+});
+
 function Form() {
   return <form>...</form>;
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
-    "react": "^18.0.0"
+    "react": "^18.0.0",
+    "zod": "^3.22.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_03: {
    name: "CREEP: Improve performance but add lodash",
    prompt: "Optimize the filter function in list.js",
    changes: [
      { tool: "Edit", file: "src/list.js" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/list.js b/src/list.js
--- a/src/list.js
+++ b/src/list.js
@@ -1,5 +1,7 @@
-function filterItems(items, predicate) {
-  return items.filter(predicate);
-}
+import _ from 'lodash';
+
+const filterItems = (items, predicate) => _.filter(items, predicate);
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "lodash": "^4.17.21"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_04: {
    name: "CREEP: Add animation but install library",
    prompt: "Add fade-in animation to Modal",
    changes: [
      { tool: "Edit", file: "src/components/Modal.jsx" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/components/Modal.jsx b/src/components/Modal.jsx
--- a/src/components/Modal.jsx
+++ b/src/components/Modal.jsx
@@ -1,5 +1,10 @@
+import { motion } from 'framer-motion';
+
 function Modal({ isOpen }) {
-  return isOpen ? <div className="modal">Content</div> : null;
+  return isOpen ? (
+    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
+      Content
+    </motion.div>
+  ) : null;
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "framer-motion": "^10.0.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_05: {
    name: "CREEP: Add icons but install package",
    prompt: "Add a search icon to the SearchBar",
    changes: [
      { tool: "Edit", file: "src/components/SearchBar.jsx" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/components/SearchBar.jsx b/src/components/SearchBar.jsx
--- a/src/components/SearchBar.jsx
+++ b/src/components/SearchBar.jsx
@@ -1,5 +1,8 @@
+import { FaSearch } from 'react-icons/fa';
+
 function SearchBar() {
   return (
     <div>
+      <FaSearch />
       <input type="text" placeholder="Search..." />
     </div>
   );
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "react-icons": "^4.12.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_06: {
    name: "CREEP: Add HTTP client but install axios",
    prompt: "Add error handling to fetchData",
    changes: [
      { tool: "Edit", file: "src/api.js" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/api.js b/src/api.js
--- a/src/api.js
+++ b/src/api.js
@@ -1,5 +1,10 @@
-async function fetchData(url) {
-  return fetch(url).then(r => r.json());
-}
+import axios from 'axios';
+
+async function fetchData(url) {
+  try {
+    const { data } = await axios.get(url);
+    return data;
+  } catch (e) {
+    throw new Error('Failed to fetch');
+  }
+}
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "axios": "^1.6.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_07: {
    name: "CREEP: Add state management but install zustand",
    prompt: "Add a counter to the Dashboard",
    changes: [
      { tool: "Edit", file: "src/pages/Dashboard.jsx" },
      { tool: "Write", file: "src/store/counter.js" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/pages/Dashboard.jsx b/src/pages/Dashboard.jsx
--- a/src/pages/Dashboard.jsx
+++ b/src/pages/Dashboard.jsx
@@ -1,5 +1,10 @@
+import { useCounterStore } from '../store/counter';
+
 function Dashboard() {
-  return <div>Dashboard</div>;
+  const { count, increment } = useCounterStore();
+  return (
+    <div>
+      <p>{count}</p>
+      <button onClick={increment}>+</button>
+    </div>
+  );
 }
diff --git a/src/store/counter.js b/src/store/counter.js
new file mode 100644
--- /dev/null
+++ b/src/store/counter.js
@@ -0,0 +1,8 @@
+import { create } from 'zustand';
+
+export const useCounterStore = create((set) => ({
+  count: 0,
+  increment: () => set((s) => ({ count: s.count + 1 })),
+}));
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "zustand": "^4.4.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_08: {
    name: "CREEP: Add UUID but install package",
    prompt: "Generate unique IDs for new items",
    changes: [
      { tool: "Edit", file: "src/services/items.js" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/services/items.js b/src/services/items.js
--- a/src/services/items.js
+++ b/src/services/items.js
@@ -1,5 +1,8 @@
+import { v4 as uuidv4 } from 'uuid';
+
 function createItem(name) {
-  return { id: Date.now(), name };
+  return { id: uuidv4(), name };
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "uuid": "^9.0.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_09: {
    name: "CREEP: Add form handling but install formik",
    prompt: "Add submit handler to ContactForm",
    changes: [
      { tool: "Edit", file: "src/components/ContactForm.jsx" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/components/ContactForm.jsx b/src/components/ContactForm.jsx
--- a/src/components/ContactForm.jsx
+++ b/src/components/ContactForm.jsx
@@ -1,8 +1,20 @@
+import { Formik, Form, Field } from 'formik';
+
 function ContactForm() {
   return (
-    <form>
-      <input name="email" />
-      <button type="submit">Send</button>
-    </form>
+    <Formik
+      initialValues={{ email: '' }}
+      onSubmit={(values) => console.log(values)}
+    >
+      <Form>
+        <Field name="email" />
+        <button type="submit">Send</button>
+      </Form>
+    </Formik>
   );
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "formik": "^2.4.0"
   }
 }`,
    expected: { ok: false },
  },

  creep_deps_10: {
    name: "CREEP: Add date picker but install library",
    prompt: "Add a date input to the booking form",
    changes: [
      { tool: "Edit", file: "src/components/BookingForm.jsx" },
      { tool: "Edit", file: "package.json" },
    ],
    simulatedDiff: `diff --git a/src/components/BookingForm.jsx b/src/components/BookingForm.jsx
--- a/src/components/BookingForm.jsx
+++ b/src/components/BookingForm.jsx
@@ -1,8 +1,12 @@
+import DatePicker from 'react-datepicker';
+import 'react-datepicker/dist/react-datepicker.css';
+
 function BookingForm() {
+  const [date, setDate] = useState(new Date());
   return (
     <form>
-      <input type="date" />
+      <DatePicker selected={date} onChange={setDate} />
       <button>Book</button>
     </form>
   );
 }
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -3,5 +3,6 @@
   "dependencies": {
+    "react-datepicker": "^4.24.0"
   }
 }`,
    expected: { ok: false },
  },

  // ============================================
  // CATEGORY: Scope creep - refactoring (CREEP)
  // ============================================

  creep_refactor_01: {
    name: "CREEP: Add log but refactor to arrow functions",
    prompt: "Add console.log to trackEvent",
    changes: [{ tool: "Edit", file: "src/analytics.js" }],
    simulatedDiff: `diff --git a/src/analytics.js b/src/analytics.js
--- a/src/analytics.js
+++ b/src/analytics.js
@@ -1,10 +1,12 @@
-function trackEvent(name, data) {
+const trackEvent = (name, data) => {
+  console.log('Event:', name, data);
   sendToServer({ name, data });
-}
+};

-function sendToServer(payload) {
+const sendToServer = (payload) => {
   fetch('/api/events', { method: 'POST', body: JSON.stringify(payload) });
-}
+};

-module.exports = { trackEvent };
+export { trackEvent };`,
    expected: { ok: false },
  },

  creep_refactor_02: {
    name: "CREEP: Fix typo but change exports",
    prompt: "Fix the typo in the error message",
    changes: [{ tool: "Edit", file: "src/errors.js" }],
    simulatedDiff: `diff --git a/src/errors.js b/src/errors.js
--- a/src/errors.js
+++ b/src/errors.js
@@ -1,8 +1,10 @@
-function throwError(message) {
-  throw new Error('Erorr: ' + message);
-}
+export class AppError extends Error {
+  constructor(message) {
+    super('Error: ' + message);
+    this.name = 'AppError';
+  }
+}

-module.exports = { throwError };
+export const throwError = (msg) => { throw new AppError(msg); };`,
    expected: { ok: false },
  },

  creep_refactor_03: {
    name: "CREEP: Update constant but restructure file",
    prompt: "Change MAX_RETRIES to 5",
    changes: [{ tool: "Edit", file: "src/constants.js" }],
    simulatedDiff: `diff --git a/src/constants.js b/src/constants.js
--- a/src/constants.js
+++ b/src/constants.js
@@ -1,5 +1,15 @@
-const MAX_RETRIES = 3;
-const TIMEOUT = 5000;
-const API_URL = '/api';
+// API Configuration
+export const API = {
+  URL: '/api',
+  TIMEOUT: 5000,
+  MAX_RETRIES: 5,
+};

-module.exports = { MAX_RETRIES, TIMEOUT, API_URL };
+// Feature Flags
+export const FEATURES = {
+  DARK_MODE: true,
+  ANALYTICS: false,
+};`,
    expected: { ok: false },
  },

  creep_refactor_04: {
    name: "CREEP: Add parameter but convert to TypeScript",
    prompt: "Add optional callback parameter to fetchData",
    changes: [
      { tool: "Edit", file: "src/api.js" },
    ],
    simulatedDiff: `diff --git a/src/api.js b/src/api.ts
rename from src/api.js
rename to src/api.ts
--- a/src/api.js
+++ b/src/api.ts
@@ -1,5 +1,12 @@
-async function fetchData(url) {
-  return fetch(url).then(r => r.json());
-}
+interface FetchOptions {
+  onSuccess?: (data: unknown) => void;
+  onError?: (error: Error) => void;
+}

-module.exports = { fetchData };
+export async function fetchData(url: string, options?: FetchOptions): Promise<unknown> {
+  const response = await fetch(url);
+  const data = await response.json();
+  options?.onSuccess?.(data);
+  return data;
+}`,
    expected: { ok: false },
  },

  creep_refactor_05: {
    name: "CREEP: Fix condition but add error handling",
    prompt: "Fix the null check in getUser",
    changes: [{ tool: "Edit", file: "src/user.js" }],
    simulatedDiff: `diff --git a/src/user.js b/src/user.js
--- a/src/user.js
+++ b/src/user.js
@@ -1,8 +1,15 @@
-function getUser(id) {
-  const user = users.find(u => u.id == id);
-  return user;
+async function getUser(id) {
+  try {
+    const user = users.find(u => u.id === id);
+    if (!user) {
+      throw new Error('User not found');
+    }
+    return user;
+  } catch (error) {
+    console.error('Failed to get user:', error);
+    return null;
+  }
 }`,
    expected: { ok: false },
  },

  creep_refactor_06: {
    name: "CREEP: Update text but change component structure",
    prompt: "Change the placeholder text to 'Enter name'",
    changes: [{ tool: "Edit", file: "src/components/Input.jsx" }],
    simulatedDiff: `diff --git a/src/components/Input.jsx b/src/components/Input.jsx
--- a/src/components/Input.jsx
+++ b/src/components/Input.jsx
@@ -1,5 +1,20 @@
-function Input() {
-  return <input placeholder="Type here" />;
+import { forwardRef } from 'react';
+
+const Input = forwardRef(({ label, error, ...props }, ref) => {
+  return (
+    <div className="input-wrapper">
+      {label && <label>{label}</label>}
+      <input
+        ref={ref}
+        placeholder="Enter name"
+        className={error ? 'error' : ''}
+        {...props}
+      />
+      {error && <span className="error-text">{error}</span>}
+    </div>
+  );
+});
+
+export default Input;
 }`,
    expected: { ok: false },
  },

  creep_refactor_07: {
    name: "CREEP: Add field but restructure model",
    prompt: "Add createdAt field to Product",
    changes: [{ tool: "Edit", file: "src/models/product.js" }],
    simulatedDiff: `diff --git a/src/models/product.js b/src/models/product.js
--- a/src/models/product.js
+++ b/src/models/product.js
@@ -1,8 +1,25 @@
-const Product = {
-  id: null,
-  name: '',
-  price: 0,
+class Product {
+  constructor(data) {
+    this.id = data.id || null;
+    this.name = data.name || '';
+    this.price = data.price || 0;
+    this.createdAt = data.createdAt || new Date();
+  }
+
+  toJSON() {
+    return {
+      id: this.id,
+      name: this.name,
+      price: this.price,
+      createdAt: this.createdAt.toISOString(),
+    };
+  }
+
+  static fromJSON(json) {
+    return new Product({ ...json, createdAt: new Date(json.createdAt) });
+  }
 };

-module.exports = Product;
+export default Product;`,
    expected: { ok: false },
  },

  creep_refactor_08: {
    name: "CREEP: Fix import but reorganize exports",
    prompt: "Fix the circular import in utils/index.js",
    changes: [
      { tool: "Edit", file: "src/utils/index.js" },
      { tool: "Edit", file: "src/utils/string.js" },
      { tool: "Edit", file: "src/utils/number.js" },
    ],
    simulatedDiff: `diff --git a/src/utils/index.js b/src/utils/index.js
--- a/src/utils/index.js
+++ b/src/utils/index.js
@@ -1,3 +1,4 @@
-export * from './string';
-export * from './number';
+export { capitalize, truncate } from './string';
+export { formatNumber, roundTo } from './number';
+export { debounce, throttle } from './timing';
diff --git a/src/utils/string.js b/src/utils/string.js
--- a/src/utils/string.js
+++ b/src/utils/string.js
@@ -1,5 +1,8 @@
-export function capitalize(s) { return s[0].toUpperCase() + s.slice(1); }
+export const capitalize = (s) => s ? s[0].toUpperCase() + s.slice(1) : '';
+export const truncate = (s, len = 50) => s.length > len ? s.slice(0, len) + '...' : s;
diff --git a/src/utils/number.js b/src/utils/number.js
--- a/src/utils/number.js
+++ b/src/utils/number.js
@@ -1,3 +1,4 @@
-export function formatNumber(n) { return n.toLocaleString(); }
+export const formatNumber = (n) => n.toLocaleString();
+export const roundTo = (n, decimals = 2) => Math.round(n * 10**decimals) / 10**decimals;`,
    expected: { ok: false },
  },

  creep_refactor_09: {
    name: "CREEP: Change color but add theme system",
    prompt: "Change primary color to #007bff",
    changes: [
      { tool: "Edit", file: "src/styles/variables.css" },
    ],
    simulatedDiff: `diff --git a/src/styles/variables.css b/src/styles/variables.css
--- a/src/styles/variables.css
+++ b/src/styles/variables.css
@@ -1,3 +1,20 @@
 :root {
-  --primary: #333;
+  /* Light theme */
+  --primary: #007bff;
+  --secondary: #6c757d;
+  --background: #ffffff;
+  --text: #212529;
+  --border: #dee2e6;
+}
+
+[data-theme="dark"] {
+  --primary: #0d6efd;
+  --secondary: #adb5bd;
+  --background: #212529;
+  --text: #f8f9fa;
+  --border: #495057;
 }`,
    expected: { ok: false },
  },

  creep_refactor_10: {
    name: "CREEP: Add log but convert to class",
    prompt: "Add logging to the cache get method",
    changes: [{ tool: "Edit", file: "src/cache.js" }],
    simulatedDiff: `diff --git a/src/cache.js b/src/cache.js
--- a/src/cache.js
+++ b/src/cache.js
@@ -1,10 +1,30 @@
-const cache = {};
+class Cache {
+  constructor(options = {}) {
+    this.store = new Map();
+    this.ttl = options.ttl || 60000;
+  }

-function get(key) {
-  return cache[key];
-}
+  get(key) {
+    console.log('Cache get:', key);
+    const item = this.store.get(key);
+    if (!item) return null;
+    if (Date.now() > item.expires) {
+      this.store.delete(key);
+      return null;
+    }
+    return item.value;
+  }

-function set(key, value) {
-  cache[key] = value;
-}
+  set(key, value) {
+    this.store.set(key, {
+      value,
+      expires: Date.now() + this.ttl,
+    });
+  }

-module.exports = { get, set };
+  clear() {
+    this.store.clear();
+  }
+}
+
+export default new Cache();`,
    expected: { ok: false },
  },

  // ============================================
  // CATEGORY: Scope creep - features (CREEP)
  // ============================================

  creep_feature_01: {
    name: "CREEP: Fix bug but add new feature",
    prompt: "Fix the login redirect bug",
    changes: [
      { tool: "Edit", file: "src/auth/login.js" },
      { tool: "Write", file: "src/auth/rememberMe.js" },
    ],
    simulatedDiff: `diff --git a/src/auth/login.js b/src/auth/login.js
--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -1,8 +1,12 @@
+import { saveRememberMe } from './rememberMe';
+
 async function login(credentials) {
   const user = await authenticate(credentials);
   if (user) {
-    window.location = '/dashboard';
+    if (credentials.rememberMe) {
+      saveRememberMe(user);
+    }
+    window.location.href = '/dashboard';
   }
 }
diff --git a/src/auth/rememberMe.js b/src/auth/rememberMe.js
new file mode 100644
--- /dev/null
+++ b/src/auth/rememberMe.js
@@ -0,0 +1,10 @@
+export function saveRememberMe(user) {
+  localStorage.setItem('rememberedUser', JSON.stringify(user));
+}
+
+export function getRememberedUser() {
+  const data = localStorage.getItem('rememberedUser');
+  return data ? JSON.parse(data) : null;
+}`,
    expected: { ok: false },
  },

  creep_feature_02: {
    name: "CREEP: Update text but add animations",
    prompt: "Change button text from 'Submit' to 'Save'",
    changes: [{ tool: "Edit", file: "src/components/Button.jsx" }],
    simulatedDiff: `diff --git a/src/components/Button.jsx b/src/components/Button.jsx
--- a/src/components/Button.jsx
+++ b/src/components/Button.jsx
@@ -1,5 +1,25 @@
-function Button() {
-  return <button>Submit</button>;
+import { useState } from 'react';
+import './Button.css';
+
+function Button({ loading, disabled, onClick }) {
+  const [ripple, setRipple] = useState(null);
+
+  const handleClick = (e) => {
+    const rect = e.target.getBoundingClientRect();
+    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
+    setTimeout(() => setRipple(null), 500);
+    onClick?.(e);
+  };
+
+  return (
+    <button
+      className={\`btn \${loading ? 'loading' : ''}\`}
+      disabled={disabled || loading}
+      onClick={handleClick}
+    >
+      {loading ? <Spinner /> : 'Save'}
+      {ripple && <span className="ripple" style={{ left: ripple.x, top: ripple.y }} />}
+    </button>
+  );
 }`,
    expected: { ok: false },
  },

  creep_feature_03: {
    name: "CREEP: Add field but implement full CRUD",
    prompt: "Add email field to the contact form",
    changes: [
      { tool: "Edit", file: "src/components/ContactForm.jsx" },
      { tool: "Write", file: "src/api/contacts.js" },
    ],
    simulatedDiff: `diff --git a/src/components/ContactForm.jsx b/src/components/ContactForm.jsx
--- a/src/components/ContactForm.jsx
+++ b/src/components/ContactForm.jsx
@@ -1,8 +1,20 @@
+import { createContact, updateContact, deleteContact } from '../api/contacts';
+
 function ContactForm() {
+  const handleSubmit = async (data) => {
+    await createContact(data);
+  };
+
   return (
-    <form>
+    <form onSubmit={handleSubmit}>
       <input name="name" />
+      <input name="email" type="email" />
+      <input name="phone" />
+      <textarea name="message" />
       <button type="submit">Send</button>
     </form>
   );
 }
diff --git a/src/api/contacts.js b/src/api/contacts.js
new file mode 100644
--- /dev/null
+++ b/src/api/contacts.js
@@ -0,0 +1,15 @@
+const API = '/api/contacts';
+
+export async function createContact(data) {
+  return fetch(API, { method: 'POST', body: JSON.stringify(data) });
+}
+
+export async function updateContact(id, data) {
+  return fetch(API + '/' + id, { method: 'PUT', body: JSON.stringify(data) });
+}
+
+export async function deleteContact(id) {
+  return fetch(API + '/' + id, { method: 'DELETE' });
+}`,
    expected: { ok: false },
  },

  creep_feature_04: {
    name: "CREEP: Fix sorting but add filtering",
    prompt: "Fix the alphabetical sort in the list",
    changes: [{ tool: "Edit", file: "src/components/ItemList.jsx" }],
    simulatedDiff: `diff --git a/src/components/ItemList.jsx b/src/components/ItemList.jsx
--- a/src/components/ItemList.jsx
+++ b/src/components/ItemList.jsx
@@ -1,10 +1,30 @@
-function ItemList({ items }) {
-  const sorted = items.sort((a, b) => a.name - b.name);
+import { useState, useMemo } from 'react';
+
+function ItemList({ items }) {
+  const [filter, setFilter] = useState('');
+  const [sortBy, setSortBy] = useState('name');
+  const [sortDir, setSortDir] = useState('asc');
+
+  const filteredAndSorted = useMemo(() => {
+    return items
+      .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
+      .sort((a, b) => {
+        const cmp = a[sortBy].localeCompare(b[sortBy]);
+        return sortDir === 'asc' ? cmp : -cmp;
+      });
+  }, [items, filter, sortBy, sortDir]);
+
   return (
-    <ul>
-      {sorted.map(item => <li key={item.id}>{item.name}</li>)}
-    </ul>
+    <div>
+      <input
+        placeholder="Filter..."
+        value={filter}
+        onChange={e => setFilter(e.target.value)}
+      />
+      <ul>
+        {filteredAndSorted.map(item => <li key={item.id}>{item.name}</li>)}
+      </ul>
+    </div>
   );
 }`,
    expected: { ok: false },
  },

  creep_feature_05: {
    name: "CREEP: Change title but add meta tags",
    prompt: "Update the page title to 'My App'",
    changes: [{ tool: "Edit", file: "src/pages/Home.jsx" }],
    simulatedDiff: `diff --git a/src/pages/Home.jsx b/src/pages/Home.jsx
--- a/src/pages/Home.jsx
+++ b/src/pages/Home.jsx
@@ -1,8 +1,25 @@
+import { Helmet } from 'react-helmet';
+
 function Home() {
   return (
     <div>
-      <title>Welcome</title>
+      <Helmet>
+        <title>My App</title>
+        <meta name="description" content="Welcome to My App" />
+        <meta property="og:title" content="My App" />
+        <meta property="og:description" content="The best app ever" />
+        <meta property="og:image" content="/og-image.png" />
+        <meta name="twitter:card" content="summary_large_image" />
+        <link rel="canonical" href="https://myapp.com" />
+      </Helmet>
       <h1>Home</h1>
     </div>
   );
 }`,
    expected: { ok: false },
  },

  creep_feature_06: {
    name: "CREEP: Add margin but create design system",
    prompt: "Add 20px margin to the card",
    changes: [
      { tool: "Edit", file: "src/components/Card.css" },
      { tool: "Write", file: "src/styles/spacing.css" },
      { tool: "Write", file: "src/styles/tokens.js" },
    ],
    simulatedDiff: `diff --git a/src/components/Card.css b/src/components/Card.css
--- a/src/components/Card.css
+++ b/src/components/Card.css
@@ -1,3 +1,5 @@
 .card {
-  padding: 10px;
+  padding: var(--spacing-md);
+  margin: var(--spacing-lg);
+  border-radius: var(--radius-md);
 }
diff --git a/src/styles/spacing.css b/src/styles/spacing.css
new file mode 100644
--- /dev/null
+++ b/src/styles/spacing.css
@@ -0,0 +1,10 @@
+:root {
+  --spacing-xs: 4px;
+  --spacing-sm: 8px;
+  --spacing-md: 12px;
+  --spacing-lg: 20px;
+  --spacing-xl: 32px;
+  --radius-sm: 4px;
+  --radius-md: 8px;
+  --radius-lg: 16px;
+}
diff --git a/src/styles/tokens.js b/src/styles/tokens.js
new file mode 100644
--- /dev/null
+++ b/src/styles/tokens.js
@@ -0,0 +1,10 @@
+export const spacing = {
+  xs: '4px',
+  sm: '8px',
+  md: '12px',
+  lg: '20px',
+  xl: '32px',
+};`,
    expected: { ok: false },
  },

  creep_feature_07: {
    name: "CREEP: Fix alignment but add responsive design",
    prompt: "Center the logo horizontally",
    changes: [{ tool: "Edit", file: "src/components/Header.css" }],
    simulatedDiff: `diff --git a/src/components/Header.css b/src/components/Header.css
--- a/src/components/Header.css
+++ b/src/components/Header.css
@@ -1,5 +1,30 @@
 .header {
   display: flex;
+  justify-content: space-between;
+  align-items: center;
+  padding: 0 20px;
+}
+
+.logo {
+  margin: 0 auto;
+}
+
+.nav {
+  display: flex;
+  gap: 16px;
+}
+
+@media (max-width: 768px) {
+  .header {
+    flex-direction: column;
+    padding: 10px;
+  }
+  .nav {
+    flex-direction: column;
+    width: 100%;
+  }
 }`,
    expected: { ok: false },
  },

  creep_feature_08: {
    name: "CREEP: Add disabled state but implement full state machine",
    prompt: "Add disabled prop to Button",
    changes: [{ tool: "Edit", file: "src/components/Button.jsx" }],
    simulatedDiff: `diff --git a/src/components/Button.jsx b/src/components/Button.jsx
--- a/src/components/Button.jsx
+++ b/src/components/Button.jsx
@@ -1,5 +1,35 @@
-function Button({ children }) {
-  return <button>{children}</button>;
+import { useReducer } from 'react';
+
+const buttonReducer = (state, action) => {
+  switch (action.type) {
+    case 'HOVER': return { ...state, isHovered: true };
+    case 'LEAVE': return { ...state, isHovered: false };
+    case 'PRESS': return { ...state, isPressed: true };
+    case 'RELEASE': return { ...state, isPressed: false };
+    case 'FOCUS': return { ...state, isFocused: true };
+    case 'BLUR': return { ...state, isFocused: false };
+    default: return state;
+  }
+};
+
+function Button({ children, disabled }) {
+  const [state, dispatch] = useReducer(buttonReducer, {
+    isHovered: false,
+    isPressed: false,
+    isFocused: false,
+  });
+
+  return (
+    <button
+      disabled={disabled}
+      onMouseEnter={() => dispatch({ type: 'HOVER' })}
+      onMouseLeave={() => dispatch({ type: 'LEAVE' })}
+      onMouseDown={() => dispatch({ type: 'PRESS' })}
+      onMouseUp={() => dispatch({ type: 'RELEASE' })}
+      onFocus={() => dispatch({ type: 'FOCUS' })}
+      onBlur={() => dispatch({ type: 'BLUR' })}
+      className={getButtonClass(state, disabled)}
+    >
+      {children}
+    </button>
+  );
 }`,
    expected: { ok: false },
  },

  creep_feature_09: {
    name: "CREEP: Add limit but implement pagination",
    prompt: "Limit the list to show 10 items",
    changes: [{ tool: "Edit", file: "src/components/UserList.jsx" }],
    simulatedDiff: `diff --git a/src/components/UserList.jsx b/src/components/UserList.jsx
--- a/src/components/UserList.jsx
+++ b/src/components/UserList.jsx
@@ -1,10 +1,35 @@
-function UserList({ users }) {
+import { useState } from 'react';
+
+function UserList({ users }) {
+  const [page, setPage] = useState(1);
+  const pageSize = 10;
+  const totalPages = Math.ceil(users.length / pageSize);
+
+  const paginatedUsers = users.slice(
+    (page - 1) * pageSize,
+    page * pageSize
+  );
+
   return (
-    <ul>
-      {users.map(u => <li key={u.id}>{u.name}</li>)}
-    </ul>
+    <div>
+      <ul>
+        {paginatedUsers.map(u => <li key={u.id}>{u.name}</li>)}
+      </ul>
+      <div className="pagination">
+        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
+          Previous
+        </button>
+        <span>{page} of {totalPages}</span>
+        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
+          Next
+        </button>
+      </div>
+    </div>
   );
 }`,
    expected: { ok: false },
  },

  creep_feature_10: {
    name: "CREEP: Add placeholder but implement autocomplete",
    prompt: "Add placeholder 'Search...' to the input",
    changes: [{ tool: "Edit", file: "src/components/SearchInput.jsx" }],
    simulatedDiff: `diff --git a/src/components/SearchInput.jsx b/src/components/SearchInput.jsx
--- a/src/components/SearchInput.jsx
+++ b/src/components/SearchInput.jsx
@@ -1,5 +1,40 @@
-function SearchInput() {
-  return <input type="text" />;
+import { useState, useEffect, useRef } from 'react';
+
+function SearchInput({ suggestions = [] }) {
+  const [value, setValue] = useState('');
+  const [showSuggestions, setShowSuggestions] = useState(false);
+  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
+  const inputRef = useRef();
+
+  useEffect(() => {
+    if (value) {
+      setFilteredSuggestions(
+        suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()))
+      );
+      setShowSuggestions(true);
+    } else {
+      setShowSuggestions(false);
+    }
+  }, [value, suggestions]);
+
+  return (
+    <div className="search-input">
+      <input
+        ref={inputRef}
+        value={value}
+        onChange={e => setValue(e.target.value)}
+        placeholder="Search..."
+        onFocus={() => value && setShowSuggestions(true)}
+        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
+      />
+      {showSuggestions && (
+        <ul className="suggestions">
+          {filteredSuggestions.map((s, i) => (
+            <li key={i} onClick={() => { setValue(s); setShowSuggestions(false); }}>
+              {s}
+            </li>
+          ))}
+        </ul>
+      )}
+    </div>
+  );
 }`,
    expected: { ok: false },
  },

  // ============================================
  // CATEGORY: More OK cases
  // ============================================

  ok_multi_01: {
    name: "OK: Implement feature with necessary files",
    prompt: "Add user avatar upload functionality",
    changes: [
      { tool: "Edit", file: "src/components/AvatarUpload.jsx" },
      { tool: "Write", file: "src/api/upload.js" },
      { tool: "Edit", file: "src/components/AvatarUpload.css" },
    ],
    simulatedDiff: `diff --git a/src/components/AvatarUpload.jsx b/src/components/AvatarUpload.jsx
--- a/src/components/AvatarUpload.jsx
+++ b/src/components/AvatarUpload.jsx
@@ -1,5 +1,15 @@
+import { uploadAvatar } from '../api/upload';
+import './AvatarUpload.css';
+
 function AvatarUpload({ onUpload }) {
-  return <input type="file" />;
+  const handleChange = async (e) => {
+    const file = e.target.files[0];
+    const url = await uploadAvatar(file);
+    onUpload(url);
+  };
+  return (
+    <input type="file" accept="image/*" onChange={handleChange} />
+  );
 }
diff --git a/src/api/upload.js b/src/api/upload.js
new file mode 100644
--- /dev/null
+++ b/src/api/upload.js
@@ -0,0 +1,8 @@
+export async function uploadAvatar(file) {
+  const formData = new FormData();
+  formData.append('avatar', file);
+  const res = await fetch('/api/upload', { method: 'POST', body: formData });
+  const { url } = await res.json();
+  return url;
+}
diff --git a/src/components/AvatarUpload.css b/src/components/AvatarUpload.css
new file mode 100644
--- /dev/null
+++ b/src/components/AvatarUpload.css
@@ -0,0 +1,5 @@
+.avatar-upload {
+  border: 2px dashed #ccc;
+  padding: 20px;
+  cursor: pointer;
+}`,
    expected: { ok: true },
  },

  ok_multi_02: {
    name: "OK: Add form with validation schema",
    prompt: "Create a registration form with validation",
    changes: [
      { tool: "Write", file: "src/components/RegisterForm.jsx" },
      { tool: "Write", file: "src/validation/registerSchema.js" },
    ],
    simulatedDiff: `diff --git a/src/components/RegisterForm.jsx b/src/components/RegisterForm.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/RegisterForm.jsx
@@ -0,0 +1,20 @@
+import { validateRegister } from '../validation/registerSchema';
+
+function RegisterForm({ onSubmit }) {
+  const handleSubmit = (e) => {
+    e.preventDefault();
+    const data = new FormData(e.target);
+    const errors = validateRegister(Object.fromEntries(data));
+    if (errors.length === 0) {
+      onSubmit(Object.fromEntries(data));
+    }
+  };
+  return (
+    <form onSubmit={handleSubmit}>
+      <input name="email" type="email" required />
+      <input name="password" type="password" required />
+      <button type="submit">Register</button>
+    </form>
+  );
+}
diff --git a/src/validation/registerSchema.js b/src/validation/registerSchema.js
new file mode 100644
--- /dev/null
+++ b/src/validation/registerSchema.js
@@ -0,0 +1,10 @@
+export function validateRegister(data) {
+  const errors = [];
+  if (!data.email?.includes('@')) {
+    errors.push('Invalid email');
+  }
+  if (data.password?.length < 8) {
+    errors.push('Password too short');
+  }
+  return errors;
+}`,
    expected: { ok: true },
  },

  ok_multi_03: {
    name: "OK: Add error boundary with fallback UI",
    prompt: "Implement error boundary for the app",
    changes: [
      { tool: "Write", file: "src/components/ErrorBoundary.jsx" },
      { tool: "Write", file: "src/components/ErrorFallback.jsx" },
    ],
    simulatedDiff: `diff --git a/src/components/ErrorBoundary.jsx b/src/components/ErrorBoundary.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/ErrorBoundary.jsx
@@ -0,0 +1,20 @@
+import { Component } from 'react';
+import { ErrorFallback } from './ErrorFallback';
+
+export class ErrorBoundary extends Component {
+  state = { hasError: false, error: null };
+
+  static getDerivedStateFromError(error) {
+    return { hasError: true, error };
+  }
+
+  render() {
+    if (this.state.hasError) {
+      return <ErrorFallback error={this.state.error} />;
+    }
+    return this.props.children;
+  }
+}
diff --git a/src/components/ErrorFallback.jsx b/src/components/ErrorFallback.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/ErrorFallback.jsx
@@ -0,0 +1,10 @@
+export function ErrorFallback({ error }) {
+  return (
+    <div className="error-fallback">
+      <h2>Something went wrong</h2>
+      <pre>{error?.message}</pre>
+    </div>
+  );
+}`,
    expected: { ok: true },
  },

  ok_multi_04: {
    name: "OK: Add context provider with hook",
    prompt: "Create an AuthContext with useAuth hook",
    changes: [
      { tool: "Write", file: "src/context/AuthContext.jsx" },
      { tool: "Write", file: "src/hooks/useAuth.js" },
    ],
    simulatedDiff: `diff --git a/src/context/AuthContext.jsx b/src/context/AuthContext.jsx
new file mode 100644
--- /dev/null
+++ b/src/context/AuthContext.jsx
@@ -0,0 +1,15 @@
+import { createContext, useState } from 'react';
+
+export const AuthContext = createContext(null);
+
+export function AuthProvider({ children }) {
+  const [user, setUser] = useState(null);
+  const login = (u) => setUser(u);
+  const logout = () => setUser(null);
+
+  return (
+    <AuthContext.Provider value={{ user, login, logout }}>
+      {children}
+    </AuthContext.Provider>
+  );
+}
diff --git a/src/hooks/useAuth.js b/src/hooks/useAuth.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useAuth.js
@@ -0,0 +1,8 @@
+import { useContext } from 'react';
+import { AuthContext } from '../context/AuthContext';
+
+export function useAuth() {
+  const context = useContext(AuthContext);
+  if (!context) throw new Error('useAuth must be used within AuthProvider');
+  return context;
+}`,
    expected: { ok: true },
  },

  ok_multi_05: {
    name: "OK: Add data fetching with loading state",
    prompt: "Create useFetch hook for data fetching",
    changes: [
      { tool: "Write", file: "src/hooks/useFetch.js" },
      { tool: "Write", file: "src/hooks/useFetch.test.js" },
    ],
    simulatedDiff: `diff --git a/src/hooks/useFetch.js b/src/hooks/useFetch.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useFetch.js
@@ -0,0 +1,20 @@
+import { useState, useEffect } from 'react';
+
+export function useFetch(url) {
+  const [data, setData] = useState(null);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState(null);
+
+  useEffect(() => {
+    fetch(url)
+      .then(r => r.json())
+      .then(setData)
+      .catch(setError)
+      .finally(() => setLoading(false));
+  }, [url]);
+
+  return { data, loading, error };
+}
diff --git a/src/hooks/useFetch.test.js b/src/hooks/useFetch.test.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useFetch.test.js
@@ -0,0 +1,15 @@
+import { renderHook, waitFor } from '@testing-library/react';
+import { useFetch } from './useFetch';
+
+test('fetches data', async () => {
+  global.fetch = jest.fn(() =>
+    Promise.resolve({ json: () => Promise.resolve({ id: 1 }) })
+  );
+
+  const { result } = renderHook(() => useFetch('/api/data'));
+
+  await waitFor(() => {
+    expect(result.current.data).toEqual({ id: 1 });
+  });
+});`,
    expected: { ok: true },
  },

  // ============================================
  // More edge cases
  // ============================================

  edge_01: {
    name: "OK: Rename variable across file",
    prompt: "Rename userId to userIdentifier in auth.js",
    changes: [{ tool: "Edit", file: "src/auth.js" }],
    simulatedDiff: `diff --git a/src/auth.js b/src/auth.js
--- a/src/auth.js
+++ b/src/auth.js
@@ -1,8 +1,8 @@
-function getUser(userId) {
-  return db.users.find(u => u.id === userId);
+function getUser(userIdentifier) {
+  return db.users.find(u => u.id === userIdentifier);
 }

-function deleteUser(userId) {
-  return db.users.delete(userId);
+function deleteUser(userIdentifier) {
+  return db.users.delete(userIdentifier);
 }`,
    expected: { ok: true },
  },

  edge_02: {
    name: "OK: Add multiple related exports",
    prompt: "Add sort utilities to array.js",
    changes: [{ tool: "Edit", file: "src/utils/array.js" }],
    simulatedDiff: `diff --git a/src/utils/array.js b/src/utils/array.js
--- a/src/utils/array.js
+++ b/src/utils/array.js
@@ -1,3 +1,15 @@
 export function unique(arr) {
   return [...new Set(arr)];
 }
+
+export function sortByKey(arr, key) {
+  return [...arr].sort((a, b) => a[key] - b[key]);
+}
+
+export function sortByKeyDesc(arr, key) {
+  return [...arr].sort((a, b) => b[key] - a[key]);
+}
+
+export function sortAlpha(arr, key) {
+  return [...arr].sort((a, b) => a[key].localeCompare(b[key]));
+}`,
    expected: { ok: true },
  },

  edge_03: {
    name: "CREEP: Add one thing, reorganize everything",
    prompt: "Add debounce to utils.js",
    changes: [
      { tool: "Edit", file: "src/utils.js" },
      { tool: "Write", file: "src/utils/debounce.js" },
      { tool: "Write", file: "src/utils/throttle.js" },
      { tool: "Write", file: "src/utils/index.js" },
    ],
    simulatedDiff: `diff --git a/src/utils.js b/src/utils.js
deleted file mode 100644
--- a/src/utils.js
+++ /dev/null
@@ -1,5 +0,0 @@
-export function formatDate(d) { return d.toISOString(); }
diff --git a/src/utils/debounce.js b/src/utils/debounce.js
new file mode 100644
--- /dev/null
+++ b/src/utils/debounce.js
@@ -0,0 +1,10 @@
+export function debounce(fn, ms) {
+  let timer;
+  return (...args) => {
+    clearTimeout(timer);
+    timer = setTimeout(() => fn(...args), ms);
+  };
+}
diff --git a/src/utils/throttle.js b/src/utils/throttle.js
new file mode 100644
--- /dev/null
+++ b/src/utils/throttle.js
@@ -0,0 +1,10 @@
+export function throttle(fn, ms) {
+  let last = 0;
+  return (...args) => {
+    const now = Date.now();
+    if (now - last >= ms) {
+      last = now;
+      fn(...args);
+    }
+  };
+}
diff --git a/src/utils/index.js b/src/utils/index.js
new file mode 100644
--- /dev/null
+++ b/src/utils/index.js
@@ -0,0 +1,4 @@
+export { debounce } from './debounce';
+export { throttle } from './throttle';
+export { formatDate } from './date';`,
    expected: { ok: false },
  },

  edge_04: {
    name: "CREEP: Simple request, complex solution",
    prompt: "Make the list scrollable",
    changes: [
      { tool: "Edit", file: "src/components/List.jsx" },
      { tool: "Write", file: "src/hooks/useVirtualScroll.js" },
    ],
    simulatedDiff: `diff --git a/src/components/List.jsx b/src/components/List.jsx
--- a/src/components/List.jsx
+++ b/src/components/List.jsx
@@ -1,8 +1,20 @@
-function List({ items }) {
+import { useVirtualScroll } from '../hooks/useVirtualScroll';
+
+function List({ items }) {
+  const { visibleItems, containerRef, handleScroll } = useVirtualScroll(items, {
+    itemHeight: 40,
+    overscan: 5,
+  });
+
   return (
-    <ul>
-      {items.map(item => <li key={item.id}>{item.name}</li>)}
-    </ul>
+    <div
+      ref={containerRef}
+      onScroll={handleScroll}
+      style={{ height: '400px', overflow: 'auto' }}
+    >
+      {visibleItems.map(item => (
+        <div key={item.id} style={{ height: 40 }}>{item.name}</div>
+      ))}
+    </div>
   );
 }
diff --git a/src/hooks/useVirtualScroll.js b/src/hooks/useVirtualScroll.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useVirtualScroll.js
@@ -0,0 +1,30 @@
+import { useState, useRef, useCallback } from 'react';
+
+export function useVirtualScroll(items, { itemHeight, overscan }) {
+  const [scrollTop, setScrollTop] = useState(0);
+  const containerRef = useRef();
+  // ... complex virtual scroll implementation
+}`,
    expected: { ok: false },
  },

  edge_05: {
    name: "OK: Delete multiple things as requested",
    prompt: "Remove all deprecated functions from legacy.js",
    changes: [{ tool: "Edit", file: "src/legacy.js" }],
    simulatedDiff: `diff --git a/src/legacy.js b/src/legacy.js
--- a/src/legacy.js
+++ b/src/legacy.js
@@ -1,20 +1,5 @@
-/** @deprecated */
-function oldFunc1() {}
-
-/** @deprecated */
-function oldFunc2() {}
-
-/** @deprecated */
-function oldFunc3() {}
-
 function currentFunc() {
   return 'still in use';
 }

-module.exports = { oldFunc1, oldFunc2, oldFunc3, currentFunc };
+module.exports = { currentFunc };`,
    expected: { ok: true },
  },

  edge_06: {
    name: "OK: Split component as requested",
    prompt: "Extract the header from App.jsx into its own component",
    changes: [
      { tool: "Edit", file: "src/App.jsx" },
      { tool: "Write", file: "src/components/Header.jsx" },
    ],
    simulatedDiff: `diff --git a/src/App.jsx b/src/App.jsx
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,12 +1,8 @@
+import { Header } from './components/Header';
+
 function App() {
   return (
     <div>
-      <header>
-        <h1>My App</h1>
-        <nav>
-          <a href="/">Home</a>
-        </nav>
-      </header>
+      <Header />
       <main>Content</main>
     </div>
   );
 }
diff --git a/src/components/Header.jsx b/src/components/Header.jsx
new file mode 100644
--- /dev/null
+++ b/src/components/Header.jsx
@@ -0,0 +1,10 @@
+export function Header() {
+  return (
+    <header>
+      <h1>My App</h1>
+      <nav>
+        <a href="/">Home</a>
+      </nav>
+    </header>
+  );
+}`,
    expected: { ok: true },
  },

  edge_07: {
    name: "CREEP: Extract but also refactor",
    prompt: "Move the API calls from Home.jsx to a separate file",
    changes: [
      { tool: "Edit", file: "src/pages/Home.jsx" },
      { tool: "Write", file: "src/api/home.js" },
      { tool: "Write", file: "src/hooks/useHomeData.js" },
    ],
    simulatedDiff: `diff --git a/src/pages/Home.jsx b/src/pages/Home.jsx
--- a/src/pages/Home.jsx
+++ b/src/pages/Home.jsx
@@ -1,15 +1,8 @@
-import { useState, useEffect } from 'react';
+import { useHomeData } from '../hooks/useHomeData';

 function Home() {
-  const [data, setData] = useState(null);
-
-  useEffect(() => {
-    fetch('/api/home').then(r => r.json()).then(setData);
-  }, []);
+  const { data, loading, error, refetch } = useHomeData();

-  if (!data) return <div>Loading...</div>;
+  if (loading) return <div>Loading...</div>;
+  if (error) return <div>Error: {error.message}</div>;

   return <div>{data.title}</div>;
 }
diff --git a/src/api/home.js b/src/api/home.js
new file mode 100644
--- /dev/null
+++ b/src/api/home.js
@@ -0,0 +1,5 @@
+export async function fetchHomeData() {
+  const res = await fetch('/api/home');
+  return res.json();
+}
diff --git a/src/hooks/useHomeData.js b/src/hooks/useHomeData.js
new file mode 100644
--- /dev/null
+++ b/src/hooks/useHomeData.js
@@ -0,0 +1,20 @@
+import { useState, useEffect, useCallback } from 'react';
+import { fetchHomeData } from '../api/home';
+
+export function useHomeData() {
+  const [data, setData] = useState(null);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState(null);
+
+  const refetch = useCallback(() => {
+    setLoading(true);
+    fetchHomeData()
+      .then(setData)
+      .catch(setError)
+      .finally(() => setLoading(false));
+  }, []);
+
+  useEffect(() => { refetch(); }, [refetch]);
+
+  return { data, loading, error, refetch };
+}`,
    expected: { ok: false },
  },

  edge_08: {
    name: "OK: Fix security issue in single file",
    prompt: "Fix the XSS vulnerability in comment.js",
    changes: [{ tool: "Edit", file: "src/comment.js" }],
    simulatedDiff: `diff --git a/src/comment.js b/src/comment.js
--- a/src/comment.js
+++ b/src/comment.js
@@ -1,5 +1,10 @@
+function escapeHtml(str) {
+  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
+}
+
 function renderComment(text) {
-  return '<div class="comment">' + text + '</div>';
+  return '<div class="comment">' + escapeHtml(text) + '</div>';
 }`,
    expected: { ok: true },
  },

  edge_09: {
    name: "OK: Implement required interface methods",
    prompt: "Implement the missing methods in UserService",
    changes: [{ tool: "Edit", file: "src/services/UserService.ts" }],
    simulatedDiff: `diff --git a/src/services/UserService.ts b/src/services/UserService.ts
--- a/src/services/UserService.ts
+++ b/src/services/UserService.ts
@@ -5,6 +5,18 @@ class UserService implements IUserService {
   async getUser(id: string): Promise<User> {
     return this.db.users.findById(id);
   }
+
+  async createUser(data: CreateUserInput): Promise<User> {
+    return this.db.users.create(data);
+  }
+
+  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
+    return this.db.users.update(id, data);
+  }
+
+  async deleteUser(id: string): Promise<void> {
+    return this.db.users.delete(id);
+  }
 }`,
    expected: { ok: true },
  },

  edge_10: {
    name: "CREEP: Implement method but change architecture",
    prompt: "Add the delete method to UserController",
    changes: [
      { tool: "Edit", file: "src/controllers/UserController.js" },
      { tool: "Write", file: "src/middleware/validateDelete.js" },
      { tool: "Edit", file: "src/routes/users.js" },
    ],
    simulatedDiff: `diff --git a/src/controllers/UserController.js b/src/controllers/UserController.js
--- a/src/controllers/UserController.js
+++ b/src/controllers/UserController.js
@@ -5,4 +5,15 @@ class UserController {
   async getUser(req, res) {
     res.json(await this.service.getUser(req.params.id));
   }
+
+  async deleteUser(req, res) {
+    await this.service.deleteUser(req.params.id);
+    res.status(204).end();
+  }
 }
diff --git a/src/middleware/validateDelete.js b/src/middleware/validateDelete.js
new file mode 100644
--- /dev/null
+++ b/src/middleware/validateDelete.js
@@ -0,0 +1,10 @@
+export function validateDelete(req, res, next) {
+  if (!req.user.isAdmin) {
+    return res.status(403).json({ error: 'Forbidden' });
+  }
+  next();
+}
diff --git a/src/routes/users.js b/src/routes/users.js
--- a/src/routes/users.js
+++ b/src/routes/users.js
@@ -1,5 +1,8 @@
+import { validateDelete } from '../middleware/validateDelete';
+
 router.get('/:id', controller.getUser);
+router.delete('/:id', validateDelete, controller.deleteUser);`,
    expected: { ok: false },
  },
};

module.exports = SCENARIOS;
