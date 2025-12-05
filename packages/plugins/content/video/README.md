# @react-page/plugins-video

A video plugin for React Page Editor that allows embedding videos from various platforms using react-player.

## Installation

```bash
npm install @react-page/plugins-video
```

## Usage

```jsx
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

const cellPlugins = [video];

<Editor cellPlugins={cellPlugins} />
```

## Features

- Support for multiple video platforms (YouTube, Vimeo, etc.) via react-player
- URL-based video embedding
- Responsive video sizing
- Playback controls
- Autoplay and loop options

## Supported Platforms

- YouTube
- Vimeo
- Dailymotion
- SoundCloud
- Facebook
- Twitch
- And more via react-player

## License

MIT
