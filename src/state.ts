import { createStore } from "@halka/state";
import { produce, Draft } from "immer";
import { nanoid } from "nanoid";
import clamp from "./utils/clamp";

import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./constants/constants";

import Konva from "konva";
// import { KonvaEventObject } from "konva/lib/Node";
import { RefObject } from "react";
// import { Rect } from "konva/lib/shapes/Rect";
import { Text as KonvaText, TextConfig } from "konva/lib/shapes/Text";
import { Shape, ShapeConfig } from "konva/lib/Shape";
// import { TextConfig } from "konva/lib/shapes/Text";
const APP_NAMESPACE = "__certifyease_item__";

export interface State {
  selected: string | null;
  shapes: { [key: string]: ShapeConfig };
  shapeRefs: { [key: string]: RefObject<Shape> };
}

const baseState: State = {
  selected: null,
  shapes: {},
  shapeRefs: {},
};

export const useShapes = createStore(() => {
  const storedData = localStorage.getItem(APP_NAMESPACE);
  const initialState = storedData ? JSON.parse(storedData) : null;

  return { ...baseState, ...initialState };
});

const setState = (fn: (draft: Draft<State>) => void) =>
  useShapes.set(produce(fn));

export const saveEditorItem = () => {
  const state = useShapes.get();

  localStorage.setItem(APP_NAMESPACE, JSON.stringify(state.shapes));
};
export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);

  useShapes.set(baseState);
};
interface ItemPositionProps {
  x: number;
  y: number;
}
interface TextItemProps extends TextConfig {}

export const TextItem = (props: TextItemProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      x: props.x,
      y: props.y,
      text: props.text || DEFAULTS.TEXT.TEXT,
      fontSize: DEFAULTS.TEXT.FONTSIZE,
      fontFamily: DEFAULTS.TEXT.FONTFAMILY,
      fill: DEFAULTS.TEXT.FILL,
    };
  });
};
export const createRectangle = ({ x, y }: ItemPositionProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      strokeWidth: DEFAULTS.RECT.STROKE_WIDTH,
      cornerRadius: DEFAULTS.RECT.CORNER_RADIUS,
      x,
      y,
    };
  });
};

export const createCircle = ({ x, y }: ItemPositionProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.CIRCLE.FILL,
      stroke: DEFAULTS.CIRCLE.STROKE,
      x,
      y,
    };
  });
};

export const createText = ({ x, y }: ItemPositionProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.TEXT,
      text: DEFAULTS.TEXT.TEXT,
      fontSize: DEFAULTS.TEXT.FONTSIZE,
      fontFamily: DEFAULTS.TEXT.FONTFAMILY,
      fill: DEFAULTS.TEXT.FILL,
      x,
      y,
    };
  });
};

export const createImage = ({ x, y }: ItemPositionProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.IMAGE,
      width: DEFAULTS.IMAGE.WIDTH,
      height: DEFAULTS.IMAGE.HEIGHT,
      image: DEFAULTS.IMAGE.SRC,
      x,
      y,
    };
  });
};

export const selectShape = (id: string) => {
  setState((state) => {
    state.selected = id;
  });
};

export const deleteShape = (id: string) => {
  setState((state) => {
    const currentShapes = Object.entries(state.shapes);
    const newShapes = Object.fromEntries(
      currentShapes.filter(([shapeId, _]) => shapeId !== id)
    );
    state.shapes = newShapes;
    state.selected = null;
  });
  // useShapes.set((state: State) => {
  //   const shapeCopy = Object.assign({}, state);
  //   shapeCopy.selected = null;
  //   delete shapeCopy.shapes[id];
  //   return shapeCopy;
  // });
};

export const bindShapeRef = (id: string, ref: RefObject<Shape>) => {
  setState((state) => {
    state.shapeRefs[id] = ref;
  });
};

export const moveShapeDown = (id: string) => {
  // id &&
  setState((state) => {});
};
export const moveShapeUp = (id: string) => {
  id &&
    setState((state) => {
      const shape = state.shapes[id];
      shape.current?.moveUp();
      console.log(shape.current?.getZIndex());
    });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (
  id: string,
  event: Konva.KonvaEventObject<DragEvent>
) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.currentTarget.x();
      shape.y = event.currentTarget.y();
    }
  });
};
export interface UpdateAttributeProps {
  attr: string;
  value: string | number | boolean | Array<number> | HTMLImageElement;
}
export const updateAttribute = ({ attr, value }: UpdateAttributeProps) => {
  setState((state) => {
    state.shapes[state.selected!] = {
      ...state.shapes[state.selected!],
      [attr]: value,
    };

    // const shape = state.selected && state.shapes[state.selected];

    // if (shape) {
    //   shape[attr] = value;
    // }
  });
};

export function transformRectangleShape<T extends Shape>(
  node: RefObject<T>,
  id: string
) {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  if (!node) return;
  const scaleX = node.current?.scaleX();
  const scaleY = node.current?.scaleY();

  // we will reset the scale back
  node.current?.scaleX(1);
  node.current?.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape && scaleX && scaleY) {
      shape.x = node.current?.x();
      shape.y = node.current?.y();

      shape.rotation = node.current?.rotation();

      shape.width = clamp(
        (node.current?.width() || 1) * scaleX,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        (node.current?.height() || 1) * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
}

export function transformText(nodeRef: RefObject<KonvaText>, id: string) {
  if (nodeRef.current) {
    const textNode = nodeRef.current;
    const newWidth = textNode.width() * textNode.scaleX();
    const newHeight = textNode.height() * textNode.scaleY();

    // textNode.setAttrs({
    //   width: newWidth,
    //   scaleX: 1
    // })
    setState((state) => {
      const shape = state.shapes[id];
      shape.width = newWidth;
      shape.height = newHeight;
      shape.scaleX = 1;
      shape.scaleY = 1;
    });
  }
}
