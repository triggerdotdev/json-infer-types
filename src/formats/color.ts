export type JSONColorFormat = {
  name: "color";
  variant: "hex" | "rgb" | "hsl";
};

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const rgbRegex =
  /^rgba?\((\d{1,3})(,|\s+)\s*(\d{1,3})(,|\s+)\s*(\d{1,3})(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;

const hslRegex =
  /^hsla?\((\d{1,3})(,|\s+)\s*(\d{1,3}%)(,|\s+)\s*(\d{1,3}%)(,\s*0?.\d{1,3})?(\s+\/\s+0?.\d{1,3})?\)$/;

export function inferColor(value: string): JSONColorFormat | undefined {
  if (hexRegex.test(value)) {
    return {
      name: "color",
      variant: "hex",
    };
  }

  if (rgbRegex.test(value)) {
    return {
      name: "color",
      variant: "rgb",
    };
  }

  if (hslRegex.test(value)) {
    return {
      name: "color",
      variant: "hsl",
    };
  }

  return undefined;
}
