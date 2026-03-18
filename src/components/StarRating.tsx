"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({ value, onChange }: Props) {
  const stars = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleClick = (starIndex: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    const rating = isLeftHalf ? starIndex - 0.5 : starIndex;
    onChange(rating === value ? 0 : rating);
  };

  return (
    <div>
      <div className="flex items-center gap-0.5">
        {stars.map((star) => {
          const filled = value >= star;
          const halfFilled = !filled && value >= star - 0.5;
          return (
            <button
              key={star}
              type="button"
              onClick={(e) => handleClick(star, e)}
              className="relative text-2xl cursor-pointer select-none w-7 h-7 flex items-center justify-center"
              aria-label={`${star}点`}
            >
              <span className="text-gray-300">★</span>
              {(filled || halfFilled) && (
                <span
                  className="absolute inset-0 text-yellow-400 overflow-hidden flex items-center justify-center"
                  style={{ clipPath: halfFilled ? "inset(0 50% 0 0)" : undefined }}
                >
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-1">{value} / 10</p>
    </div>
  );
}
