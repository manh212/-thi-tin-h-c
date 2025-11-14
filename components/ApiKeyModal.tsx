
import React, { useState } from 'react';
import Button from './Button';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nhập API Key của bạn</h2>
        <p className="text-slate-600 mb-6">
          Để sử dụng tính năng giải thích bằng AI, vui lòng nhập Google AI API Key của bạn. Key sẽ được lưu trữ an toàn trong trình duyệt của bạn.
        </p>
        <div className="space-y-4">
          <label htmlFor="api-key-input" className="sr-only">Google AI API Key</label>
          <input
            id="api-key-input"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Dán API key của bạn vào đây"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
          />
          <Button onClick={handleSave} className="w-full" disabled={!key.trim()}>
            Lưu và Bắt đầu
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Bạn có thể lấy API key từ <a href="https://aistudio.google.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
