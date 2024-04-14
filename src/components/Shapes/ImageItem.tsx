import Konva from "konva";
import { ImageConfig } from "konva/lib/shapes/Image";
import { RefObject, useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
import { ShapeType } from "../Panels/ItemPanel";
import { KonvaEventObject } from "konva/lib/Node";
import { DEFAULTS, LIMITS } from "@/constants/constants";
import { Box } from "konva/lib/shapes/Transformer";
import { moveShape, selectShape, transformRectangleShape } from "@/state";

export interface ImageItemProps extends ImageConfig {
  id: string;
  type: ShapeType;
  isSelected: boolean;
}

export default function ImageItem(props: ImageItemProps) {
  const { id, type, isSelected, ...shapeProps } = props;
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef: RefObject<Konva.Transformer> = useRef(null);

  // const [sampleImage] = useImage(
  //   "https://picsum.photos/200/300.webp?random=100",
  //   "anonymous"
  // );
  // const sampleImage = <img crossOrigin="anonymous" src={DEFAULTS.IMAGE.SRC} />
  const sampleImage = new Image();
  sampleImage.src = "https://picsum.photos/200/300.webp";

  useEffect(() => {
    if (props.isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()!.batchDraw();
    }
    // console.log("use-image", sampleImage);
  }, [JSON.stringify(props)]);

  const handleSelect = (evt: KonvaEventObject<MouseEvent>) => {
    evt.cancelBubble = true;
    selectShape(id);
  };

  const handleDrag = (evt: KonvaEventObject<DragEvent>) => {
    moveShape(id, evt);
  };

  const handleTransform = () => {
    if (imageRef.current) {
      transformRectangleShape(imageRef, id);
    }
  };
  function boundBoxCallbackForRectangle(oldBox: Box, newBox: Box): Box {
    if (
      newBox.width < LIMITS.IMAGE.MIN ||
      newBox.height < LIMITS.IMAGE.MIN ||
      newBox.width > LIMITS.IMAGE.MAX ||
      newBox.height > LIMITS.IMAGE.MAX
    ) {
      return oldBox;
    }
    return newBox;
  }

  return (
    <>
      <KonvaImage
        {...shapeProps}
        image={sampleImage}
        ref={imageRef}
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
        draggable
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
