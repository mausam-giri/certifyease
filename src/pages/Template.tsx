import { useState } from "react";
import Editor from "@/components/Editor";
import ImageUploadArea from "@/components/template/ImageUploadArea";
import { RightIcon, SaveIcon } from "@/icons";

export default function Template() {
  const [showeditor, setShowEditor] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const handleImageUpload = (imageUrl: string) => {
    if (imageUrl) setBackgroundImage(imageUrl);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="fixed w-[150px] h-screen p-4 bg-gray-500">sidebar</div>

      <div className="flex flex-col ml-[150px] h-screen">
        <div className="flex justify-between items-center bg-gray-300 pt-2 p-1">
          <div></div>
          <div>
            <button className="flex gap-1 items-center">
              <SaveIcon className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
        {/* Editor */}
        <div className="flex-1 flex">
          {!showeditor ? (
            <div className="flex-1 space-y-2 p-4">
              <ImageUploadArea
                // backgroundImage={backgroundImage}
                onImageUpload={handleImageUpload}
              />
              <div>
                <button
                  className="mx-auto flex gap-1 items-center"
                  onClick={() => setShowEditor(true)}
                >
                  <span>Customize Certificate</span>
                  <RightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <Editor backgroundImage={backgroundImage} />
            // <div></div>
          )}
          {/* Sidebar */}
        </div>
      </div>
    </div>
  );
}
