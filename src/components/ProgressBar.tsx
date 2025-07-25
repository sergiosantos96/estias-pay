interface ProgressBarProps {
  barColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ barColor }) => {
  return (
    <div className="mb-5 flex justify-center">
      <div className="h-2.5 w-4/5 rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: "70%",
            backgroundColor: barColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
