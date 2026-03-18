"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { addMovie, updateMovie } from "@/lib/storage";
import StarRating from "./StarRating";
import FaceRating from "./FaceRating";
import GenreSelect from "./GenreSelect";

const watchLocations = [
  "映画館",
  "自宅(Netflix)",
  "自宅(Amazon)",
  "自宅(その他)",
  "友人宅",
  "その他",
];

type FormData = Omit<Movie, "id" | "createdAt">;

const initialForm: FormData = {
  title: "",
  watchedAt: new Date().toISOString().slice(0, 10),
  genre: "",
  director: "",
  review: "",
  starRating: 0,
  faceRating: 3,
  watchLocation: "",
  watchWith: "",
  wantToRewatch: false,
  posterUrl: "",
};

type Props = {
  movie?: Movie;
};

export default function MovieForm({ movie }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(() => {
    if (movie) {
      const { id, createdAt, ...rest } = movie;
      return { ...rest, watchedAt: movie.watchedAt.slice(0, 10) };
    }
    return initialForm;
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const data = { ...form, watchedAt: new Date(form.watchedAt).toISOString() };
    if (movie) {
      updateMovie(movie.id, data);
    } else {
      addMovie(data);
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="映画のタイトル"
        />
      </div>

      {/* 観た日 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">観た日</label>
        <input
          type="date"
          value={form.watchedAt}
          onChange={(e) => set("watchedAt", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ジャンル・監督 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
          <GenreSelect value={form.genre} onChange={(v) => set("genre", v)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">監督</label>
          <input
            type="text"
            value={form.director}
            onChange={(e) => set("director", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="監督名"
          />
        </div>
      </div>

      {/* スター評価 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">スター評価</label>
        <StarRating value={form.starRating} onChange={(v) => set("starRating", v)} />
      </div>

      {/* 顔評価 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">満足度</label>
        <FaceRating value={form.faceRating} onChange={(v) => set("faceRating", v)} />
      </div>

      {/* 鑑賞場所 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">鑑賞場所</label>
        <select
          value={form.watchLocation}
          onChange={(e) => set("watchLocation", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">選択してください</option>
          {watchLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* 一緒に観た人 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">一緒に観た人</label>
        <input
          type="text"
          value={form.watchWith}
          onChange={(e) => set("watchWith", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="例: 友人、家族、ひとり"
        />
      </div>

      {/* ポスター画像 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ポスター画像</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const maxW = 400;
              const maxH = 600;
              let w = img.width;
              let h = img.height;
              if (w > maxW || h > maxH) {
                const ratio = Math.min(maxW / w, maxH / h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
              }
              canvas.width = w;
              canvas.height = h;
              canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
              set("posterUrl", canvas.toDataURL("image/jpeg", 0.7));
            };
            img.src = URL.createObjectURL(file);
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {form.posterUrl && (
          <div className="mt-2 relative inline-block">
            <img src={form.posterUrl} alt="プレビュー" className="h-40 rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => set("posterUrl", "")}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 感想 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">感想</label>
        <textarea
          value={form.review}
          onChange={(e) => set("review", e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="映画の感想を自由に書いてください"
        />
      </div>

      {/* もう一度観たいか */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rewatch"
          checked={form.wantToRewatch}
          onChange={(e) => set("wantToRewatch", e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="rewatch" className="text-sm font-medium text-gray-700">
          もう一度観たい
        </label>
      </div>

      {/* 送信 */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
      >
        {movie ? "更新する" : "保存する"}
      </button>
    </form>
  );
}
