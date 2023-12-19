export const FONT_SIZE = {
  l: {
    fontSize: 24,
    lineHeight: 30,
  },
  m: {
    fontSize: 16,
    lineHeight: 22,
  },
  s: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const FONT_WEIGHT = {
  regular: { fontWeight: "normal" },
  medium: { fontWeight: "500" },
  bold: { fontWeight: "bold" },
} as const;

export type FontSize = keyof typeof FONT_SIZE;
export type FontWeight = keyof typeof FONT_WEIGHT;
