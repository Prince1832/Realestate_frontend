import { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [query, setQuery] = useState('');
  const [useAI, setUseAI] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSendMessage(query, useAI);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex items-center mb-3">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              type="checkbox"
              className="sr-only"
              checked={useAI}
              onChange={() => setUseAI(!useAI)}
            />
            <div className={`block w-10 h-6 rounded-full ${useAI ? 'bg-indigo-600' : 'bg-gray-400'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useAI ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">Use AI Analysis</div>
        </label>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about real estate (e.g. 'Analyze Wakad')"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;