import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

export function InDevelopment({ toggleDialog, open }) {
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} handler={toggleDialog}>
        <DialogHeader>This Feature Is Currently In Development</DialogHeader>
        <DialogBody divider>
          Hello, this feature is not available yet
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="black" onClick={toggleDialog}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
