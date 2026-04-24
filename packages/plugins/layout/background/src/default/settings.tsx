import React from 'react';
import type { BackgroundSettings } from '../types/settings';
import {
  IMAGE_MODE_FLAG,
  COLOR_MODE_FLAG,
  GRADIENT_MODE_FLAG,
} from './../const/mode';
// import { defaultTranslations as defaultImageUploadTranslations } from '@react-page/editor/lib/ui/ImageUpload/defaultTranslations';

export const defaultTranslations = {
  // Strings used in ImageUpload module
  buttonContent: 'Choose for upload',
  noFileError: 'No file selected',
  badExtensionError: 'Wrong file type',
  tooBigError: 'Image file > 5MB',
  uploadingError: 'Error while uploading',
  unknownError: 'Unknown error',

  imageMode: 'Image',
  colorMode: 'Single color',
  gradientMode: 'Gradient color',
  lighten: 'Lighten',
  darken: 'Darken',
  usePadding: 'Use inner padding',
  setMaxWidth: 'Set max width',
  onOff: 'Turn on settings on this panel',
  onOff1: 'Turn on image',
  onOff2: 'Turn on color',
  onOff4: 'Turn on gradient',
  gradientRotation: 'Gradient rotation',
  degrees: 'deg',
  gradientOpacity: 'Gradient opacity',
  addColor: 'Add color',
  addGradient: 'Add a gradient',
  pluginName: 'Background',
  pluginDescription: 'Add background color, image or gradient',
  or: 'OR',
  haveUrl: 'Existing image URL',
  srcPlaceholder: 'http://example.com/image.png',
  imageUrl: 'Image URL',
  isParallax: 'Use parallax effect',
};

export const defaultSettings: Partial<BackgroundSettings> = {
  defaultBackgroundColor: { r: 245, g: 0, b: 87, a: 1 },
  defaultGradientColor: { r: 245, g: 0, b: 87, a: 1 },
  defaultGradientSecondaryColor: { r: 71, g: 245, b: 87, a: 1 },

  // This is the panel number and cycles thru 1/2/3 as the tabs are switched
  defaultMode: 1,

  // This is the sum of the enums of the 3 tabs, depending on which is set
  // Value  Binary	Flags set
  // 0	    000	    none
  // 1	    001	    IMAGE
  // 2	    010	    COLOR
  // 3	    011	    IMAGE + COLOR
  // 4	    100	    GRADIENT
  // 5	    101	    IMAGE + GRADIENT
  // 6	    110	    COLOR + GRADIENT
  // 7	    111	    all
  defaultModeFlag: 1,
  
  defaultDarken: 0.1,
  defaultLighten: 0,
  defaultHasPadding: true,
  defaultHasMaxWidth: false,
  defaultMaxWidth: 3840,
  // defaultInnerMaxWidth: 1440,
  defaultIsParallax: false,
  translations: defaultTranslations,
  enabledModes: IMAGE_MODE_FLAG | COLOR_MODE_FLAG | GRADIENT_MODE_FLAG,
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  cellStyle: {
    padding: 0,
  },
};
