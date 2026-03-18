"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { getMovie } from "@/lib/storage";
import MovieForm from "@/components/MovieForm";

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMovie(getMovie(id));
    setLoading(false);
  }, [id]);

  if (loading) return null;

  if (!movie) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">映画が見つかりませんでした</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← 一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">映画を編集</h1>
      </div>
      <MovieForm movie={movie} />
    </div>
  );
}
