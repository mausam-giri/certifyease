import { SHAPE_TYPES } from "@/constants/constants";
import {
  CenterAlignIcon,
  DropperIcon,
  JustifyAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "@/icons";
import { State, useShapes } from "@/state";
import { useEffect, useRef, useState } from "react";

const FONT_API_KEY = "AIzaSyDyYP6zaxyZKvPiT9-Z6hMlSTIkJmHTvXc";

interface Font {
  family: string;
  category: string;
}

interface FontSelectorProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}
const FontSelector = (props: FontSelectorProps) => {
  const [fonts, setFonts] = useState<Font[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFonts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${FONT_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch fonts");
      }
      const data = await response.json();
      const fontData = data.items.map((font: any) => ({
        family: font.family,
        category: font.category,
      }));
      setFonts(fontData);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!fonts) {
      fetchFonts();
    }
  }, [fonts]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelectedFont(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <select value={props.selectedFont} onChange={handleChange}>
        <option value="">Select a font</option>
        {fonts &&
          fonts.map((font) => (
            <option key={font.family} value={font.family}>
              {font.family}
            </option>
          ))}
      </select>
      <p style={{ fontFamily: props.selectedFont }}>
        This is a sample paragraph with the selected font.
      </p>
    </div>
  );
};

export default function TextItemProperty() {
  const selectedShape: State = useShapes();
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  function handleColorPicker(evt: React.MouseEvent<HTMLDivElement>) {
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
      evt.currentTarget.style.backgroundColor = colorPickerRef.current.value;
    }
  }

  function handleInputTextColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const color = event.currentTarget.value;
    // if(/^#([A-Fa-f0-9]{6})$/.test(color)){}
    setSelectedColor(color);
    if (colorPickerRef.current) {
      colorPickerRef.current.value = color;
    }
  }

  function handleInputColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    const color = event.currentTarget.value;
    setSelectedColor(color);
  }

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="text" className="text-sm">
          Label Text
        </label>
        <input type="text" name="text" id="text" />
      </div>
      <div>
        <label htmlFor="fontSize" className="text-sm">
          Font Size
        </label>
        <div className="relative flex items-center">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            className="m-0 rounded-none bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg py-2 px-3 h-10 focus:ring-gray-100 focus:ring-2 focus:outline-none z-[14]"
          >
            <svg
              className="w-3 h-3 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="fontSize"
            name="fontSize"
            className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 rounded-none z-[12]"
            placeholder="999"
            required
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className="m-0 rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg py-2 px-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none z-[13]"
          >
            <svg
              className="w-3 h-3 text-gray-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="gap-2">
        <label htmlFor="fill" className="py-1/2 text-sm whitespace-nowrap">
          Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="fill"
            id="fill"
            className=""
            value={selectedColor}
            placeholder="#000000"
            onChange={handleInputTextColorChange}
            maxLength={7}
            // pattern="#[A-Fa-f0-9]{6}"
          />
          <div className="h-full relative">
            <div
              className="cursor-pointer rounded-full p-2 bg-slate-900 h-full shadow-md"
              onClick={handleColorPicker}
              style={{ backgroundColor: selectedColor }}
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
      <div>
        <p className="text-sm">Alignment</p>
        <div className="grid grid-cols-4">
          <button
            type="button"
            className="m-0 rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg py-2 px-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none z-[13] flex items-center justify-center"
          >
            <LeftAlignIcon className="h-3 w-3 text-gray-900" />
          </button>
          <button
            type="button"
            className="m-0 rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300 py-2 px-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none z-[13] flex items-center justify-center"
          >
            <CenterAlignIcon className="h-3 w-3 text-gray-900" />
          </button>
          <button
            type="button"
            className="m-0 rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300 py-2 px-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none z-[13] flex items-center justify-center"
          >
            <RightAlignIcon className="h-3 w-3 text-gray-900" />
          </button>
          <button
            type="button"
            className="m-0 rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg py-2 px-3 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none z-[13] flex items-center justify-center"
          >
            <JustifyAlignIcon className="h-3 w-3 text-gray-900" />
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm">Decoration</p>
        <div className=""></div>
      </div>
    </div>
  );
}
