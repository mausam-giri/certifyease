import { Rect as KonvaRect, Transformer } from "react-konva";

import { ShapeType } from "../template/ItemPanel";
import { RefObject, useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import { ShapeConfig } from "konva/lib/Shape";
import Konva from "konva";
import { moveShape, selectShape, transformRectangleShape } from "@/state";
import { LIMITS } from "@/constants/constants";

export interface RectangleItemProps extends ShapeConfig {
  id: string;
  type: ShapeType;
  isSelected: boolean;
}
export default function RectangleItem(props: RectangleItemProps) {
  const { id, type, isSelected, ...shapeProps } = props;

  const shapeRef: RefObject<Konva.Rect> = useRef(null);
  const transformerRef: RefObject<Konva.Transformer> = useRef(null);

  useEffect(() => {
    if (props.isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()!.batchDraw();
    }
  }, [JSON.stringify(props)]);

  const handleSelect = (evt: KonvaEventObject<MouseEvent>) => {
    evt.cancelBubble = true;
    selectShape(id);
  };

  const handleDrag = (evt: KonvaEventObject<DragEvent>) => {
    moveShape(id, evt);
  };

  const handleTransform = (evt: KonvaEventObject<Event>) => {
    if (shapeRef.current) {
      transformRectangleShape(shapeRef, id);
    }
  };

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
