"use client";

import { useState } from "react";
import PurchaseForm from "@/components/PurchaseForm";
import LottoNumbers from "@/components/LottoNumbers";
import WinningNumberForm from "@/components/WinningNumberForm";
import ResultDisplay from "@/components/ResultDisplay";
import { lottoApi } from "@/lib/api";
import {
  LottoNumbers as LottoNumbersType,
  CheckWinningResponse,
} from "@/types/lotto";

export default function Home() {
  const [step, setStep] = useState<"purchase" | "check" | "result">("purchase");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 구매한 로또 정보
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [lottos, setLottos] = useState<LottoNumbersType[]>([]);

  // 당첨 결과
  const [result, setResult] = useState<CheckWinningResponse | null>(null);

  const handlePurchase = async (amount: number) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await lottoApi.purchaseLotto({ purchaseAmount: amount });
      setPurchaseCount(response.purchaseCount);
      setLottos(response.lottos);
      setStep("check");
    } catch (err) {
      setError(err instanceof Error ? err.message : "구매에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckWinning = async (
    winningNumbers: number[],
    bonusNumber: number
  ) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await lottoApi.checkWinning({
        winningNumbers,
        bonusNumber,
        lottos,
      });
      setResult(response);
      setStep("result");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "당첨 확인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep("purchase");
    setPurchaseCount(0);
    setLottos([]);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎰 로또 웹 서비스
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center space-y-8">
            {step === "purchase" && (
              <PurchaseForm onPurchase={handlePurchase} isLoading={isLoading} />
            )}

            {step === "check" && (
              <>
                <LottoNumbers lottos={lottos} purchaseCount={purchaseCount} />
                <div className="w-full border-t my-4"></div>
                <WinningNumberForm
                  onSubmit={handleCheckWinning}
                  isLoading={isLoading}
                />
              </>
            )}

            {step === "result" && result && (
              <>
                <ResultDisplay result={result} />
                <button
                  onClick={handleReset}
                  className="mt-4 bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
                >
                  다시 시작
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
