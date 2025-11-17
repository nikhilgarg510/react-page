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
