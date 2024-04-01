import Konva from "konva";
import { useRef } from "react";
import { Image, Layer, Stage, Text } from "react-konva";

interface EditorProps {
  backgroundImage?: unknown;
}

export default function Editor(props: EditorProps) {
  const { backgroundImage } = props;
  const stageRef = useRef<Konva.Stage>(null); // Define the type of ref

  const BackgroundImageRect = () => {
    return (
      <Image
        x={0}
        y={0}
        width={stageRef.current?.getSize().width || window.innerWidth}
        height={stageRef.current?.getSize().height || window.innerHeight}
        image={backgroundImage.src}
        listening={false}
      />
    );
  };

  return (
    <Stage
      ref={stageRef} // Pass the ref to the Stage component
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
    >
      <Layer>
        <BackgroundImageRect /> {/* Render the background image */}
        <Text text="Click here" />
      </Layer>
    </Stage>
  );
}
