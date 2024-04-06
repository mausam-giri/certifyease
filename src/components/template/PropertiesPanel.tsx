import { useEffect, useState } from "react";
import TextItemProperty from "../Properties/TextItemProperty";

export default function PropertiesPanel() {
  const [selectedFont, setSelectedFont] = useState<string>("");
  return (
    <div>
      <h2 className="border-gray-500 text-gray-700 border-b mb-2">
        <span className="px-2 font-medium">Cutomization</span>
      </h2>
      <div className="px-2">
        <TextItemProperty />
        {/* <div>
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
          
        </div>

        <div>
          <label htmlFor="font-color">Font Color</label>
          <input type="color" name="font-color" id="font-color" />
        </div> */}
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
