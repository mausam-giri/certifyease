import { DeleteIcon, UploadIcon } from "@/icons";
import { State, updateAttribute, useShapes } from "@/state";
import { ShapeConfig } from "konva/lib/Shape";

import { useRef } from "react";
// import useImage from "use-image";

export default function ImageProperty() {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedShape: ShapeConfig = useShapes(
    (state: State) => state.shapes[state.selected!]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const uploadedImage = new Image(200, 300);
    uploadedImage.src = imageUrl;

    updateAttribute({
      attr: "image",
      value: uploadedImage,
    });
  };

  return (
    <div className="space-y-4">
      <div className="dropzone">
        {/* <div className="text-sm mb-2">
          <p>Filename</p>
          <p className="py-2 px-3 border border-gray-400 border-dashed rounded-md">
            {selectedShape?.name}
          </p>
        </div> */}
        <input type="file" hidden ref={inputRef} onChange={handleFileChange} />
        <button
          className="w-full flex items-center gap-2"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <UploadIcon className="ml-2 w-4 h-4" />
          Upload image
        </button>
      </div>
      <button className="bg-red-50 border border-red-300 text-red-600 tracking-wide hover:bg-red-200  focus:ring-red-300  ease-out transition-all duration-300 flex items-center gap-1">
        <DeleteIcon className="w-4 h-4" /> Delete
      </button>
    </div>
  );
}
