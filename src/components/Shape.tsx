import { State, useShapes } from "../state";
import { SHAPE_TYPES } from "../constants/constants";
import RectangleItem from "./Shapes/RectangleItem";
import TextItem from "./Shapes/TextItem";

interface ShapeProps {
  shape: any;
}

export default function Shape(props: ShapeProps) {
  const isSelected = useShapes(
    (state: State) => state.selected === props.shape.id
  );
  if (props.shape.type === SHAPE_TYPES.RECT) {
    return <RectangleItem {...props.shape} isSelected={isSelected} />;
  } else if (props.shape.type === SHAPE_TYPES.CIRCLE) {
    return <TextItem {...props.shape} isSelected={isSelected} />;
  }

  return null;
}
