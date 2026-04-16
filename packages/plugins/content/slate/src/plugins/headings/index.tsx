import createHeadingsPlugin from '../../pluginFactories/createHeadingsPlugin';
import React from 'react';
import {
  LooksOne as H1Icon,
  LooksTwo as H2Icon,
  Looks3 as H3Icon,
  Looks4 as H4Icon,
  Looks5 as H5Icon,
  Looks6 as H6Icon,
} from '@mui/icons-material'

export default {
  h1: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-ONE',
    level: 1,
    icon: <H1Icon />,
  }),
  h2: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-TWO',
    level: 2,
    icon: <H2Icon />,
  }),
  h3: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-THREE',
    level: 3,
    icon: <H3Icon />,
  }),
  h4: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-FOUR',
    level: 4,
    icon: <H4Icon />,
  }),
  h5: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-FIVE',
    level: 5,
    icon: <H5Icon />,
  }),
  h6: createHeadingsPlugin({
    type: 'HEADINGS/HEADING-SIX',
    level: 6,
    icon: <H6Icon />,
  }),
};
