import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { Colorize as ColorizeIcon } from '@mui/icons-material';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { colorToString, rgbaToHex, hexToRgba } from './colorToString';
import type { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps: Partial<ColorPickerProps> = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />,
  };
  anchorEl: HTMLElement | null = null;

  state: ColorPickerState = {
    isColorPickerVisible: false,
    hexInputValue: '',
  };

  handleClickShowColorPicker = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props?.onDialogOpen) {
      this.props.onDialogOpen();
    }
    const newState = !this.state.isColorPickerVisible;
    // Update hex input value when opening the picker
    if (newState && this.props.color) {
      this.setState({
        isColorPickerVisible: newState,
        hexInputValue: rgbaToHex(this.props.color)
      });
    } else {
      this.setState({ isColorPickerVisible: newState });
    }
  };

  onChange = (color: any) => {
    // Update hex input when color changes from picker
    this.setState({ hexInputValue: rgbaToHex(color) });
    this.props.onChange && this.props.onChange(color);
    this.props.onChangeComplete && this.props.onChangeComplete(color);
  };

  handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    this.setState({ hexInputValue: hexValue });
  };

  handleHexInputBlur = () => {
    const { hexInputValue } = this.state;
    const rgbaColor = hexToRgba(hexInputValue);

    if (rgbaColor) {
      this.props.onChange && this.props.onChange(rgbaColor);
      this.props.onChangeComplete && this.props.onChangeComplete(rgbaColor);
    } else if (this.props.color) {
      // Reset to current color if invalid hex
      this.setState({ hexInputValue: rgbaToHex(this.props.color) });
    }
  };

  handleHexInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleHexInputBlur();
    }
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
            <TextField
              label="Hex Code"
              value={this.state.hexInputValue}
              onChange={this.handleHexInputChange}
              onBlur={this.handleHexInputBlur}
              onKeyDown={this.handleHexInputKeyDown}
              placeholder="#000000"
              size="small"
              fullWidth
              style={{ marginTop: '10px' }}
              inputProps={{
                style: { fontFamily: 'monospace' }
              }}
            />
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default ColorPicker;
