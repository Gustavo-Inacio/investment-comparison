"use client";

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  className?: string;
  position?: string;
}

export const AdPlaceholder = ({
  width = "300px",
  height = "250px",
  className = "",
  position = "Ad Space"
}: AdPlaceholderProps) => {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium ${className}`}
      style={{ width, height }}
    >
      {position}
    </div>
  );
};