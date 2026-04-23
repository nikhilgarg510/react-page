import type { RGBColor } from '@react-page/editor';
import type { Gradient } from './gradient';
import type { ModeEnum } from './ModeEnum';

export type BackgroundState = {
  background: string;
  backgroundColor: RGBColor;
  isParallax: boolean;
  modeFlag: ModeEnum;
  padding: number;
  lighten: number;
  darken: number;
  hasPadding: boolean;
  hasMaxWidth: boolean;
  maxWidth: number;
  // innerMaxWidth: number;
  gradients: Gradient[];
};
