type TitleBadgeProps = {
  name: string;
};

const TitleBadge: React.FC<TitleBadgeProps> = ({ name }) => {
  return (
    <div className="mb-12">
      <span className="font-bold text-sm text-white py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
        {name.toUpperCase()}
      </span>
    </div>
  );
};

export default TitleBadge;
