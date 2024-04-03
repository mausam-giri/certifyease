import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import {
  Image as KonvaImage,
  Rect,
  Layer,
  Stage,
  Text,
  Transformer,
  Circle,
} from "react-konva";
import useImage from "use-image";
import { EditIcon, ImageIcon, SquareIcon, TextIcon } from "@/icons";

interface EditorProps {
  backgroundImage: string;
}

export enum ItemType {
  "CIRCLE",
  "RECTANGLE",
  "TEXT",
  "IMAGE",
}
export interface ItemTypeProps {
  type?: ItemType | string | null;
  x?: number;
  y?: number;
}

export default function Editor(props: EditorProps) {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
  });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage || !canvasParentRef.current) return;

    const handleResize = () => {
      const width = canvasParentRef.current!.clientWidth;
      const height = canvasParentRef.current!.clientHeight;

      const scaleX = width / canvasSize.width;
      const scaleY = height / canvasSize.height;
      // var scale = width / canvasSize.width;

      // stage.width(width * scale);
      // stage.batchDraw();
      // stage.scale({ x: scale, y: scale });
      setCanvasSize({ width, height, scaleX, scaleY });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [items, setItems] = useState<ItemTypeProps[]>([]);
  const [itemType, setItemType] = useState<ItemType | null>(null);
  const [dragDropData, setDragDropData] = useState<ItemTypeProps>({});
  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    itemType: ItemType
  ) {
    setItemType(itemType);
    e.currentTarget.classList.add("less-visible");
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>): void {
    setItemType(null);
    e.currentTarget.classList.remove("less-visible");
  }

  const [image] = useImage(props.backgroundImage);
  const BackgroundImage = () => {
    return (
      <KonvaImage
        x={0}
        y={0}
        width={stageRef.current?.getSize().width}
        height={stageRef.current?.getSize().height}
        image={image}
        listening={false}
        draggable={false}
      />
    );
  };

  const getItem = (item: ItemTypeProps | undefined) => {
    if (!item) return;
    switch (item.type) {
      case ItemType.CIRCLE:
        return <Circle x={item.x} y={item.y} fill="blue" radius={20} />;
      case ItemType.RECTANGLE:
        return (
          <Rect
            x={item.x}
            y={item.y}
            fill="blue"
            width={20}
            height={20}
            draggable
          />
        );
      case ItemType.TEXT:
        return <Text x={item.x} y={item.y} text="Click here" draggable />;
    }
  };

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    stage.setPointersPositions(e);
    const scale = stage.scaleX() ?? 1;
    const position = stage.getPointerPosition();

    const item: ItemTypeProps = {
      x: ((position?.x ?? 0) - stage.x()) / scale,
      y: ((position?.y ?? 0) - stage.y()) / scale,
      type: itemType,
    };
    setDragDropData(item);
  }
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setItems([...items, dragDropData]);
    setDragDropData({});
  }

  const stageItems = items.map(getItem);

  const previewItem = getItem(dragDropData);

  return (
    <div className="flex-1 flex">
      <div
        className="flex-1"
        ref={canvasParentRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Stage
          ref={stageRef}
          width={canvasSize.width}
          height={canvasSize.height}
          scaleX={canvasSize.scaleX}
          scaleY={canvasSize.scaleY}
        >
          <Layer>
            <BackgroundImage />
            {stageItems}
            {previewItem}
            <Transformer />
          </Layer>
        </Stage>
      </div>
      <div className="w-[200px] flex flex-col p-4 bg-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Template name</p>
          <EditIcon className="w-6 h-6 cursor-pointer hover:bg-gray-50 p-1 rounded-lg" />
        </div>
        <div className="mt-4">
          <p className="font-medium border-b mb-2 border-black">Component</p>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="select-none cursor-pointer p-3 rounded shadow border bg-white flex items-center flex-col gap-2"
              onDragStart={(e) => handleDragStart(e, ItemType.TEXT)}
              onDragEnd={handleDragEnd}
              draggable
            >
              <TextIcon className="h-4 w-4" />
              <span className="text-sm">Text</span>
            </div>
            <div
              className="select-none cursor-pointer p-3 rounded shadow border bg-white flex items-center flex-col gap-2"
              onDragStart={(e) => handleDragStart(e, ItemType.IMAGE)}
              onDragEnd={handleDragEnd}
              draggable
            >
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm">Image</span>
            </div>
            <div
              className="select-none cursor-pointer p-3 rounded shadow border bg-white flex items-center flex-col gap-2"
              onDragStart={(e) => handleDragStart(e, ItemType.RECTANGLE)}
              onDragEnd={handleDragEnd}
              draggable
            >
              <SquareIcon className="h-4 w-4" />
              <p className="text-sm">Rectangle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
