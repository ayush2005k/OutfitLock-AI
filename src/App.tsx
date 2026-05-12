/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  const [activeView, setActiveView] = React.useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900 overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <Dashboard activeView={activeView} />
    </div>
  );
}
