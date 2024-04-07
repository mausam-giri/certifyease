export const SHAPE_TYPES = {
  RECT: "rect",
  CIRCLE: "circle",
  TEXT: "text",
  IMAGE: "image",
};

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
  IMAGE: {},
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
};
export const DRAG_DATA_KEY = "__drag_element_payload__";
