import { useCallback, useEffect } from "react";
import ColorPicker from "../ColorPicker";
// import ItemPropertyButton from "../ItemPropertyButton";
// import {
//   NoOutlineIcon,
//   StrokeIcon,
//   Dash2Icon,
//   Dash3Icon,
//   DashSmallIcon,
// } from "@/icons";
import {
  State,
  UpdateAttributeProps,
  updateAttribute,
  useShapes,
} from "@/state";
import { ShapeConfig } from "konva/lib/Shape";
// import clsx from "clsx";

export default function RectangleProperty() {
  const selectedShape: ShapeConfig = useShapes(
    (state: State) => state.shapes[state.selected!]
  );

  useEffect(() => {
    console.log(selectedShape);
  }, [selectedShape]);

  function handleSliderChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    updateAttr({
      attr: evt.target.name,
      value: parseInt(evt.currentTarget.value) || 0,
    });
  }

  const updateAttr = useCallback(({ attr, value }: UpdateAttributeProps) => {
    updateAttribute({ attr, value });
  }, []);

  function handleBackgroundColorChange(color: string): void {
    updateAttr({ attr: "fill", value: color });
  }

  function handlePropChange(
    attr: string,
    parser?: (value: string) => string | number
  ) {
    return (value: string) => {
      let val = parser?.(value) ?? value;
      if (parser && Number.isNaN(val)) val = 0;
      updateAttr({ attr, value: val });
    };
  }

  // function handleDashButtonClick(
  //   evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) {
  //   const propName = evt.currentTarget.name;

  //   if (propName === "no-stroke") {
  //     updateAttr({
  //       attr: "strokeWidth",
  //       value: 0,
  //     });
  //   }
  //   if (propName === "no-dash") {
  //     updateAttr({
  //       attr: "dashEnabled",
  //       value: false,
  //     });
  //   }
  //   if (propName === "dash-small") {
  //     updateAttr({
  //       attr: "dashEnabled",
  //       value: [12, 2],
  //     });
  //   }
  //   if (propName === "dash-medium") {
  //     updateAttr({
  //       attr: "dash",
  //       value: [6, 2],
  //     });
  //   }
  //   if (propName === "dash-large") {
  //     updateAttr({
  //       attr: "dash",
  //       value: [2, 2],
  //     });
  //   }
  // }

  // Stroke Feature is to included

  return (
    <div className="space-y-2">
      <ColorPicker
        initialColor={selectedShape.fill}
        onColorChange={handleBackgroundColorChange}
        label="Background Color"
      />
      {/* <div>
        <p className="text-sm">Stroke</p>
        <div className="grid grid-cols-5">
          <ItemPropertyButton name="no-stroke" className={clsx("rounded-s-lg")}>
            <NoOutlineIcon className={clsx("h-5 w-5")} />
          </ItemPropertyButton>

          <ItemPropertyButton name="no-dash" onClick={handleDashButtonClick}>
            <StrokeIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton name="dash-small" onClick={handleDashButtonClick}>
            <Dash2Icon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton
            name="dash-medium"
            onClick={handleDashButtonClick}
          >
            <Dash3Icon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton
            className="rounded-e-lg"
            name="dash-large"
            onClick={handleDashButtonClick}
          >
            <DashSmallIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div> */}
      {selectedShape.strokeWidth !== 0 && (
        <div>
          <div className="mt-4 flex items-start justify-between">
            <label htmlFor="" className="whitespace-nowrap text-sm">
              Stroke Width
            </label>
            <input
              type="text"
              name="strokeWidth"
              id="strokeWidth"
              className="w-[60px] h-8 bg-transparent text-center"
              value={selectedShape.strokeWidth}
              onChange={handleSliderChange}
            />
          </div>
          <input
            type="range"
            className="custom-input-slider"
            name="strokeWidth"
            min={0}
            max={100}
            value={selectedShape.strokeWidth}
            onChange={handleSliderChange}
          />
        </div>
      )}
      <ColorPicker
        initialColor={selectedShape.stroke?.toString()}
        onColorChange={handlePropChange("stroke")}
        label="Stroke Color"
      />
      <div>
        <div className="mt-4 flex items-start justify-between">
          <label htmlFor="" className="whitespace-nowrap text-sm">
            Corner Radius
          </label>
          <input
            type="text"
            name="cornerRadius"
            id="cornerRadius"
            className="w-[60px] h-8 bg-transparent text-center"
            value={selectedShape.cornerRadius}
            onChange={handleSliderChange}
          />
        </div>
        <input
          type="range"
          className="custom-input-slider"
          name="cornerRadius"
          min={0}
          max={100}
          value={selectedShape.cornerRadius}
          onChange={handleSliderChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="rotation" className="text-sm">
          Rotation ⦛
        </label>
        <div className="flex items-baseline">
          <input
            type="number"
            name="rotation"
            className="input-no-arrow w-[60px] h-8 bg-transparent text-center"
            value={selectedShape.rotation}
            onChange={(e) =>
              handlePropChange("rotation", parseFloat)(e.target.value)
            }
          />
          <div className="text-xs ml-1">deg</div>
        </div>
      </div>
    </div>
  );
}
