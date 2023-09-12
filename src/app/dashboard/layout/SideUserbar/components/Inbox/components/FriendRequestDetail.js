import { Button } from "@material-tailwind/react";

function FriendRequestDetail({ request }) {
  const { requesterId } = request;

  return (
    <div className="flex my-3 items-center">
      <img
        src={requesterId.avatar}
        alt="Avatar"
        className="object-cover w-12 h-12 rounded-full overflow-hidden"
      />
      <h1 className="ml-3">{requesterId.firstName}</h1>
      <h1 className="ml-1">{requesterId.lastName}</h1>
      <Button className="bg-red-500 p-2 mx-2 h-8">Accept</Button>
      <Button className="bg-green-500 p-2 mx-2 h-8">Reject</Button>
    </div>
  );
}

export default FriendRequestDetail;
