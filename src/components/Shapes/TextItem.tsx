import { Text as KonvaText, Transformer } from "react-konva";
import { ShapeType } from "../Panels/ItemPanel";
import Konva from "konva";
import { RefObject, useEffect, useRef } from "react";
import { TextConfig } from "konva/lib/shapes/Text";
import { moveShape, selectShape, transformRectangleShape } from "@/state";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import { LIMITS } from "@/constants/constants";

interface TextItemProps extends TextConfig {
  id: string;
  type: ShapeType;
  isSelected: boolean;
}

export default function TextItem(props: TextItemProps) {
  const { id, type, isSelected, ...shapeProps } = props;
  const shapeRef = useRef<Konva.Text>(null);
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

  const handleTransform = () => {
    if (shapeRef.current) {
      transformRectangleShape(shapeRef, id);
    }
  };

  function boundBoxCallbackForText(oldBox: Box, newBox: Box): Box {
    if (Math.abs(newBox.width) < LIMITS.TEXT.MIN) {
      return oldBox;
    }
    return newBox;
  }

  return (
    <>
      <KonvaText
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
        ref={shapeRef}
        {...shapeProps}
        draggable
        perfectDrawEnabled={false}
      />
      {isSelected && (
        <Transformer
          anchorSize={10}
          borderDash={[12, 2]}
          ref={transformerRef}
          anchorCornerRadius={10}
          rotationSnaps={[0, 90, 180, 270]}
          enabledAnchors={[
            "middle-left",
            "middle-right",
            "top-center",
            "bottom-center",
          ]}
          padding={10}
          boundBoxFunc={boundBoxCallbackForText}
        />
      )}
    </>
  );
}
