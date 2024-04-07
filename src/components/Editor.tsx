import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { EditIcon } from "@/icons";
import PropertiesPanel from "./template/PropertiesPanel";
import ItemPanel from "./template/ItemPanel";
import { State, clearSelection, createRectangle, useShapes } from "@/state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "@/constants/constants";
import Shape from "./Shape";
import { ShapeConfig } from "konva/lib/Shape";

interface EditorProps {
  backgroundImage: string;
}

export default function Editor(props: EditorProps) {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      if (canvasParentRef.current) {
        const width = canvasParentRef.current.offsetWidth;
        const height = canvasParentRef.current.offsetHeight;

        setCanvasSize({
          width,
          height,
        });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const shapes = useShapes((state) => Object.entries(state.shapes)) as [
    string,
    ShapeConfig
  ][];
  const shapeSelectorState: State = useShapes();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const draggedData = event.nativeEvent.dataTransfer?.getData(DRAG_DATA_KEY);
    console.log(event, draggedData);
    if (draggedData && stageRef.current) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } =
        JSON.parse(draggedData);
      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT && coords) {
        console.log(type, "state ", shapes, "coords", coords);
        console.log("creating rectangle at coords", {
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      }
    }
  }, []);

  return (
    <div className="flex-1 flex relative">
      <div className="flex-1 relative">
        <div
          className="overflow-hidden rounded absolute w-[calc(100%-8vw)] h-[calc(100%-10vh)] bg-gray-200 right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2"
          ref={canvasParentRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Stage
            ref={stageRef}
            width={canvasSize.width || 0}
            height={canvasSize.height || 0}
            onClick={clearSelection}
          >
            <Layer>
              <BackgroundImage />
              {shapes.map((shape) => (
                <Shape key={shape[0]} shape={{ ...shape[1], id: shape[0] }} />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <div className="w-[240px] flex flex-col py-4 bg-gray-200">
        <div className="px-4">
          {/* <PropertiesPanel /> */}
          {shapeSelectorState.selected ? <PropertiesPanel /> : <ItemPanel />}
          {/* <ItemPanel /> */}
        </div>
      </div>
    </div>
  );
}
