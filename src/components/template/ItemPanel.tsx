import { DRAG_DATA_KEY, SHAPE_TYPES } from "@/constants/constants";
import { ImageIcon, SquareIcon, TextIcon } from "@/icons";

export type ShapeType = keyof typeof SHAPE_TYPES;
interface ItemComponentProps {
  type: ShapeType;
  componentName: string;
  Icon: React.ElementType;
}
const ItemComponent = (props: ItemComponentProps) => {
  const { Icon } = props;

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    const type = event.currentTarget.dataset.shape;
    if (type) {
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;

      const clientWidth = event.currentTarget.clientWidth;
      const clientHeight = event.currentTarget.clientHeight;

      const dragPayload = JSON.stringify({
        type,
        offsetX,
        offsetY,
        clientWidth,
        clientHeight,
      });
      event.nativeEvent.dataTransfer?.setData(DRAG_DATA_KEY, dragPayload);
    }
  }
  return (
    <div
      className="select-none cursor-pointer p-3 rounded shadow border bg-white flex items-center flex-col gap-2"
      onDragStart={handleDragStart}
      draggable
      data-shape={props.type}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{props.componentName}</span>
    </div>
  );
};

export default function ItemPanel() {
  return (
    <aside>
      <h2>Components</h2>
      <div>
        <ItemComponent
          componentName="Text"
          type={SHAPE_TYPES.TEXT as ShapeType}
          Icon={TextIcon}
        />
        <ItemComponent
          componentName="Rectangle"
          type={SHAPE_TYPES.RECT as ShapeType}
          Icon={SquareIcon}
        />
        <ItemComponent
          componentName="Text"
          type={SHAPE_TYPES.IMAGE as ShapeType}
          Icon={ImageIcon}
        />
      </div>
    </aside>
  );
}
