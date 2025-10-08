# React + Vite Example with React Page Editor

This is a complete working example of how to use the React Page Editor in a Vite + React project.

## 1. Create Vite Project

```bash
npm create vite@latest my-editor-app -- --template react-ts
cd my-editor-app
npm install
```

## 2. Install the Editor Package

```bash
npm install ./react-page-editor-1.0.0.tgz
```

## 3. Replace src/App.tsx

```tsx
import React, { useState } from 'react';
import Editor from '@react-page/editor';
import '@react-page/editor/lib/index.css';
import type { Value } from '@react-page/editor';
import './App.css';

function App() {
  // Initialize with null - the editor will create a proper Value structure
  const [value, setValue] = useState<Value | null>(null);

  // Handle onChange - receives a proper Value object
  const handleChange = (newValue: Value) => {
    console.log('Editor value changed:', newValue);
    setValue(newValue);
  };

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
        <h1>React Page Editor + Vite Example</h1>
        <p>A rich content editor that works seamlessly with Vite!</p>
      </header>
      
      <main style={{ padding: '0 20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', minHeight: '400px' }}>
          <Editor
            value={value}
            onChange={handleChange}
          />
        </div>
        
        {/* Debug section to show the current value */}
        <details style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <summary>Current Editor Value (Debug)</summary>
          <pre style={{ overflow: 'auto', fontSize: '12px' }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        </details>
      </main>
    </div>
  );
}

export default App;
```

## 4. Update src/App.css (Optional styling)

```css
.App {
  min-height: 100vh;
  background-color: #ffffff;
}

/* Override some default editor styles if needed */
.react-page-editor {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* Ensure proper styling for the editor container */
.react-page-editor-container {
  min-height: 400px;
}
```

## 5. Update src/main.tsx (if needed)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 6. Run the Project

```bash
npm run dev
```

## Key Points:

1. **Import the CSS**: Always import `@react-page/editor/lib/index.css`
2. **Proper Value Type**: Use `Value | null` from `@react-page/editor` types
3. **Initialize with null**: Let the editor create the proper structure
4. **onChange Handler**: Receives a complete `Value` object with `id`, `rows`, and `version`
5. **No Extra Dependencies**: Everything is bundled in the package!

## Advanced Usage:

### With Custom Cell Plugins

```tsx
import Editor, { Value } from '@react-page/editor';
// Import built-in plugins if available
// import { cellPlugins } from '@react-page/editor';

function AdvancedApp() {
  const [value, setValue] = useState<Value | null>(null);

  return (
    <Editor
      value={value}
      onChange={setValue}
      // cellPlugins={cellPlugins} // Add if available
      lang="en"
    />
  );
}
```

### Read-Only Mode

```tsx
<Editor
  value={value}
  readOnly={true}  // Just display content, no editing
/>
```

This example should work perfectly with Vite and won't require any additional dependencies!
