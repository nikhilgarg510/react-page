import React from 'react';
import createSimpleHtmlBlockPlugin from '../pluginFactories/createSimpleHtmlBlockPlugin';

import { FormatQuote } from '@mui/icons-material'

export default {
  blockQuote: createSimpleHtmlBlockPlugin({
    type: 'BLOCKQUOTE/BLOCKQUOTE',
    icon: <FormatQuote />,
    label: 'Quote',
    tagName: 'blockquote',
  }),
};
