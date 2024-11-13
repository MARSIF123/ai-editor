"use client";

import LayerImage from "./layers/layer-image";
import UploadImage from "./upload/UploadImage";

const Editor = () => {
  return (
    <>
      <h1>Editor</h1>
      <UploadImage />
      <LayerImage />
    </>
  );
};
export default Editor;
