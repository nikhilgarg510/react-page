import React from 'react';
import createComponentPlugin from '../../pluginFactories/createComponentPlugin';
import { Link } from '@mui/icons-material'

type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};

const link = createComponentPlugin<LinkData>({
  type: 'LINK/LINK',
  object: 'inline',
  icon: <Link />,
  label: 'Link',
  addHoverButton: true,
  addToolbarButton: true,
  controls: {
    type: 'autoform',
    schema: {
      type: 'object',
      required: ['href'],
      properties: {
        href: {
          type: 'string',
        },
        openInNewWindow: {
          type: 'boolean',
        },
      },
    },
  },

  deserialize: {
    tagName: 'a',
    getData: (el) => ({
      href: el.getAttribute('href') || '',
      openInNewWindow: el.getAttribute('target') === '_blank',
    }),
  },
  Component: ({ children, openInNewWindow, href, attributes }) => {
    return (
      <a
        {...attributes}
        target={openInNewWindow ? '_blank' : undefined}
        href={href}
      >
        {children}
      </a>
    );
  },
});

export default link;
