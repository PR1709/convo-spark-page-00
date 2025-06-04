
const TypingIndicator = () => {
  return (
    <div className="flex items-end space-x-2 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center text-xs text-white">
          S
        </div>
      </div>
      <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-200 px-4 py-2 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
