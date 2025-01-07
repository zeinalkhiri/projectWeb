import ShowSideBar from '../components/showSideBar';

export default function Account() {
  return (
    <div>
      <ShowSideBar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Under Development
          </h1>
          <p className="text-lg text-gray-700">
            We're sorry, but this feature is currently under development. Please
            check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
