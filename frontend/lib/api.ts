import {
  PurchaseLottoRequest,
  PurchaseLottoResponse,
  CheckWinningRequest,
  CheckWinningResponse,
} from "@/types/lotto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const lottoApi = {
  async purchaseLotto(
    request: PurchaseLottoRequest
  ): Promise<PurchaseLottoResponse> {
    const response = await fetch(`${API_BASE_URL}/lotto/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "로또 구매에 실패했습니다.");
    }

    return response.json();
  },

  async checkWinning(
    request: CheckWinningRequest
  ): Promise<CheckWinningResponse> {
    const response = await fetch(`${API_BASE_URL}/lotto/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "당첨 확인에 실패했습니다.");
    }

    return response.json();
  },
};
