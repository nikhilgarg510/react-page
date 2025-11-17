import React from 'react';
import { connectField } from 'uniforms';
import ColorPicker from './ColorPicker';
import { colorToString, stringToColor } from './colorToString';
import { useUiTranslator } from '../../core/components/hooks';

const ColorPickerField = connectField<{
  value: string;
  label: string;
  onChange: (v: string | void) => void;
}>((props) => {
  const { t } = useUiTranslator();

  // Use default value if value is undefined
  const currentValue = props.value || 'rgba(0, 0, 255, 1)';
  const parsedColor = stringToColor(currentValue);

  // Don't update during dragging, only on complete
  const handleChange = (v: any) => {
    // Don't call props.onChange here to avoid re-renders while dragging
  };

  const handleChangeComplete = (v: any) => {
    const colorString = colorToString(v);
    // Only save on complete
    props.onChange(colorString);
  };

  return (
    <ColorPicker
      style={{ marginBottom: 8 }}
      color={parsedColor}
      buttonContent={t(props.label) ?? ''}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
    />
  );
});

/**
 * A component that can be used in autoforms (uniforms)
 */
export default ColorPickerField;
