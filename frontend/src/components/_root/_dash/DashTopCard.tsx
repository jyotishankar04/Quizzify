interface DashTopCardProps {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
}

const DashTopCard: React.FC<DashTopCardProps> = ({
  label,
  value,
  icon,
  iconColor,
  bgColor,
  textColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <span className={" p-2 rounded-lg font-bold " + bgColor}>
          <span
            className={
              "w-7 h-7 flex font-bold items-center justify-center " + textColor
            }
            dangerouslySetInnerHTML={{ __html: icon }}
            style={{ color: iconColor }}
          ></span>
        </span>
      </div>
      <div className="progress"></div>
    </div>
  );
};

export default DashTopCard;
