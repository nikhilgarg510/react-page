import React from 'react';
import createDataPlugin from '../pluginFactories/createDataPlugin';

import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify } from '@mui/icons-material'

const left = createDataPlugin<{ align: 'left' }>({
  icon: <FormatAlignLeft />,
  label: 'Align Left',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'left',
  getInitialData: () => ({ align: 'left' }),
});

const center = createDataPlugin<{ align: 'center' }>({
  icon: <FormatAlignCenter />,
  label: 'Align Center',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'center',
  getInitialData: () => ({ align: 'center' }),
});

const right = createDataPlugin<{ align: 'right' }>({
  icon: <FormatAlignRight />,
  label: 'Align Right',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'right',
  getInitialData: () => ({ align: 'right' }),
});

const justify = createDataPlugin<{ align: 'justify' }>({
  icon: <FormatAlignJustify />,
  label: 'Align Justify',
  object: 'block',
  addToolbarButton: true,
  addHoverButton: false,
  dataMatches: (data) => data?.align === 'justify',
  getInitialData: () => ({ align: 'justify' }),
});

export default {
  left,
  center,
  right,
  justify,
};
