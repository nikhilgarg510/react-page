import type { RgbaColor } from 'react-colorful';
import parse from 'color-parse';

export const colorToString = (c?: RgbaColor | null) => {
  const result = c ? `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a ?? 1})` : undefined;
  return result;
};

export const stringToColor = (c: string): RgbaColor | null => {
  if (!c) {
    return null;
  }

  const match = parse(c);

  if (!match || match.space !== 'rgb') {
    console.warn('[stringToColor] Invalid color format:', c);
    return null;
  }

  const result = {
    r: match.values[0],
    g: match.values[1],
    b: match.values[2],
    a: match.alpha ?? 1,
  };
  return result;
};

/**
 * Convert RGBA color to hex string
 */
export const rgbaToHex = (color: RgbaColor): string => {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16).padStart(2, '0');
    return hex;
  };

  const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;

  // Include alpha if it's not fully opaque
  if (color.a !== undefined && color.a < 1) {
    return `${hex}${toHex(color.a * 255)}`;
  }

  return hex;
};

/**
 * Convert hex string to RGBA color
 */
export const hexToRgba = (hex: string): RgbaColor | null => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Validate hex format
  if (!/^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(cleanHex)) {
    return null;
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Check if alpha channel is present
  let a = 1;
  if (cleanHex.length === 8) {
    a = parseInt(cleanHex.substring(6, 8), 16) / 255;
  }

  return { r, g, b, a };
};
