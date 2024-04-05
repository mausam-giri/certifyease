import {
  KonvaNodeComponent,
  Rect as KonvaRect,
  Transformer,
} from "react-konva";

import { ShapeType } from "../template/ItemPanel";
import {
  ComponentProps,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Box, TransformerConfig } from "konva/lib/shapes/Transformer";
import { ShapeConfig } from "konva/lib/Shape";
import { Rect } from "konva/lib/shapes/Rect";
import Konva from "konva";
import { moveShape, selectShape, transformRectangleShape } from "@/state";
import { LIMITS } from "@/constants/constants";

interface RectangleItemProps extends ShapeConfig {
  id: string;
  type: ShapeType;
  isSelected: boolean;
}
export default function RectangleItem(props: RectangleItemProps) {
  const { id, type, isSelected, ...shapeProps } = props;
  const shapeRef: RefObject<Konva.Rect> = useRef(null);
  const transformerRef: RefObject<Konva.Transformer> = useRef(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes();
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleSelect = useCallback(
    (evt: KonvaEventObject<MouseEvent>) => {
      evt.cancelBubble = true;
      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (evt: KonvaEventObject<DragEvent>) => {
      moveShape(id, evt);
    },
    [id]
  );

  const handleTransform = useCallback(
    (evt: KonvaEventObject<Event>) => {
      if (shapeRef) {
        transformRectangleShape(shapeRef, id, evt);
      }
    },
    [id]
  );

  function boundBoxCallbackForRectangle(oldBox: Box, newBox: Box): Box {
    if (
      newBox.width < LIMITS.RECT.MIN ||
      newBox.height < LIMITS.RECT.MIN ||
      newBox.width > LIMITS.RECT.MAX ||
      newBox.height > LIMITS.RECT.MAX
    ) {
      return oldBox;
    }
    return newBox;
  }

  return (
    <>
      <KonvaRect
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
      />
      {isSelected && (
        <Transformer
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          boundBoxFunc={boundBoxCallbackForRectangle}
        />
      )}
    </>
  );
}
