import { RgbaColor } from 'react-colorful';

export interface ColorPickerProps {
  onChange: (color: RgbaColor) => void;
  onChangeComplete: (color: RgbaColor) => void;
  color?: RgbaColor | null;
  buttonContent?: JSX.Element | string;
  icon?: JSX.Element | string;
  onDialogOpen?: () => void;
  style?: React.CSSProperties;
}

export type ColorPickerState = {
  isColorPickerVisible: boolean;
};

export { RgbaColor as RGBColor };
