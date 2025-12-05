# @react-page/plugins-image

An image plugin for React Page Editor that allows embedding and configuring images in your content.

## Installation

```bash
npm install @react-page/plugins-image
```

## Usage

```jsx
import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

const cellPlugins = [image];

<Editor cellPlugins={cellPlugins} />
```

## Features

- Image upload and URL input support
- Responsive image sizing
- Alt text configuration
- Image alignment options
- Caption support

## License

MIT
