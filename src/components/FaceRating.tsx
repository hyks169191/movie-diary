"use client";

const faces = [
  { value: 1, emoji: "😫", label: "最悪" },
  { value: 2, emoji: "😕", label: "いまいち" },
  { value: 3, emoji: "😐", label: "普通" },
  { value: 4, emoji: "😊", label: "良い" },
  { value: 5, emoji: "🤩", label: "最高" },
];

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function FaceRating({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {faces.map((face) => (
        <button
          key={face.value}
          type="button"
          onClick={() => onChange(face.value)}
          className={`text-3xl p-1 rounded-lg transition-all cursor-pointer ${
            value === face.value
              ? "bg-blue-100 ring-2 ring-blue-400 scale-110"
              : "hover:bg-gray-100"
          }`}
          aria-label={face.label}
          title={face.label}
        >
          {face.emoji}
        </button>
      ))}
    </div>
  );
}
