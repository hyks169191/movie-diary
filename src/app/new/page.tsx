import Link from "next/link";
import MovieForm from "@/components/MovieForm";

export default function NewMoviePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← 一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">映画を登録</h1>
      </div>
      <MovieForm />
    </div>
  );
}
