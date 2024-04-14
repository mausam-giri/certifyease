import { FONT_OPTIONS, SHAPE_TYPES } from "@/constants/constants";
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
import {
  State,
  UpdateAttributeProps,
  updateAttribute,
  useShapes,
} from "@/state";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import ColorPicker from "../PanelComponents/ColorPicker";
import ItemPropertyButton from "../PanelComponents/ItemPropertyButton";
// import { ShapeConfig } from "konva/lib/Shape";
import { TextConfig } from "konva/lib/shapes/Text";

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
  const selectedShape: TextConfig = useShapes(
    (state: State) => state.shapes[state.selected!]
  );
  const fontSizeRef = useRef<HTMLInputElement>(null);

  function handleFontSizeChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fontSize = parseInt(evt.target.value);
    if (fontSize < 0 || fontSize > 300) {
      evt.target.value = "16";
    }
    // console.log("Size", fontSize);
    updateAttr({
      attr: "fontSize",
      value: parseInt(evt.target.value),
    });
  }

  const updateAttr = useCallback(({ attr, value }: UpdateAttributeProps) => {
    updateAttribute({ attr, value });
  }, []);

  function handleColorChange(color: string): void {
    updateAttr({ attr: "fill", value: color });
  }

  function handleAlignButtonClick(evt: MouseEvent<HTMLButtonElement>) {
    let value = evt.currentTarget.name;
    if (value) {
      updateAttr({
        attr: "align",
        value,
      });
    }
  }
  function handleDecorateButtonClick(evt: React.MouseEvent<HTMLButtonElement>) {
    let value = evt.currentTarget.name;

    if (value && selectedShape.textDecoration !== value) {
      updateAttr({
        attr: "textDecoration",
        value,
      });
    } else {
      updateAttr({
        attr: "textDecoration",
        value: "undefined",
      });
    }
  }

  // textDecoration

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

  function handleFontStyleButtonClick(evt: MouseEvent<HTMLButtonElement>) {
    let value = evt.currentTarget.name;

    if (value && selectedShape.fontStyle !== value) {
      updateAttr({
        attr: "fontStyle",
        value,
      });
    } else {
      updateAttr({
        attr: "fontStyle",
        value: "normal",
      });
    }
  }

  return (
    <div className="space-y-2">
      {/* Text Label */}
      <div>
        <label htmlFor="text" className="text-sm">
          Label Text
        </label>
        <input
          type="text"
          name="text"
          id="text"
          value={selectedShape.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePropChange("text")(e.target.value)
          }
        />
      </div>
      {/* Font Family */}
      <div>
        <label htmlFor="fontFamily" className="text-sm">
          Font Family
        </label>
        <select
          name="fontFamily"
          id="fontFamily"
          value={selectedShape.fontFamily}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handlePropChange("fontFamily")(e.currentTarget.value)
          }
        >
          <option value="Merriweather">Merriweather</option>
          <option value="Comic Neue">Comic Neue</option>
          <option value="Source Sans Pro">Source Sans Pro</option>
          <option value="Space Mono">Space Mono</option>
          <option value="Roboto">Roboto</option>
        </select>
      </div>
      {/* Font Size */}
      <div>
        <label htmlFor="fontSize" className="text-sm">
          Font Size
        </label>
        <div className="relative flex items-center">
          <ItemPropertyButton
            onClick={() => {
              if (
                fontSizeRef.current &&
                parseInt(fontSizeRef.current.value) > 8
              ) {
                updateAttr({
                  attr: "fontSize",
                  value: parseInt(fontSizeRef.current.value) - 1,
                });
              }
            }}
            className="rounded-s-lg"
          >
            <MinusIcon className="h-4 w-4 text-gray-900" />
          </ItemPropertyButton>

          <input
            type="number"
            ref={fontSizeRef}
            name="fontSize"
            className=" input-no-arrow bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 rounded-none z-[12]"
            value={selectedShape.fontSize}
            min={6}
            max={300}
            onChange={handleFontSizeChange}
          />
          <ItemPropertyButton
            onClick={() => {
              if (
                fontSizeRef.current &&
                parseInt(fontSizeRef.current.value) >= 8
              ) {
                updateAttr({
                  attr: "fontSize",
                  value: parseInt(fontSizeRef.current.value) + 1,
                });
              }
            }}
            className="rounded-e-lg"
          >
            <PlusIcon className="h-4 w-4 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div>
      {/* Text Color */}
      <ColorPicker
        initialColor={selectedShape.fill}
        onColorChange={handleColorChange}
      />
      {/* Text Alignment */}
      <div>
        <p className="text-sm">Alignment</p>
        <div className="grid grid-cols-4">
          <ItemPropertyButton
            name="left"
            onClick={handleAlignButtonClick}
            className="rounded-s-lg"
          >
            <LeftAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton name="center" onClick={handleAlignButtonClick}>
            <CenterAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          <ItemPropertyButton
            name="right"
            onClick={handleAlignButtonClick}
            className="rounded-e-lg"
          >
            <RightAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>

          {/* <ItemPropertyButton className="rounded-e-lg">
            <JustifyAlignIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton> */}
        </div>
      </div>

      {/* Text Decoration */}
      <div>
        <p className="text-sm">Decoration</p>
        <div className="grid grid-cols-4">
          <ItemPropertyButton
            name="bold"
            onClick={(e) => handleFontStyleButtonClick(e)}
            className="rounded-s-lg"
          >
            <BoldIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton
            name="italic"
            onClick={(e) => handleFontStyleButtonClick(e)}
          >
            <ItalicIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton
            name="underline"
            onClick={handleDecorateButtonClick}
          >
            <UnderlinedIcon className="h-5 w-5 text-gray-700" />
          </ItemPropertyButton>

          <ItemPropertyButton
            name="line-through"
            onClick={handleDecorateButtonClick}
            className="rounded-e-lg"
          >
            <StrikeThroughIcon className="h-5 w-5 text-gray-900" />
          </ItemPropertyButton>
        </div>
      </div>
    </div>
  );
}
