import { useEffect, useState } from "react";

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

export default function PropertiesPanel() {
  const [selectedFont, setSelectedFont] = useState<string>("");
  return (
    <div>
      <h2>Properties</h2>
      <div>
        <div>
          <label htmlFor="font-size">Font Size</label>
          <input
            type="number"
            name="font-size"
            id="font-size"
            defaultValue={16}
          />
        </div>

        <div>
          <label htmlFor="font-family">Font Family</label>
          <FontSelector
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          />
        </div>

        <div>
          <label htmlFor="font-color">Font Color</label>
          <input type="color" name="font-color" id="font-color" />
        </div>
      </div>
    </div>
  );
}
