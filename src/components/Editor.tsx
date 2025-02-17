import Konva from "konva";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
// import { EditIcon } from "@/icons";
import PropertiesPanel from "./Panels/PropertiesPanel";
import ItemPanel from "./Panels/ItemPanel";
import {
  State,
  clearSelection,
  createImage,
  createRectangle,
  createText,
  deleteShape,
  moveShapeDown,
  moveShapeUp,
  useShapes,
} from "@/state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "@/constants/constants";
import Shape from "./Shape";
import { ShapeConfig } from "konva/lib/Shape";

interface EditorProps {
  backgroundImage: string;
}
export type EditorRefHandleProps = {
  saveCanvas: () => void;
  layerMoveShapeDown: () => void;
  layerMoveShapeUp: () => void;
  handleDeleteShape: () => void;
  handleDuplicateShape: () => void;
};
const Editor = forwardRef<EditorRefHandleProps, EditorProps>((props, ref) => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  Konva.pixelRatio = window.devicePixelRatio;

  function downloadURI(uri: string | undefined, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
    handleResize();
    stageRef.current?.batchDraw();
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

  useImperativeHandle(ref, () => ({
    saveCanvas() {
      var dataURL = stageRef.current?.toDataURL({ pixelRatio: 3 });
      console.log(dataURL);
      downloadURI(dataURL, "stage.png");
    },
    layerMoveShapeDown() {
      moveShapeDown(shapeSelectorState.selected!);
    },
    layerMoveShapeUp() {
      moveShapeUp(shapeSelectorState.selected!);
    },
    handleDeleteShape() {
      deleteShape(shapeSelectorState.selected!);
    },
    handleDuplicateShape() {
      if (shapeSelectorState.selected) {
        const shape = shapeSelectorState.shapes[shapeSelectorState.selected];
        const shapeType = shape.type;
        const coords = {
          x: shape.x || 0,
          y: shape.y || 0,
        };
        if (shapeType === SHAPE_TYPES.RECT && coords) {
          createRectangle({
            x: coords.x - 10,
            y: coords.y - 10,
            ...shape,
          });
        }
        if (shapeType === SHAPE_TYPES.TEXT) {
          createText({
            x: coords.x - 10,
            y: coords.y - 10,
            text: shape.text,
          });
        }
        if (shapeType === SHAPE_TYPES.IMAGE) {
          createImage({
            x: coords.x - 10,
            y: coords.y - 10,
            ...shape,
          });
        }
      }
    },
  }));

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const draggedData = event.nativeEvent.dataTransfer?.getData(DRAG_DATA_KEY);
    console.log(event, draggedData);
    if (draggedData && stageRef.current) {
      // const { offsetX, offsetY, type, clientHeight, clientWidth } =
      //   JSON.parse(draggedData);
      const { offsetX, offsetY, type } = JSON.parse(draggedData);
      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();
      if (coords) {
        if (type === SHAPE_TYPES.RECT) {
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
        if (type === SHAPE_TYPES.TEXT) {
          console.log(type, "state ", shapes, "coords", coords);
          console.log("creating rectangle at coords", {
            x: coords.x - offsetX,
            y: coords.y - offsetY,
          });
          createText({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
          });
        }
        if (type === SHAPE_TYPES.IMAGE) {
          createImage({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
          });
        }
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
            <Layer ref={layerRef}>
              <BackgroundImage />
              {shapes.map((shape) => (
                <Shape key={shape[0]} shape={{ ...shape[1], id: shape[0] }} />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <div className="w-[240px] flex flex-col py-4 bg-gray-200 relative">
        <div className="px-4">
          {/* <PropertiesPanel /> */}
          {shapeSelectorState.selected ? <PropertiesPanel /> : <ItemPanel />}
          {/* <ItemPanel /> */}
        </div>
      </div>
    </div>
  );
});

export default Editor;
