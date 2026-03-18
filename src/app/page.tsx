"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { getMovies, deleteMovie } from "@/lib/storage";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("この映画を削除しますか？")) return;
    deleteMovie(id);
    setMovies(getMovies());
  };

  const genres = [...new Set(movies.map((m) => m.genre).filter(Boolean))];

  const filtered = movies.filter((m) => {
    if (genreFilter && m.genre !== genreFilter) return false;
    if (ratingFilter && m.starRating < ratingFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">🎬 映画感想記録</h1>
        <Link
          href="/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + 新規登録
        </Link>
      </div>

      {/* フィルター */}
      {movies.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">すべてのジャンル</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value={0}>すべての評価</option>
            {[8, 6, 4, 2].map((r) => (
              <option key={r} value={r}>★ {r}以上</option>
            ))}
          </select>
        </div>
      )}

      {/* 一覧 */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🎬</p>
          <p className="text-lg">まだ映画が登録されていません</p>
          <Link href="/new" className="text-blue-600 hover:underline mt-2 inline-block">
            最初の映画を登録する
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
