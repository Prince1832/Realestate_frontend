const SummaryBox = ({ text }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2 text-indigo-600">Analysis Summary</h3>
      <div className="text-gray-700">
        {text.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-2">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default SummaryBox;