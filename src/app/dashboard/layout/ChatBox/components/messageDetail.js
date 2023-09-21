function formatDate(dateStr) {
  const messageDate = new Date(dateStr);
  const currentDate = new Date();

  // Extract year, month, and day
  const messageYear = messageDate.getFullYear();
  const messageMonth = messageDate.getMonth();
  const messageDay = messageDate.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Extract hour and minute
  const hours = messageDate.getHours();
  const minutes = messageDate.getMinutes().toString().padStart(2, "0"); // add leading zero if needed

  if (messageYear === currentYear && messageMonth === currentMonth) {
    if (messageDay === currentDay) {
      return `Today at ${hours}:${minutes}`;
    } else if (messageDay === currentDay - 1) {
      return `Yesterday at ${hours}:${minutes}`;
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[messageMonth]} ${messageDay}, ${messageYear} at ${hours}:${minutes}`;
}

function MessageDetail({ messages, showAvatar }) {
  const latestMessage = messages[messages.length - 1];
  const { detailedSender, createdAt } = latestMessage;
  const { avatar, firstName, lastName } = detailedSender[0];
  const formattedDate = formatDate(createdAt);

  return (
    <div className="flex mt-6">
      {showAvatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="object-cover w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
        />
      )}
      <div className="flex-col ml-4">
        <div className="flex">
          {showAvatar && (
            <>
              <h1 className="text-lg font-bold">{firstName}</h1>
              <h1 className="ml-1 text-lg font-bold">{lastName}</h1>
              <h1 className="ml-2 mt-2 text-zinc-700 font-extralight text-xs align-bottom">
                {formattedDate}
              </h1>
            </>
          )}
        </div>
        <div>
          {messages.map((message, index) => (
            <p key={index}>{message.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;
