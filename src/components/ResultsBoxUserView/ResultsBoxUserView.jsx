import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
  CANDIDATES_TOOLKIT,
  TEST_CANDIDATES,
} from "../../constants/CANDIDATES_TOOLKIT";
import { useSessionContext } from "../../context/session-context";
import { CandidateCard } from "../CandidateCard";

export function ResultsBoxUserView() {
  const { activeRound, votesInActiveRound, currCandidates } =
    useSessionContext();

  const [voteCount, setVoteCount] = useState(null);
  const [data, setData] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (!votesInActiveRound || !currCandidates) return;
    const voteMap = new Map();

    if (activeRound.number === 0) {
      TEST_CANDIDATES.forEach((candidate) => voteMap.set(candidate, 0));
    } else {
      currCandidates.forEach((candidate) => voteMap.set(candidate, 0));
    }

    votesInActiveRound.forEach((vote) => {
      voteMap.set(vote.candidate, Number(voteMap.get(vote.candidate) + 1));
    });

    setVoteCount([...voteMap].sort((a, b) => a[1] - b[1]));
  }, [votesInActiveRound, activeRound.number, currCandidates]);

  useEffect(() => {
    if (!voteCount) return;

    const totalVotes = voteCount.reduce((acc, [, votes]) => acc + votes, 0);
    const percentagePerVote = 100 / totalVotes;

    const percentageData = voteCount
      .map(([c, v]) => [c, Math.floor(v * percentagePerVote * 100) / 100])
      .map(([name, percent]) => ({
        name: name,
        value: percent,
      }));

    setData(percentageData);
  }, [voteCount]);

  return (
    <>
      {activeRound && activeRound.displayResults && (
        <>
          <div className="flex flex-col w-full h-full pt-3 place-content-center">
            <PieChart width={300} height={110} className="self-center -mb-3">
              <Pie
                nameKey="name"
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx="50%"
                cy="100%"
                outerRadius={100}
                animationDuration={2500}
                animationEasing="ease-in-out"
                labelLine={false}
                onAnimationEnd={() => setAnimationDone(true)}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        animationDone
                          ? CANDIDATES_TOOLKIT[entry.name].color
                          : "#e3e1dc"
                      }
                    />
                  ))}
              </Pie>
            </PieChart>
            {data ? (
              <div className="w-full p-4 rounded-lg">
                {data
                  .map((obj) => [obj.name, obj.value])
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, percentageOfVotes]) => (
                    <CandidateCard
                      key={name}
                      name={name}
                      text={`${percentageOfVotes}%`}
                      isLoaded={animationDone}
                    />
                  ))}
              </div>
            ) : (
              <>
                {data && (
                  <div className="grid grid-cols-2 p-3 rounded-lg">
                    {data
                      .map((obj) => [obj.name, obj.value])
                      .sort((a, b) => b[1] - a[1])
                      .map(([name]) => (
                        <div key={name} className="animate-pulse">
                          <div className="h-[50px] w-[50px] bg-gray-200 rounded" />
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
