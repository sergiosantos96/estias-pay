import type { ProgressBarProps } from "../../models/models";

const ProgressBar: React.FC<ProgressBarProps> = ({ barColor, width }) => {
  return (
    <div className="mb-5 flex justify-center">
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: barColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
