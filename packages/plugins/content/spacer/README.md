# @react-page/plugins-spacer

A spacer plugin for React Page Editor that provides resizable horizontal and vertical empty space.

## Installation

```bash
npm install @react-page/plugins-spacer
```

## Usage

```jsx
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

const cellPlugins = [spacer];

<Editor cellPlugins={cellPlugins} />
```

## Features

- Resizable spacer in edit mode
- Configurable height
- Simple drag-to-resize interface
- Clean empty space in read-only mode

## Custom Configuration

You can customize the spacer plugin:

```jsx
import createPlugin from '@react-page/plugins-spacer/lib/createPlugin';

const customSpacer = createPlugin({
  Renderer: YourCustomRenderer,
  translations: {
    pluginName: 'Custom Spacer',
    pluginDescription: 'Your custom description',
  },
});
```

## License

MIT
