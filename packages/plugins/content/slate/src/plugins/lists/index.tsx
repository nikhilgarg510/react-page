import React from 'react';
import { createListItemPlugin } from '../../pluginFactories';
import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import createListPlugin from '../../pluginFactories/createListPlugin';
import { LI, OL, UL } from './constants';
import { FormatListBulleted, FormatListNumbered, FormatIndentIncrease, FormatIndentDecrease } from '@mui/icons-material'

const ol = createListPlugin({
  type: OL,
  icon: <FormatListNumbered />,
  label: 'Ordered List',
  tagName: 'ol',
});

const ul = createListPlugin({
  type: UL,
  icon: <FormatListBulleted />,
  label: 'Unordered List',
  tagName: 'ul',
});

// only used for easier access on createCata
const li = createListItemPlugin({
  tagName: 'li',
  type: LI,
});

const indention = createIndentionPlugin({
  iconIncrease: <FormatIndentIncrease />,
  iconDecrease: <FormatIndentDecrease />,
  listItemType: LI,
  labelIncrease: 'Increase Indentation',
  labelDecrease: 'Decrease Indentation',
});

export default {
  ol,
  ul,
  li,
  indention,
};
