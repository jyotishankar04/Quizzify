// LoadingModal Component
const LoadingModal: React.FC<{
  isVisible: boolean;
  text?: string;
  textContext?: string;
}> = ({ isVisible, text, textContext }) =>
  isVisible ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {text ? text : "Loading..."}
          </h3>
          <p className="text-gray-600 text-center">
            {textContext
              ? textContext
              : "Please wait while we process your request."}
          </p>
        </div>
      </div>
    </div>
  ) : null;

export default LoadingModal;
