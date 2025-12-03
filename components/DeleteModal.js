export default function DeleteModal({ isOpen, onClose, onConfirm, recordInfo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this record?
          {recordInfo && (
            <span className="block mt-2 font-medium text-gray-800">
              {recordInfo.partyName} - {recordInfo.dcNo}
            </span>
          )}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
