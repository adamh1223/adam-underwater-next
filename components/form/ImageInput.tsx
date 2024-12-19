"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

function ImageInput() {
  const images = useState();
  const name = "images";
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files);
    }
  };
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        multiple
        onChange={onChange}
      />
    </div>
  );
}
export default ImageInput;
