import { description, siteName } from "@/config";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        About {siteName}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {description}
      </p>
    </div>
  );
}
