import { useRef, useState } from "react";
interface ImageUploadAreaProps {
  onImageUpload?: (imageUrl: string) => void;
}

// export type ImageItemKind = {
//   "data-item-type": string;
//   id: string;
//   name: string;
//   src: string;
//   image: typeof Image;
// };

export default function ImageUploadArea(props: ImageUploadAreaProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
    props.onImageUpload!(imageUrl);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <p className="text-lg mb-2">Upload Certificate Template Image</p>
      <div className="flex-1 flex items-center justify-center">
        <div className="space-y-4 h-[400px] w-full border border-dashed border-gray-300 rounded-lg text-center relative">
          <div
            className={`flex flex-col gap-3 justify-center items-center h-full relative`}
          >
            {selectedFile ? (
              <>
                <img
                  className="absolute w-full h-full object-cover z-0 rounded-lg"
                  src={imageSrc}
                  alt={selectedFile.name}
                />
                <div className="flex flex-col gap-3 w-full bg-white bg-opacity-80 p-4 rounded-b-lg absolute bottom-0">
                  <p className="text-sm">{selectedFile.name}</p>
                  <div>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded"
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <p className="text-lg font-medium">
                    Drag & Drop to Upload File
                  </p>
                  <p className="text-sm text-gray-500">OR</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleImageUpload}
                  >
                    Browse File
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
