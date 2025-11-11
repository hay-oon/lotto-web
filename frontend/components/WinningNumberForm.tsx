'use client';

import { useState } from 'react';

interface WinningNumberFormProps {
  onSubmit: (winningNumbers: number[], bonusNumber: number) => void;
  isLoading: boolean;
}

export default function WinningNumberForm({ onSubmit, isLoading }: WinningNumberFormProps) {
  const [winningInput, setWinningInput] = useState('');
  const [bonusInput, setBonusInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 당첨 번호 파싱
      const winningNumbers = winningInput
        .split(',')
        .map((num) => num.trim())
        .map((num) => {
          const parsed = parseInt(num);
          if (isNaN(parsed)) {
            throw new Error('당첨 번호는 숫자여야 합니다.');
          }
          return parsed;
        });

      // 당첨 번호 검증
      if (winningNumbers.length !== 6) {
        throw new Error('당첨 번호는 6개여야 합니다.');
      }

      if (winningNumbers.some((num) => num < 1 || num > 45)) {
        throw new Error('당첨 번호는 1~45 사이의 숫자여야 합니다.');
      }

      if (new Set(winningNumbers).size !== 6) {
        throw new Error('당첨 번호는 중복되지 않아야 합니다.');
      }

      // 보너스 번호 파싱 및 검증
      const bonusNumber = parseInt(bonusInput);
      if (isNaN(bonusNumber)) {
        throw new Error('보너스 번호는 숫자여야 합니다.');
      }

      if (bonusNumber < 1 || bonusNumber > 45) {
        throw new Error('보너스 번호는 1~45 사이의 숫자여야 합니다.');
      }

      if (winningNumbers.includes(bonusNumber)) {
        throw new Error('보너스 번호는 당첨 번호와 중복될 수 없습니다.');
      }

      onSubmit(winningNumbers, bonusNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : '입력 값을 확인해주세요.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">당첨 번호 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="winning" className="block text-sm font-medium mb-2">
            당첨 번호 (쉼표로 구분)
          </label>
          <input
            type="text"
            id="winning"
            value={winningInput}
            onChange={(e) => setWinningInput(e.target.value)}
            placeholder="1,2,3,4,5,6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="bonus" className="block text-sm font-medium mb-2">
            보너스 번호
          </label>
          <input
            type="number"
            id="bonus"
            value={bonusInput}
            onChange={(e) => setBonusInput(e.target.value)}
            placeholder="7"
            min="1"
            max="45"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? '확인 중...' : '당첨 확인'}
        </button>
      </form>
    </div>
  );
}

