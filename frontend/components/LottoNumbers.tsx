import { LottoNumbers as LottoNumbersType } from '@/types/lotto';

interface LottoNumbersProps {
  lottos: LottoNumbersType[];
  purchaseCount: number;
}

export default function LottoNumbers({ lottos, purchaseCount }: LottoNumbersProps) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        {purchaseCount}개를 구매했습니다.
      </h2>
      <div className="space-y-2">
        {lottos.map((lotto, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-500 font-mono text-sm w-6">{index + 1}.</span>
            <div className="flex space-x-2 flex-wrap">
              {lotto.numbers.map((num, numIndex) => (
                <span
                  key={numIndex}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

