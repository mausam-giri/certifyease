import { createRef, useState } from "react";
import Editor, { EditorRefHandleProps } from "@/components/Editor";
import ImageUploadArea from "@/components/Panels/ImageUploadPanel";
import {
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  PositionDownIcon,
  PositionUpIcon,
  RightIcon,
  SaveIcon,
} from "@/icons";
import { State, useShapes } from "@/state";

export default function Template() {
  const [showeditor, setShowEditor] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const handleImageUpload = (imageUrl: string) => {
    if (imageUrl) setBackgroundImage(imageUrl);
  };

  const editorRef = createRef<EditorRefHandleProps>();
  const shapeSelectorState: State = useShapes();

  return (
    <div className="w-full min-h-screen">
      <div className="fixed w-[150px] h-screen p-4 bg-gray-500">sidebar</div>

      <div className="flex flex-col ml-[150px] h-screen">
        <div className="flex justify-between items-center bg-gray-300 pr-3 py-2">
          <div>
            <div className="flex gap-2 justify-between items-center px-4">
              <p className="font-bold text-lg">Template name</p>
              <EditIcon className="w-6 h-6 cursor-pointer hover:bg-gray-50 p-1 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex item-center gap-1 mr-2 pr-2 border-r border-gray-400">
              <button
                onClick={() => editorRef.current?.handleDuplicateShape()}
                disabled={!shapeSelectorState.selected}
                className={`m-0 px-2.5 py-1 ${
                  !shapeSelectorState.selected
                    ? "bg-gray-100 text-blue-200 cursor-not-allowed"
                    : "bg-transparent text-blue-400  border text-sm bg-white"
                }`}
              >
                {/* <span>Move Down</span> */}
                <DuplicateIcon className=" w-4 h-4" />
              </button>

              <button
                onClick={() => editorRef.current?.handleDeleteShape()}
                disabled={!shapeSelectorState.selected}
                className={`m-0 px-2.5 py-1.5 ${
                  !shapeSelectorState.selected
                    ? "bg-gray-100 text-red-200 cursor-not-allowed"
                    : "bg-red-50 border border-red-300 text-red-600 tracking-wide hover:bg-red-200  focus:ring-red-300"
                }`}
              >
                {/* <span>Move Down</span> */}
                <DeleteIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex item-center gap-1 mr-2 pr-2 border-r border-gray-400">
              <span className="text-gray-700 text-sm px-0 py-1.5 font-medium">
                Layering
              </span>
              <button
                onClick={() => editorRef.current?.layerMoveShapeDown()}
                disabled={!shapeSelectorState.selected}
                className={`m-0 px-2 py-1 ${
                  !shapeSelectorState.selected
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-transparent  border text-sm bg-white"
                }`}
              >
                {/* <span>Move Down</span> */}
                <PositionDownIcon className="text-blue-400 w-5 h-5" />
              </button>

              <button
                onClick={() => editorRef.current?.layerMoveShapeUp()}
                className="bg-transparent px-2 py-1 text-sm bg-white"
              >
                {/* <span>Move up</span> */}
                <PositionUpIcon className="text-blue-400 w-5 h-5" />
              </button>
            </div>
            {/* <div className="w-[2px] h-full bg-black">&nbsp;</div> */}
            <button
              className="flex gap-1 m-0 items-center py-1.5 px-2"
              onClick={() => editorRef.current?.saveCanvas()}
            >
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
            <Editor backgroundImage={backgroundImage} ref={editorRef} />
            // <div></div>
          )}
          {/* Sidebar */}
        </div>
      </div>
    </div>
  );
}
