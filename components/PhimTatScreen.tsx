import React, { useState, useMemo } from 'react';
import type { Hotkey } from '../types';
import { HOTKEYS } from '../hotkeys';

interface PhimTatScreenProps {
  onBack: () => void;
}

const PhimTatScreen: React.FC<PhimTatScreenProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState('All');

    const apps = useMemo(() => ['All', ...[...new Set(HOTKEYS.map(hk => hk.app))]], []);
    
    const filteredHotkeys = useMemo(() => {
        return HOTKEYS.filter(hk => {
            const matchesApp = selectedApp === 'All' || hk.app === selectedApp;
            const matchesSearch = searchTerm === '' || 
                                  hk.keys.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  hk.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesApp && matchesSearch;
        });
    }, [searchTerm, selectedApp]);

    return (
        <div className="space-y-8">
             <header className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 focus:outline-none">Tra Cứu Phím Tắt</h2>
                <p className="text-slate-600 mt-2">Công cụ tìm kiếm nhanh các lệnh và tổ hợp phím.</p>
            </header>

            <div className="p-4 border rounded-lg bg-slate-50 space-y-4 md:flex md:space-y-0 md:space-x-4 md:items-end">
                <div className="flex-grow">
                    <label htmlFor="search-hotkey" className="block text-sm font-medium text-slate-700 mb-1">Tìm kiếm</label>
                    <input
                        type="search"
                        id="search-hotkey"
                        placeholder="Nhập lệnh hoặc phím tắt..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                     <label htmlFor="filter-app" className="block text-sm font-medium text-slate-700 mb-1">Phần mềm</label>
                     <select
                        id="filter-app"
                        value={selectedApp}
                        onChange={e => setSelectedApp(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                     >
                        {apps.map(app => <option key={app} value={app}>{app}</option>)}
                     </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-slate-200">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-slate-600">Phím Tắt</th>
                            <th className="p-3 text-left text-sm font-semibold text-slate-600">Chức Năng</th>
                            <th className="p-3 text-left text-sm font-semibold text-slate-600 hidden sm:table-cell">Phần Mềm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHotkeys.map((hotkey, index) => (
                             <tr key={index} className="border-b border-slate-200">
                                <td className="p-3 font-mono text-blue-700 whitespace-nowrap">{hotkey.keys}</td>
                                <td className="p-3 text-slate-700">{hotkey.description}</td>
                                <td className="p-3 text-slate-500 hidden sm:table-cell">{hotkey.app}</td>
                             </tr>
                        ))}
                    </tbody>
                </table>
                {filteredHotkeys.length === 0 && <p className="text-center p-4 text-slate-500">Không tìm thấy phím tắt phù hợp.</p>}
            </div>
        </div>
    );
};

export default PhimTatScreen;
