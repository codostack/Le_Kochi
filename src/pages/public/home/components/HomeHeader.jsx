export default function HomeHeader() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-28 px-6 text-center">
      <h1 className="text-6xl font-bold mb-6">
        Welcome to <span className="text-yellow-400">MyWebsite</span>
      </h1>

      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Build modern websites using ReactJS and Tailwind CSS.
      </p>
    </div>
  );
}