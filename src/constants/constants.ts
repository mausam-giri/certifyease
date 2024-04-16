export const SHAPE_TYPES = {
  RECT: "rect",
  CIRCLE: "circle",
  TEXT: "text",
  IMAGE: "image",
};
const sampleImage = new Image();
sampleImage.crossOrigin = "Anonymous";
sampleImage.src = "https://picsum.photos/200/300";

export const DEFAULTS = {
  CANVAS: {
    WIDTH: 700,
    HEIGHT: 700,
  },
  RECT: {
    STROKE: "#000000",
    FILL: "#ffffff",
    WIDTH: 150,
    HEIGHT: 100,
    ROTATION: 0,
    STROKE_WIDTH: 1,
    CORNER_RADIUS: 0,
  },
  CIRCLE: {
    STROKE: "#000000",
    FILL: "#ffffff",
    RADIUS: 50,
  },
  TEXT: {
    TEXT: "Sample Text",
    FONTSIZE: 16,
    FONTFAMILY: "Calibri",
    FILL: "#000000",
  },
  IMAGE: {
    WIDTH: 100,
    HEIGHT: 150,
    SRC: sampleImage,
  },
};
export const LIMITS = {
  RECT: {
    MAX: 1000,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 500,
    MIN: 5,
  },
  TEXT: {
    MIN: 20,
  },
  IMAGE: {
    MIN: 20,
    MAX: 500,
  },
};

export const FONT_OPTIONS = [
  "Calibri",
  "Merriweather",
  "Comic Neue",
  "Source Sans Pro",
  "Space Mono",
  "Roboto",
];

export const DRAG_DATA_KEY = "__drag_element_payload__";
