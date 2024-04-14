import TextItemProperty from "../Properties/TextItemProperty";
import RectangleProperty from "../Properties/RectangleProperty";
import { State, useShapes } from "@/state";
import { SHAPE_TYPES } from "@/constants/constants";
import ImageProperty from "../Properties/ImageProperty";

const shapeSelector = (state: State) => state.shapes[state.selected!];

export default function PropertiesPanel() {
  const selectedShape = useShapes(shapeSelector);
  console.log(selectedShape);
  return (
    <div>
      <h2 className="border-gray-500 text-gray-700 border-b mb-2">
        <span className="px-4 font-medium">Cutomization</span>
      </h2>
      <div className="px-4">
        {selectedShape.type === SHAPE_TYPES.RECT && <RectangleProperty />}
        {selectedShape.type === SHAPE_TYPES.TEXT && <TextItemProperty />}
        {selectedShape.type === SHAPE_TYPES.IMAGE && <ImageProperty />}
      </div>
    </div>
  );
}
{
  /* <FontSelector
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          /> */
}
