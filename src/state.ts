import { createStore } from "@halka/state";
import { produce, Draft } from "immer";
import { nanoid } from "nanoid";
import clamp from "./utils/clamp";

import { DEFAULTS, LIMITS, SHAPE_TYPES } from "./constants/constants";

import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject } from "react";
import { Rect } from "konva/lib/shapes/Rect";
import { ShapeConfig } from "konva/lib/Shape";
const APP_NAMESPACE = "__certifyease_item__";

export interface State {
  selected: string | null;
  shapes: { [key: string]: ShapeConfig };
}

const baseState: State = {
  selected: null,
  shapes: {},
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
export const TextItem = ({ x, y }: ItemPositionProps) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      x,
      y,
      text: DEFAULTS.TEXT.TEXT,
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

export const selectShape = (id: string) => {
  setState((state) => {
    state.selected = id;
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

export const updateAttribute = (attr: string, value: string | number) => {
  setState((state) => {
    const shape = state.selected && state.shapes[state.selected];

    if (shape) {
      shape[attr] = value;
    }
  });
};
export const transformRectangleShape = (node: RefObject<Rect>, id: string) => {
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
};
