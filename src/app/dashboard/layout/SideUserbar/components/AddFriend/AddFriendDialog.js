import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export function AddFriendDialog({ open, toggleAddDialog }) {
  return (
    <>
      <Dialog
        open={open}
        handler={toggleAddDialog}
        className="max-w-md mx-auto mt-10 place-items-center rounded-lg shadow-lg bg-white dark:bg-zinc-900"
      >
        <DialogHeader className="bg-blue-gray-100 px-5 py-3 flex justify-between">
          <Typography variant="h5" color="blue-gray">
            New Friend Request
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={toggleAddDialog}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </DialogHeader>

        <DialogBody divider className="grid place-items-center gap-4 p-5">
          <Input
            placeholder="Search By E-Mail"
            size="regular"
            outline={false}
            style={{ backgroundColor: "rgb(20, 20, 20)" }}
            className="w-full text-white bg-zinc-900  border-white focus:outline-none border-width: 2px "
          />
        </DialogBody>

        <DialogFooter className="border-t border-blue-gray-200 space-x-2 px-5 py-3 flex justify-center">
          <Button variant="gradient" color="green">
            Send Friend Request
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
