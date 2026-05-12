import React, { useState } from 'react';
import { 
  Lightbulb, Power, Layers, ArrowUpCircle, ArrowDownCircle, 
  Sun, Moon, Home, Trees, Image, Zap, Utensils, Flower2, 
  Settings
} from 'lucide-react';

const KeypadButton = ({ label, icon: Icon, subLabel, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center p-5 border-2 transition-all duration-300 rounded-xl aspect-[4/3] w-full ${
      isActive 
        ? 'bg-amber-50 border-amber-400 shadow-lg scale-[0.98]' 
        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}
  >
    <div className={`mb-3 p-3 rounded-full ${isActive ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <span className={`text-sm font-semibold text-center leading-tight ${isActive ? 'text-amber-900' : 'text-slate-800'}`}>
      {label}
    </span>
    {subLabel && (
      <span className="mt-1 text-[9px] uppercase tracking-wider font-medium text-slate-400">
        {subLabel}
      </span>
    )}
    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-slate-300'}`} />
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('entrance');
  
  // State for all 3 keypads
  const [entranceState, setEntranceState] = useState({
    allLiving: false, chandelier: false, lounge: false, outdoor: false, otherBlinds: false, blackoutBlinds: false
  });
  const [barState, setBarState] = useState({
    allLights: false, barFocus: false, wallArt: false, outdoor: false, barBlinds: false, otherBlinds: false
  });
  const [buffetState, setBuffetState] = useState({
    buffet: false, zen: false, lounge: false, outdoor: false, blackout: false, sheer: false
  });

  const toggleEntrance = (key) => setEntranceState(p => ({ ...p, [key]: !p[key] }));
  const toggleBar = (key) => setBarState(p => ({ ...p, [key]: !p[key] }));
  const toggleBuffet = (key) => setBuffetState(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Navigation Tabs */}
        <div className="bg-slate-900 p-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-800">
          {[
            { id: 'entrance', label: 'Entrance', icon: Home },
            { id: 'bar', label: 'Bar Side', icon: Zap },
            { id: 'buffet', label: 'Buffet & Zen', icon: Flower2 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === tab.id 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Header */}
        <div className="bg-slate-900 px-8 pb-8 pt-4 text-white">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Interactive Proposal</p>
              <h1 className="text-3xl font-light tracking-tight italic">
                {activeTab === 'entrance' && "Main Entrance"}
                {activeTab === 'bar' && "Bar Side"}
                {activeTab === 'buffet' && "Buffet & Zen Side"}
                <span className="not-italic opacity-50 ml-2">Keypad</span>
              </h1>
            </div>
            <div className="flex flex-col items-end opacity-40 text-[10px] uppercase font-mono tracking-tighter">
              <span>GLS-SPA</span>
              <span>Automation</span>
            </div>
          </div>
        </div>

        {/* Keypad Grid Rendering */}
        <div className="p-8 bg-slate-50/50">
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            
            {activeTab === 'entrance' && (
              <>
                <KeypadButton label="All Living Area" subLabel="On / Off" icon={Power} isActive={entranceState.allLiving} onClick={() => toggleEntrance('allLiving')} />
                <KeypadButton label="Chandelier" subLabel="Main Focus" icon={Lightbulb} isActive={entranceState.chandelier} onClick={() => toggleEntrance('chandelier')} />
                <KeypadButton label="Lounge Scene" subLabel="Dim Lighting" icon={entranceState.lounge ? Moon : Sun} isActive={entranceState.lounge} onClick={() => toggleEntrance('lounge')} />
                <KeypadButton label="Outdoor Centre" subLabel="Exterior" icon={Trees} isActive={entranceState.outdoor} onClick={() => toggleEntrance('outdoor')} />
                <KeypadButton label="Secondary Blinds" subLabel="Up / Down" icon={Layers} isActive={entranceState.otherBlinds} onClick={() => toggleEntrance('otherBlinds')} />
                <KeypadButton label="Blackout Blinds" subLabel="Up / Down" icon={entranceState.blackoutBlinds ? ArrowDownCircle : ArrowUpCircle} isActive={entranceState.blackoutBlinds} onClick={() => toggleEntrance('blackoutBlinds')} />
              </>
            )}

            {activeTab === 'bar' && (
              <>
                <KeypadButton label="All Bar Lights" subLabel="On / Off" icon={Power} isActive={barState.allLights} onClick={() => toggleBar('allLights')} />
                <KeypadButton label="Bar Focus" subLabel="On / Off" icon={Zap} isActive={barState.barFocus} onClick={() => toggleBar('barFocus')} />
                <KeypadButton label="Wall Art" subLabel="On / Off" icon={Image} isActive={barState.wallArt} onClick={() => toggleBar('wallArt')} />
                <KeypadButton label="Outdoor Lights" subLabel="On / Off" icon={Trees} isActive={barState.outdoor} onClick={() => toggleBar('outdoor')} />
                <KeypadButton label="Bar Blinds" subLabel="Up / Down" icon={barState.barBlinds ? ArrowDownCircle : ArrowUpCircle} isActive={barState.barBlinds} onClick={() => toggleBar('barBlinds')} />
                <KeypadButton label="Other Blinds" subLabel="Up / Down" icon={Layers} isActive={barState.otherBlinds} onClick={() => toggleBar('otherBlinds')} />
              </>
            )}

            {activeTab === 'buffet' && (
              <>
                <KeypadButton label="Buffet Lights" subLabel="On / Off" icon={Utensils} isActive={buffetState.buffet} onClick={() => toggleBuffet('buffet')} />
                <KeypadButton label="Zen Garden" subLabel="On / Off" icon={Flower2} isActive={buffetState.zen} onClick={() => toggleBuffet('zen')} />
                <KeypadButton label="Lounge Scene" subLabel="On / Off" icon={buffetState.lounge ? Moon : Sun} isActive={buffetState.lounge} onClick={() => toggleBuffet('lounge')} />
                <KeypadButton label="Outdoor Lights" subLabel="On / Off" icon={Trees} isActive={buffetState.outdoor} onClick={() => toggleBuffet('outdoor')} />
                <KeypadButton label="Blackout Blinds" subLabel="Up / Down" icon={buffetState.blackout ? ArrowDownCircle : ArrowUpCircle} isActive={buffetState.blackout} onClick={() => toggleBuffet('blackout')} />
                <KeypadButton label="Sheer Blinds" subLabel="Up / Down" icon={Layers} isActive={buffetState.sheer} onClick={() => toggleBuffet('sheer')} />
              </>
            )}

          </div>
        </div>

        {/* Presentation Footer */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Settings size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-800 leading-none">DALI-2 / CASAMBI</p>
              <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">Integrated Protocol</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-800 leading-none uppercase tracking-wide">43rd IORA</p>
            <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">Bespoke Automation</p>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 text-[10px] uppercase tracking-[0.2em]">Click buttons to simulate live automation scenes</p>
    </div>
  );
};

export default App;
