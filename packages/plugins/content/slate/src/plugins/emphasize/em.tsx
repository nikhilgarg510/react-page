import React from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
import { FormatItalic } from '@mui/icons-material'

export default createMarkPlugin({
  type: 'EMPHASIZE/EM',
  tagName: 'em',
  icon: <FormatItalic />,
  label: 'Italic',
  hotKey: 'mod+i',
});

