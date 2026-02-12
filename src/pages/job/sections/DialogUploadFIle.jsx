import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogUploadFile({
  open = false,
  job_file,
  name = "Upload File",
  handleClose,
  handleDelete
}) {

  function FilePreview(file) {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      return (
        <img src={url} alt="preview" className="w-full" />
      );
    }
    return (
      <iframe
        src={url}
        title="preview"
        className="w-full h-full"
      />
    );
  }

  return (
    <>
      <Dialog size="lg" open={open} handler={handleClose}>
        <DialogHeader>{name}</DialogHeader>
        <DialogBody>
          {job_file && (
            <div className="py-4 overflow-scroll md:h-[70vh] h-[50vh]">
              {FilePreview(job_file)}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDelete}
            className="mr-1"
          >
            <span>ลบ</span>
          </Button>
          <Button variant="gradient" color="blue-gray" onClick={handleClose}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
