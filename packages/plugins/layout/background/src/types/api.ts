import type { ModeEnum } from './ModeEnum';

import type { ImageLoaded, RGBColor } from '@react-page/editor';

export interface BackgroundApi {
  handleChangeDarken: () => void;
  handleChangeDarkenPreview: (darken: number) => void;
  handleChangeLighten: () => void;
  handleChangeLightenPreview: (lighten: number) => void;
  handleChangeHasPadding: () => void;

  handleChangeHasMaxWidth: () => void;
  handleChangeMaxWidth: (value: string) => void;

  handleChangeHasInnerMaxWidth: () => void;
  // handleChangeInnerMaxWidth: (value: string) => void;

  setModeFlag: (
    mode: ModeEnum | undefined,
    modeFlag: ModeEnum | undefined
  ) => () => void;
  handleChangeBackgroundColorPreview: (color?: RGBColor) => void;
  handleChangeGradientDegPreview: (
    gradientDegPreview: number | undefined,
    gradientDegPreviewIndex?: number
  ) => void;
  handleChangeGradientOpacityPreview: (
    gradientOpacityPreview: number | undefined,
    gradientOpacityPreviewIndex?: number
  ) => void;
  handleChangeGradientColorPreview: (
    gradientColorPreview: RGBColor | undefined,
    gradientColorPreviewIndex?: number,
    gradientColorPreviewColorIndex?: number
  ) => void;
  handleImageLoaded: (imagePreview: ImageLoaded) => void;
  handleImageUploaded: () => void;
}
