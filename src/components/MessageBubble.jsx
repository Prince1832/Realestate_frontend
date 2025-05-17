const MessageBubble = ({ text, isUser, isError }) => {
  return (
    <div className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${isError 
          ? 'bg-red-100 text-red-800' 
          : isUser 
            ? 'bg-indigo-100 text-indigo-800' 
            : 'bg-gray-100 text-gray-800'}`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;