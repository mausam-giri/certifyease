import Resizer from "react-image-file-resizer";
export const resizeImageFile = (
  file: Blob,
  maxWidth: number = 300,
  maxHeight: number = 300,
  quality: number = 100
) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
