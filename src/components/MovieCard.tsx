"use client";

import Link from "next/link";
import { Movie } from "@/types/movie";

const faceEmojis: Record<number, string> = {
  1: "😫",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "🤩",
};

type Props = {
  movie: Movie;
  onDelete: (id: string) => void;
};

export default function MovieCard({ movie, onDelete }: Props) {
  const watchedDate = new Date(movie.watchedAt).toLocaleDateString("ja-JP");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* ポスター */}
      <div className="aspect-[2/3] bg-gray-100 relative">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            🎬
          </div>
        )}
        {movie.wantToRewatch && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
            また観たい
          </span>
        )}
      </div>

      {/* 情報 */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2">{movie.title}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{watchedDate}</span>
          {movie.genre && (
            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{movie.genre}</span>
          )}
        </div>

        {/* 評価 */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-sm">
            {"★".repeat(Math.floor(movie.starRating))}
            {movie.starRating % 1 !== 0 && "½"}
          </span>
          <span className="text-sm text-gray-600">{movie.starRating}/10</span>
          <span className="text-xl">{faceEmojis[movie.faceRating] || "😐"}</span>
        </div>

        {movie.director && (
          <p className="text-sm text-gray-500">監督: {movie.director}</p>
        )}

        {movie.review && (
          <p className="text-sm text-gray-600 line-clamp-3">{movie.review}</p>
        )}

        {(movie.watchLocation || movie.watchWith) && (
          <div className="text-xs text-gray-400 space-x-2">
            {movie.watchLocation && <span>📍 {movie.watchLocation}</span>}
            {movie.watchWith && <span>👥 {movie.watchWith}</span>}
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <Link
            href={`/edit/${movie.id}`}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            編集
          </Link>
          <button
            onClick={() => onDelete(movie.id)}
            className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
