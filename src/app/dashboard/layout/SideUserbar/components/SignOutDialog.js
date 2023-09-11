import { createElement } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function SignOutDialog({ open, toggleDialog }) {
  const router = useRouter();
  const handleConfirm = () => {
    router.push("/login");
    localStorage.clear();
    toggleDialog();
  };
  return (
    <>
      <Dialog
        open={open}
        handler={toggleDialog}
        className="max-w-md mx-auto mt-10 place-items-center rounded-lg shadow-lg bg-white dark:bg-zinc-900"
      >
        <DialogHeader className="bg-blue-gray-100 px-5 py-3 flex justify-center">
          <Typography variant="h5" color="blue-gray">
            Would you Like Sign Out?
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4 p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            {createElement(ArrowSmallLeftIcon, {
              className: "h-14 w-14 pt-3",
            })}
          </svg>
          <Typography
            color="red"
            variant="h4"
            className="font-semibold"
          ></Typography>
          <Typography className="text-center font-normal text-blue-gray-600">
            Please Select Below
          </Typography>
        </DialogBody>
        <DialogFooter className="border-t border-blue-gray-200 space-x-2 px-5 py-3 flex justify-center">
          <Button
            variant="gradient"
            className="text-red-500"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            variant="text"
            className="text-green-500"
            onClick={toggleDialog}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
