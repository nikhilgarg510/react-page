import type { CellPlugin, ImageUploadType, RGBColor } from '@react-page/editor';

import type { BackgroundControlsProps } from './controls';
import type { ModeEnum } from './ModeEnum';
import type { BackgroundRendererProps } from './renderer';
import type { BackgroundState } from './state';
import type { Translations } from './translations';

export type BackgroundSettings = {
  Renderer: React.ComponentType<BackgroundRendererProps>;
  Controls: React.ComponentType<BackgroundControlsProps>;
  enabledModes?: ModeEnum;
  getInitialChildren?: CellPlugin<BackgroundState>['createInitialChildren'];
  defaultBackgroundColor?: RGBColor;
  defaultGradientColor?: RGBColor;
  defaultGradientSecondaryColor?: RGBColor;
  defaultMode?: ModeEnum;
  defaultModeFlag?: ModeEnum;
  defaultDarken?: number;
  defaultLighten?: number;
  defaultHasPadding?: boolean;
  defaultHasMaxWidth?: boolean;
  defaultMaxWidth?:number;
  // defaultInnerMaxWidth?:number;
  defaultIsParallax?: boolean;
  imageUpload?: ImageUploadType;
  allowedExtensions?: string[];
  translations?: Translations;
  cellStyle?: CellPlugin<BackgroundState>['cellStyle'];
};
