import FriendDetail from "./components/FriendDetail";

function Friends({ entireUser, setChatOpen }) {
  const { detailedFriends = [], _id } = entireUser;

  const sortByName = (a, b) => {
    return a.firstName.localeCompare(b.firstName);
  };

  // sort online
  const onlineFriends = detailedFriends
    .filter((friend) => friend.isOnline)
    .sort(sortByName);

  // sort offline
  const offlineFriends = detailedFriends
    .filter((friend) => !friend.isOnline)
    .sort(sortByName);

  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      <header className="w-full h-24 mt-5 pb-4 flex items-center justify-center relative">
        <h1>Contacts ({detailedFriends.length})</h1>
      </header>
      <div className="flex-grow p-5 flex flex-col overflow-hidden ">
        <div className="flex-grow overflow-auto scrollbar scrollbar-thumb-grey-900 scrollbar-track-zinc-900">
          <h2>Online - ({onlineFriends.length})</h2>
          {onlineFriends.map((friend, index) => (
            <FriendDetail
              _id={_id}
              setChatOpen={setChatOpen}
              friend={friend}
              key={index}
            />
          ))}
          <h2>Offline - ({offlineFriends.length})</h2>
          {offlineFriends.map((friend, index) => (
            <FriendDetail
              _id={_id}
              setChatOpen={setChatOpen}
              friend={friend}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Friends.defaultProps = {
  entireUser: {},
};

export default Friends;
