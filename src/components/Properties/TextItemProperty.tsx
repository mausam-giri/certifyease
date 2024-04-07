import { SHAPE_TYPES } from "@/constants/constants";
import {
  BoldIcon,
  CenterAlignIcon,
  DropperIcon,
  ItalicIcon,
  JustifyAlignIcon,
  LeftAlignIcon,
  MinusIcon,
  PlusIcon,
  RightAlignIcon,
  StrikeThroughIcon,
  UnderlinedIcon,
} from "@/icons";
import { State, useShapes } from "@/state";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "../ColorPicker";
import ItemPropertyButton from "../ItemPropertyButton";

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
  const [selectedColor, setSelectedColor] = useState("#000000");

  function handleFontSizeChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fontSize = parseInt(evt.target.value);
    if (fontSize < 0 || fontSize > 300) {
      evt.target.value = "16";
    }
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
        <label htmlFor="fontFamily" className="text-sm">
          Font Family
        </label>
        <select name="fontFamily" id="fontFamily"></select>
      </div>
      <div>
        <label htmlFor="fontSize" className="text-sm">
          Font Size
        </label>
        <div className="relative flex items-center">
          <ItemPropertyButton className="rounded-s-lg">
            <MinusIcon className="h-4 w-4 text-gray-900" />
          </ItemPropertyButton>

          <input
            type="number"
            id="fontSize"
            name="fontSize"
            className=" input-no-arrow bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 rounded-none z-[12]"
            placeholder="60"
            required
            min={6}
            max={300}
            onChange={handleFontSizeChange}
          />
          <ItemPropertyButton className="rounded-e-lg">
            <PlusIcon className="h-4 w-4 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div>
      <ColorPicker
        initialColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      <div>
        <p className="text-sm">Alignment</p>
        <div className="grid grid-cols-4">
          <ItemPropertyButton className="rounded-s-lg">
            <LeftAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton>
            <CenterAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton>
            <RightAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton className="rounded-e-lg">
            <JustifyAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div>

      <div>
        <p className="text-sm">Decoration</p>
        <div className="grid grid-cols-4">
          <ItemPropertyButton className="rounded-s-lg">
            <BoldIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton>
            <ItalicIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton>
            <UnderlinedIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton className="rounded-e-lg">
            <StrikeThroughIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div>
    </div>
  );
}
