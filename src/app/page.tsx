import { title, description } from "@/config";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {description}
      </p>

      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Demo
      </h2>
      <div className="flex justify-center">
        <Link href="/freeCodeCamp-video">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            FreeCodeCamp Video
          </button>
        </Link>
      </div>
    </div>
  );
}
