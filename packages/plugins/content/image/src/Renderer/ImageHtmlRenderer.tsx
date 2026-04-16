import React from 'react';

import { iconStyle } from './../common/styles';
import type { CellPluginComponentProps } from '@react-page/editor';
import type { ImageState } from '../types/state';

import { Landscape } from '@mui/icons-material'

const ImageHtmlRenderer: React.FC<CellPluginComponentProps<ImageState>> = (
  props
) => {
  const { data } = props;

  const src = data?.src;
  const alt = data?.alt;
  const openInNewWindow = data?.openInNewWindow;
  const image = (
    <img className="react-page-plugins-content-image" alt={alt} src={src} />
  );

  return src ? (
    <div>
      {data?.href ? (
        <a
          onClick={props.isEditMode ? (e) => e.preventDefault() : undefined}
          href={data?.href}
          target={openInNewWindow ? '_blank' : undefined}
          rel={openInNewWindow ? 'noreferrer noopener' : undefined}
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  ) : (
    <div>
      <div className="react-page-plugins-content-image-placeholder">
        <Landscape style={iconStyle} />
      </div>
    </div>
  );
};

export default ImageHtmlRenderer;
