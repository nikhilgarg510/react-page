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
  console.log('[ColorPickerField] Render - value:', props.value, '-> using:', currentValue, 'label:', props.label);
  const parsedColor = stringToColor(currentValue);
  console.log('[ColorPickerField] Parsed color:', parsedColor);

  // Don't update during dragging, only on complete
  const handleChange = (v: any) => {
    console.log('[ColorPickerField] onChange - color changing (not saving yet):', v);
    // Don't call props.onChange here to avoid re-renders while dragging
  };

  const handleChangeComplete = (v: any) => {
    const colorString = colorToString(v);
    console.log('[ColorPickerField] onChangeComplete - final value:', colorString);
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
