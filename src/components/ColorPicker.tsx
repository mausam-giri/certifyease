import { DropperIcon } from "@/icons";
import React, { useState, useRef } from "react";

interface ColorPickerProps {
  initialColor?: string;
  onColorChange: (color: string) => void;
  label?: string;
  name?: string;
}

export default function ColorPicker(props: ColorPickerProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);

  function handleColorPicker() {
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
    }
  }

  function handleInputTextColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const color = event.currentTarget.value;
    props.onColorChange(color);
  }

  function handleInputColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    const color = event.currentTarget.value;
    props.onColorChange(color);
  }

  return (
    <div>
      <label
        htmlFor={props.name || "fill"}
        className="py-1/2 text-sm whitespace-nowrap"
      >
        {props.label || "Color"}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name={props.name || "fill"}
          id={props.name || "fill"}
          value={props.initialColor}
          placeholder="#000000"
          onChange={handleInputTextColorChange}
          maxLength={7}
        />
        <div className="h-full relative">
          <div
            className="cursor-pointer rounded-full p-2 bg-slate-900 h-full shadow-md"
            onClick={handleColorPicker}
            style={{ backgroundColor: props.initialColor }}
          >
            <DropperIcon className="filter invert mix-blend-difference" />
          </div>
          <input
            type="color"
            ref={colorPickerRef}
            name="color-picker"
            id="color-picker"
            className="absolute top-0 right-full opacity-0 !w-[0px] !h-[0px] pointer-events-none"
            onChange={handleInputColorChange}
          />
        </div>
      </div>
    </div>
  );
}
