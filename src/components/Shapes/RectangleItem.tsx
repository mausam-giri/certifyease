import { Rect as KonvaRect, Transformer } from "react-konva";

import { ShapeType } from "../Panels/ItemPanel";
import { RefObject, useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import Konva from "konva";
import {
  bindShapeRef,
  moveShape,
  selectShape,
  transformRectangleShape,
} from "@/state";
import { LIMITS } from "@/constants/constants";
import { RectConfig } from "konva/lib/shapes/Rect";

export interface RectangleItemProps extends RectConfig {
  id: string;
  type: ShapeType;
  isSelected: boolean;
}
export default function RectangleItem(props: RectangleItemProps) {
  const { id, type, isSelected, ...shapeProps } = props;

  const shapeRef: RefObject<Konva.Rect> = useRef(null);
  const transformerRef: RefObject<Konva.Transformer> = useRef(null);

  useEffect(() => {
    bindShapeRef(id, shapeRef);
  }, [shapeRef.current]);

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

  const handleTransform = () => {
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
        {...shapeProps}
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
        perfectDrawEnabled={false}
      />
      {isSelected && (
        <Transformer
          anchorSize={10}
          borderDash={[6, 2]}
          rotationSnaps={[0, 90, 180, 270]}
          ref={transformerRef}
          boundBoxFunc={boundBoxCallbackForRectangle}
          anchorCornerRadius={10}
          anchorStyleFunc={(anchor) => {
            if (
              anchor.hasName("top-center") ||
              anchor.hasName("bottom-center")
            ) {
              anchor.height(6);
              anchor.offsetY(3);
              anchor.width(30);
              anchor.offsetX(15);
            }
            if (
              anchor.hasName("middle-left") ||
              anchor.hasName("middle-right")
            ) {
              anchor.height(30);
              anchor.offsetY(15);
              anchor.width(6);
              anchor.offsetX(3);
            }
          }}
        />
      )}
    </>
  );
}
