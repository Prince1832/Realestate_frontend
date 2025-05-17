import { useState } from 'react';
import ChatInput from './components/ChatInput';
import SummaryBox from './components/SummaryBox';
import ChartBox from './components/ChartBox';
import DataTable from './components/DataTable';
import MessageBubble from './components/MessageBubble';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (query, useAI) => {
    setMessages(prev => [
      ...prev,
      { text: query, isUser: true, timestamp: new Date() }
    ]);

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analyze/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, use_ai: useAI }),
      });
      const data = await response.json();
      const isError = data.summary?.startsWith("__error__");

      setMessages(prev => [
        ...prev,
        {
          text: isError ? data.summary.replace("__error__", "") : data.summary,
          isUser: false,
          isError: isError,
          chartData: isError ? null : {
            title: data.chart_data?.title || "Price Trends",
            data: data.chart_data?.datasets?.[0]?.data?.map((val, i) => ({
              [data.chart_data.x_key || 'year']: data.chart_data.labels[i],
              [data.chart_data.y_key || 'price']: val,
            })) || [],
            x_key: data.chart_data?.x_key || 'year',
            y_key: data.chart_data?.y_key || 'price',
          },
          tableData: isError ? [] : data.table_data,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Sorry, I couldn't process your request. Please try again.", isUser: false, isError: true, timestamp: new Date() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const latestBotMessage = messages.slice().reverse().find(m => !m.isUser && !m.isError);

  const showResponse = Boolean(latestBotMessage);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center px-4 py-6 md:px-10 transition-all duration-500 ease-in-out">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700">
        Real Estate Analysis Chat
      </h1>

      <div className={`w-full max-w-6xl flex flex-col ${showResponse ? 'md:flex-row' : 'items-center'} gap-6 transition-all duration-500`}>

        <div className={`w-full ${showResponse ? 'md:w-1/2' : 'max-w-md'} space-y-4 transition-all duration-500`}>
          {messages.length > 0 && (
            <div className="bg-white shadow-sm rounded-lg p-4 h-auto overflow-y-auto border border-gray-200">
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  text={msg.text}
                  isUser={msg.isUser}
                  isError={msg.isError}
                />
              ))}
              {isLoading && (
                <div className="text-center italic text-gray-500 py-2">Analyzing...</div>
              )}
            </div>
          )}

          <ChatInput onSendMessage={handleSendMessage} />
        </div>

        {showResponse && (
          <div className="md:w-1/2 w-full space-y-4 animate-fade-in">
            <SummaryBox text={latestBotMessage.text} />
            <ChartBox data={latestBotMessage.chartData} />
            <DataTable data={latestBotMessage.tableData} />
          </div>
        )}
      </div>
    </div>
  );
}
export default App


