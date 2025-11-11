import { CheckWinningResponse, Rank } from "@/types/lotto";

interface ResultDisplayProps {
  result: CheckWinningResponse;
}

const RANK_LABELS: Record<Rank, string> = {
  [Rank.FIRST]: "6개 일치",
  [Rank.SECOND]: "5개 일치, 보너스 볼 일치",
  [Rank.THIRD]: "5개 일치",
  [Rank.FOURTH]: "4개 일치",
  [Rank.FIFTH]: "3개 일치",
  [Rank.NONE]: "꽝",
};

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  const displayRanks = result.rankCounts.filter(
    (rc) => rc.rank !== Rank.NONE
  );

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">당첨 통계</h2>
      <div className="border border-gray-300 rounded-lg p-4 space-y-3">
        <div className="border-b pb-2 mb-2">
          <p className="text-sm font-semibold text-gray-600">당첨 내역</p>
        </div>
        {displayRanks.reverse().map((rankCount) => (
          <div
            key={rankCount.rank}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-700">
              {RANK_LABELS[rankCount.rank]} ({formatNumber(rankCount.prize)}원)
            </span>
            <span className="font-semibold">{rankCount.count}개</span>
          </div>
        ))}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center font-semibold">
            <span>총 당첨 금액</span>
            <span className="text-blue-600">
              {formatNumber(result.totalPrize)}원
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-lg font-bold">
            <span>총 수익률</span>
            <span
              className={
                result.earningRate >= 100 ? "text-green-600" : "text-red-600"
              }
            >
              {result.earningRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

