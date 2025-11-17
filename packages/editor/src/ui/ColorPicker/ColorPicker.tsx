import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ColorizeIcon from '@mui/icons-material/Colorize';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { colorToString } from './colorToString';
import type { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps: Partial<ColorPickerProps> = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />,
  };
  anchorEl: HTMLElement | null = null;

  state: ColorPickerState = {
    isColorPickerVisible: false,
  };

  handleClickShowColorPicker = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props?.onDialogOpen) {
      this.props.onDialogOpen();
    }
    this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
  };

  onChange = (color: any) => {
    this.props.onChange && this.props.onChange(color);
    this.props.onChangeComplete && this.props.onChangeComplete(color);
  };

  render() {
    return (
      <React.Fragment>
        <Button
          ref={(node) => {
            this.anchorEl = node;
          }}
          variant="contained"
          onClick={this.handleClickShowColorPicker}
          style={
            {
              ...this.props.style,
              borderColor: colorToString(this.props.color),
              borderStyle: 'solid',
              borderWidth: '2px',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        >
          {this.props.buttonContent}
          {this.props.icon}
        </Button>
        <Popover
          open={this.state.isColorPickerVisible}
          anchorEl={this.anchorEl}
          onClose={this.handleClickShowColorPicker}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <div style={{ padding: '10px' }}>
            <RgbaColorPicker
              color={this.props.color ?? { r: 0, g: 0, b: 0, a: 1 }}
              onChange={this.onChange}
            />
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default ColorPicker;
