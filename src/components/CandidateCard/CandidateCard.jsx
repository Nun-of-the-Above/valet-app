import { CANDIDATES_TOOLKIT } from "../../constants/CANDIDATES_TOOLKIT";

export function CandidateCard({ name, text, isLoaded }) {
  const candidate = CANDIDATES_TOOLKIT[name];

  return (
    <div
      className={`w-full p-3 my-2 text-center text-white border-2 rounded-2xl flex items-center ${
        isLoaded ? candidate.color : "bg-[#e3e1dc]"
      }`}
    >
      <div className="mr-1">
        {!isLoaded ? (
          <div className="w-[70px] h-[70px] rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            className="w-[70px] h-[70px] rounded-full object-cover"
            src={candidate.image}
            alt={candidate.name}
          />
        )}
      </div>

      <div className="w-full pr-3">
        {!isLoaded ? (
          <div className="w-full">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold my-3">{candidate.name}</h2>
            <h2 className="text-lg font-bold">{text}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
