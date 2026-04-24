import { Divider, FormControlLabel, Slider, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
import ColorIcon from '@mui/icons-material/ColorLens';
import GradientIcon from '@mui/icons-material/Gradient';
import ImageIcon from '@mui/icons-material/Landscape';

import React from 'react';
import type { BackgroundApi } from '../types/api';
import type { BackgroundControlsProps } from '../types/controls';
import { ModeEnum } from '../types/ModeEnum';
import ColorComponent from './sub/Color';
import ImageComponent from './sub/Image';
import LinearGradientComponent from './sub/LinearGradient';

interface BackgroundDefaultControlsState {
  mode?: ModeEnum;
}

class Inner extends React.Component<
  BackgroundControlsProps & BackgroundApi,
  BackgroundDefaultControlsState
> {
  constructor(props: BackgroundControlsProps & BackgroundApi) {
    super(props);
    this.state = {
      mode: props.defaultMode,
    };
  }

  public render() {

    const hasPadding = this.props.data?.hasPadding ?? this.props.defaultHasPadding;
    const hasMaxWidth = this.props.data?.hasMaxWidth ?? this.props.defaultHasMaxWidth;
    const maxWidth = this.props.data?.maxWidth ?? this.props.defaultMaxWidth;
    // const innerMaxWidth = this.props.data?.innerMaxWidth ?? this.props.defaultInnerMaxWidth;

    const modeFlag = this.props.data?.modeFlag ?? this.props.defaultModeFlag;
    const darken = this.props.data?.darken ?? this.props.defaultDarken;
    const lighten = this.props.data?.lighten ?? this.props.defaultLighten;

    const darkenFinal = this.props.darkenPreview ?? darken ?? 0;
    const lightenFinal = this.props.lightenPreview ?? lighten ?? 0;

    const tabs = this.props.enabledModes
      ? [
        ...((this.props.enabledModes & ModeEnum.IMAGE_MODE_FLAG) > 0
          ? [
            <Tab
              icon={
                <ImageIcon
                  color={
                    modeFlag && (modeFlag & ModeEnum.IMAGE_MODE_FLAG) > 0
                      ? 'secondary'
                      : undefined
                  }
                />
              }
              label={this.props.translations?.imageMode}
              value={ModeEnum.IMAGE_MODE_FLAG}
              key={ModeEnum.IMAGE_MODE_FLAG}
            />,
          ]
          : []),
        ...((this.props.enabledModes & ModeEnum.COLOR_MODE_FLAG) > 0
          ? [
            <Tab
              icon={
                <ColorIcon
                  color={
                    modeFlag && (modeFlag & ModeEnum.COLOR_MODE_FLAG) > 0
                      ? 'secondary'
                      : undefined
                  }
                />
              }
              label={this.props.translations?.colorMode}
              value={ModeEnum.COLOR_MODE_FLAG}
              key={ModeEnum.COLOR_MODE_FLAG}
            />,
          ]
          : []),
        (this.props.enabledModes & ModeEnum.GRADIENT_MODE_FLAG) > 0
          ? [
            <Tab
              icon={
                <GradientIcon
                  color={
                    modeFlag && (modeFlag & ModeEnum.GRADIENT_MODE_FLAG) > 0
                      ? 'secondary'
                      : undefined
                  }
                />
              }
              label={this.props.translations?.gradientMode}
              value={ModeEnum.GRADIENT_MODE_FLAG}
              key={ModeEnum.GRADIENT_MODE_FLAG}
            />,
          ]
          : [],
      ]
      : [];
    return (
      <div>
        {this.props.enabledModes ? (
          <Tabs
            style={{ marginBottom: 16 }}
            value={this.state.mode}
            onChange={(e, mode) => this.setState({ mode })}
            centered={true}
          >
            {tabs}
          </Tabs>
        ) : null}

        {/* Render one of the panels here - image / mono color / gradient */}
        {this.renderUI()}

        <br />
        <Divider />
        <br />

        {/* Render the common UI here for each tab - darken / lighten / padding */}
        <div style={{ display: 'flex', marginLeft: 16 }}>

          <div style={{ flex: 1 }}>
            <Typography variant="body1" id="linear-gradient-darken-label">
              {this.props.translations?.darken} (
              {(darkenFinal * 100).toFixed(0)}
              %)
            </Typography>
            <Slider
              aria-labelledby="linear-gradient-darken-label"
              value={darkenFinal}
              onChange={(e, value) =>
                this.props.handleChangeDarkenPreview(
                  value instanceof Array ? value[0] : value
                )
              }
              onChangeCommitted={this.props.handleChangeDarken}
              step={0.01}
              min={0}
              max={1}
            />
          </div>

          <div style={{ flex: 1, marginLeft: 16 }}>
            <Typography variant="body1" id="linear-gradient-lighten-label">
              {this.props.translations?.lighten} (
              {(lightenFinal * 100).toFixed(0)}
              %)
            </Typography>
            <Slider
              aria-labelledby="linear-gradient-lighten-label"
              value={lightenFinal}
              onChange={(e, value) =>
                this.props.handleChangeLightenPreview(
                  value instanceof Array ? value[0] : value
                )
              }
              onChangeCommitted={this.props.handleChangeLighten}
              step={0.01}
              min={0}
              max={1}
            />
          </div>

          <div style={{ flex: 1, marginLeft: 16 }}>
            <FormControlLabel
              sx={{ ml: 0, float: "unset" }}
              control={
                <Switch
                  onChange={this.props.handleChangeHasPadding}
                  checked={hasPadding}
                />
              }
              label={this.props.translations?.usePadding}
            />
            <FormControlLabel
              sx={{ ml: 0, float: "unset" }}
              control={
                <Switch
                  onChange={this.props.handleChangeHasMaxWidth}
                  checked={hasMaxWidth}
                />
              }
              label={this.props.translations?.setMaxWidth}
            />
          </div>

          {hasMaxWidth &&
            <div style={{ flex: 1, marginLeft: 16 }}>
              <TextField
                // placeholder={}
                label={this.props.translations?.maxWidth}
                value={maxWidth}
                onChange={e => this.props.handleChangeMaxWidth(e.target.value)}
              />
            </div>
          }

          {/* <div style={{ flex: 1, marginLeft: 16 }}>
            <TextField
              // placeholder={}
              label="Inner max width (px)"
              value={innerMaxWidth}
              onChange={e => this.props.handleChangeInnerMaxWidth(e.target.value)}
            />
          </div> */}

        </div>
      </div>
    );
  }

  renderModeSwitch = (selectedPanel) => {
    const modeFlag = this.props.data?.modeFlag ?? this.props.defaultModeFlag;

    // console.log("modeFlag", modeFlag)
    // console.log("this.state.mode", this.state.mode)

    let checked = false
    if (modeFlag && this.state.mode)
      // (value & FLAG) !== 0
      // Does this bit exist in the number?
      // Needless complexity with bits, could have been done more elegantly
      checked = (modeFlag & this.state.mode) !== 0

    const index = `onOff${selectedPanel}`
    let labelText = this.props.translations[index]

    return (
      <FormControlLabel
        // MUST have the float: "unset" to cancel MC float:left on this
        sx={{ mb: 2, ml: 0, float: "unset" }}
        control={
          <Switch
            onChange={this.props.setModeFlag(this.state.mode, modeFlag)}
            checked={checked}
          />
        }
        label={labelText}
      />
    );
  };

  renderUI = () => {
    switch (this.state.mode) {
      case ModeEnum.COLOR_MODE_FLAG:
        return (
          <>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch(ModeEnum.COLOR_MODE_FLAG)}

            {/* Render the Background mono color controls */}
            <ColorComponent
              {...this.props}
              ensureModeOn={this.ensureModeOn(ModeEnum.COLOR_MODE_FLAG)}
              onChangeBackgroundColorPreview={
                this.props.handleChangeBackgroundColorPreview
              }
              backgroundColorPreview={this.props.backgroundColorPreview}
            />
          </>
        );

      case ModeEnum.GRADIENT_MODE_FLAG:
        return (
          <React.Fragment>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch(ModeEnum.GRADIENT_MODE_FLAG)}

            {/* Render the Background gradient color controls */}
            <LinearGradientComponent
              {...this.props}
              ensureModeOn={this.ensureModeOn(ModeEnum.GRADIENT_MODE_FLAG)}
              gradientDegPreview={this.props.gradientDegPreview}
              gradientDegPreviewIndex={this.props.gradientDegPreviewIndex}
              gradientOpacityPreview={this.props.gradientOpacityPreview}
              gradientOpacityPreviewIndex={
                this.props.gradientOpacityPreviewIndex
              }
              gradientColorPreview={this.props.gradientColorPreview}
              gradientColorPreviewIndex={this.props.gradientColorPreviewIndex}
              gradientColorPreviewColorIndex={
                this.props.gradientColorPreviewColorIndex
              }
              onChangeGradientDegPreview={
                this.props.handleChangeGradientDegPreview
              }
              onChangeGradientOpacityPreview={
                this.props.handleChangeGradientOpacityPreview
              }
              onChangeGradientColorPreview={
                this.props.handleChangeGradientColorPreview
              }
            />
          </React.Fragment>
        );

      case ModeEnum.IMAGE_MODE_FLAG:
      default:
        return (
          <React.Fragment>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch(ModeEnum.IMAGE_MODE_FLAG)}

            {/* Render the Background image controls */}
            <ImageComponent
              {...this.props}
              onImageLoaded={this.props.handleImageLoaded}
              onImageUploaded={this.props.handleImageUploaded}
              ensureModeOn={this.ensureModeOn(ModeEnum.IMAGE_MODE_FLAG)}
            />
          </React.Fragment>
        );
    }
  };

  ensureModeOn = (mode: ModeEnum) => () => {

    const modeFlag = this.props.data?.modeFlag ?? this.props.defaultModeFlag;

    // console.log("mode", mode)
    // console.log("modeFlag", modeFlag)

    if (modeFlag && (modeFlag & mode) === 0) {
      this.props.setModeFlag(mode, modeFlag)();
    }
  };

}

export default Inner;
