"use client";

import { ModeToggle } from "@/lib/toggle-mode";
import LayerImage from "./layers/layer-image";
import UploadImage from "./upload/UploadImage";

const Editor = () => {
  return (
    <div className="flex h-full ">
      <div className="py-6 px-4  min-w-48 ">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>
      <h1>Editor</h1>
      <UploadImage />
      {/* <LayerImage /> */}
    </div>
  );
};
export default Editor;
