"use client";

const genres = [
  "アクション",
  "コメディ",
  "ドラマ",
  "ホラー",
  "SF",
  "アニメ",
  "ドキュメンタリー",
  "その他",
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function GenreSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">ジャンルを選択</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}
