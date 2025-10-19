const StrongBarPassword = ({ score }: { score: number }) => {
  const strongBarMapStyle = {
    1: "h-full w-1/5 bg-red-400",
    2: "h-full w-2/5 bg-orange-400",
    3: "h-full w-3/5 bg-yellow-400",
    4: "h-full w-4/5 bg-lime-400",
    5: "h-full w-full bg-emerald-500",
  };

  return (
    <div className="mt-1">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className={strongBarMapStyle[score as keyof typeof strongBarMapStyle] || "w-0"}></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Fuerza de la contraseña: {score <= 2 ? "baja" : score === 3 ? "media" : score === 4 ? "buena" : "excelente"}
      </p>
    </div>
  );
};

export default StrongBarPassword;
