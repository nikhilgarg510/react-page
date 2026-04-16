import React from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
import { FormatUnderlined } from '@mui/icons-material'

export default createMarkPlugin({
  type: 'EMPHASIZE/U',
  tagName: 'u',
  icon: <FormatUnderlined />,
  label: 'Underline',
  hotKey: 'mod+u',
});
