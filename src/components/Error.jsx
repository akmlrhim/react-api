export default function Error({ message }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-64">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              !
            </div>
            <div>
              <h3 className="text-red-800 font-semibold">Terjadi Kesalahan</h3>
              <p className="text-red-700 mt-1">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
