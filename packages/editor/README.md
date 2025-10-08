# React-Page Editor

A rich content editor for React applications with drag-and-drop functionality, built-in plugins, and extensive customization options. **Optimized for Vite and modern React development.**

## Installation

```bash
npm install @react-page/editor
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import Editor from '@react-page/editor';
import '@react-page/editor/lib/index.css'; // Import the CSS

const MyEditor = () => {
  const [value, setValue] = useState(null);

  return (
    <Editor
      value={value}
      onChange={setValue}
    />
  );
};

export default MyEditor;
```

## Vite Compatibility

This package is **fully compatible with Vite** and includes:
- ✅ **ESM/CJS dual exports** for optimal bundling
- ✅ **React DnD v14** (Vite-compatible version)
- ✅ **Updated dependencies** that work seamlessly with Vite's dev server
- ✅ **Proper CSS handling** for Vite's asset processing
- ✅ **TypeScript support** with proper type exports

## Key Features

- 🖱️ Drag and drop interface
- 🔧 Extensive plugin system
- 📱 Mobile responsive
- 🎨 Customizable themes
- 💾 JSON-based content structure
- 🔄 Undo/Redo functionality
- 🌐 TypeScript support
- ⚡ Vite & modern bundler optimized

## Dependencies

This package includes **all necessary dependencies** including:
- **Emotion React & Styled** (required by Material-UI) ✅
- React Redux v8+ for state management ✅
- Material-UI v5+ components ✅
- React DnD v14 for drag and drop (Vite-compatible) ✅
- And many more modern, up-to-date packages... ✅

**No additional peer dependencies needed** - everything is bundled!

## Requirements

- Node.js >= 16.0.0
- React >= 18.0.0
- React DOM >= 18.0.0

## Documentation

For comprehensive documentation, examples, and API reference:

- Full Documentation: https://react-page.github.io/docs
- GitHub Repository: https://github.com/react-page/react-page
- Live Demo: https://react-page.github.io/

## License

MIT
