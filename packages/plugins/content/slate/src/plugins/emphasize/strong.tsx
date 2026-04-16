import React from 'react';

import createMarkPlugin from '../../pluginFactories/createMarkPlugin';
import { FormatBold } from '@mui/icons-material'

export default createMarkPlugin({
  type: 'EMPHASIZE/STRONG',
  tagName: 'strong',
  icon: <FormatBold />,
  label: 'Bold',
  hotKey: 'mod+b',
});

