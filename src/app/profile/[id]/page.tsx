export default function UserProfile({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Profile</h1>
        <hr className="border-gray-700 mb-6"/>
        <p className="text-white text-lg mb-4">
          Profile page for user:
          <span className="p-2 ml-2 rounded bg-orange-500 text-black">
            {params.id}
          </span>
        </p>

        <p className="text-center mt-4">
          <a href="/" className="text-blue-400 underline">Back to Home</a>
        </p>
      </div>
    </div>
  );
}
