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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendRequestDetail from "./components/FriendRequestDetail";

export function Inbox({ open, toggleInboxDialog }) {
  const friendRequests = useSelector(
    (state) => state.user?.entireUser?.friendRequestsReceived || []
  );

  return (
    <>
      <Dialog open={open} handler={toggleInboxDialog} size={"xs"}>
        <DialogHeader className="bg-zinc-800 px-5 py-3 flex justify-between">
          <Typography variant="h5" color="white">
            Incoming Friend Requests
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={toggleInboxDialog}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </DialogHeader>

        <DialogBody
          divider
          className="grid place-items-center gap-4 p-5 h-72 overflow-y-auto bg-zinc-800"
        >
          <Typography className="font-normal"></Typography>
          {friendRequests
            ? friendRequests.map((request, index) => (
                <FriendRequestDetail request={request} key={index} />
              ))
            : null}
        </DialogBody>

        <DialogFooter className="border-t bg-zinc-800 space-x-2 px-5 py-3 flex justify-center">
          <Button color="black" onClick={toggleInboxDialog}>
            close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
