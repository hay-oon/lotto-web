"use client";

import { useState } from "react";

interface PurchaseFormProps {
  onPurchase: (amount: number) => void;
  isLoading: boolean;
}

export default function PurchaseForm({
  onPurchase,
  isLoading,
}: PurchaseFormProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const purchaseAmount = parseInt(amount);

    if (isNaN(purchaseAmount)) {
      setError("숫자를 입력해주세요.");
      return;
    }

    if (purchaseAmount < 1000) {
      setError("구입 금액은 최소 1,000원 이상이어야 합니다.");
      return;
    }

    if (purchaseAmount % 1000 !== 0) {
      setError("구입 금액은 1,000원 단위여야 합니다.");
      return;
    }

    onPurchase(purchaseAmount);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">로또 구매</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            구입 금액 (원)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="8000"
            step="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "구매 중..." : "구매하기"}
        </button>
      </form>
    </div>
  );
}
