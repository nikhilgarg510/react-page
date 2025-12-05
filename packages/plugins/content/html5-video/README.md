# @react-page/plugins-html5-video

An HTML5 video plugin for React Page Editor that allows embedding native HTML5 video elements.

## Installation

```bash
npm install @react-page/plugins-html5-video
```

## Usage

```jsx
import html5Video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';

const cellPlugins = [html5Video];

<Editor cellPlugins={cellPlugins} />
```

## Features

- Native HTML5 video support
- Video source configuration
- Standard HTML5 video controls
- Responsive video sizing

## License

MIT
