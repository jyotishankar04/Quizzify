// SkipButton.tsx
import { FC } from "react";

interface SkipButtonProps {
  onClick: () => void;
}

const SkipButton: FC<SkipButtonProps> = ({ onClick }) => {
  return (
    <button className="btn btn-outline px-10 p-2 rounded" onClick={onClick}>
      Skip
    </button>
  );
};

export default SkipButton;
