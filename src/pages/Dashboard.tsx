import React, { useState } from 'react';
import { fashionService } from '../services/api';
import { UploadBox } from '../components/UploadBox';
import { ReferenceTags } from '../components/ReferenceTags';
import { SettingsPanel } from '../components/SettingsPanel';
import { GalleryGrid } from '../components/GalleryGrid';
import { Loader } from '../components/Loader';
import { UploadsHistory } from '../components/UploadsHistory';
import { GalleryHistory } from '../components/GalleryHistory';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  OutfitImage, 
  ReferenceImage, 
  GeneratedOutput, 
  ProcessingStep, 
  GenerationSettings,
  GenerationSession
} from '../types';

const REFERENCE_CATEGORIES = [
  'Pose', 'Lighting', 'Background', 'Model Style', 'Camera Angle', 'Aesthetic'
];

import { Navbar } from '../components/Navbar';

export const Dashboard = ({ activeView }: { activeView: string }) => {
  const uploadsRef = React.useRef<HTMLDivElement>(null);
  const settingsRef = React.useRef<HTMLDivElement>(null);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeView === 'uploads') uploadsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (activeView === 'settings') settingsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (activeView === 'gallery') galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeView]);

  // State
  const [outfitFiles, setOutfitFiles] = useState<OutfitImage[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceImage[]>([]);
  const [settings, setSettings] = useState<GenerationSettings>({
    numOutputs: 1,
    aspectRatio: '3:4',
    category: 'Pose'
  });
  const [step, setStep] = useState<ProcessingStep>('Idle');
  const [outputs, setOutputs] = useState<GeneratedOutput[]>([]);
  const [history, setHistory] = useState<GenerationSession[]>([]);

  // Handlers
  const handleOutfitUpload = (files: File[]) => {
    const newFiles = files.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      file: f,
      preview: URL.createObjectURL(f)
    }));
    setOutfitFiles(prev => [...prev, ...newFiles]);
  };

  const handleReferenceUpload = (files: File[]) => {
    const newFiles = files.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      file: f,
      preview: URL.createObjectURL(f)
    }));
    setReferenceFiles(prev => [...prev, ...newFiles]);
  };

  const removeOutfit = (id: string) => setOutfitFiles(prev => prev.filter(f => f.id !== id));
  const removeReference = (id: string) => setReferenceFiles(prev => prev.filter(f => f.id !== id));

  const handleGenerate = async () => {
    if (outfitFiles.length === 0) {
      alert("Please upload at least one outfit image.");
      return;
    }

    try {

    setStep('Uploading');

    const outfitRealFiles = outfitFiles.map(item => item.file);
    const referenceRealFiles = referenceFiles.map(item => item.file);

    setStep('Processing');

    const response = await fashionService.uploadImages(outfitRealFiles, referenceRealFiles);

    console.log("Backend Response:", response);
    setStep('Generating AI images');

    // Create dummy outputs
    const newOutputs: GeneratedOutput[] = Array.from({ length: settings.numOutputs }).map((_, i) => ({
      id: `OUT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      outfitId: outfitFiles[0].id,
      imageUrl: `https://picsum.photos/seed/${Math.random() * 1000}/600/800`,
      status: i === 0 ? 'Consistent' : i % 2 === 0 ? 'Minor Drift' : 'Review Needed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    const newSession: GenerationSession = {
      id: `SES-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      outfits: outfitFiles.map(f => ({ id: f.id, name: f.file.name, preview: f.preview })),
      references: referenceFiles.map(f => ({ id: f.id, name: f.file.name, preview: f.preview })),
      outputs: newOutputs,
      timestamp: new Date().toLocaleString()
    };

    setHistory(prev => [newSession, ...prev]);
    setOutputs(prev => [...newOutputs, ...prev]);
    setStep('Idle');
  } catch (error) {
    console.error(" Generating failed:", error);
  } finally {  
    setStep('Idle');
  }
};

  const handleRegenerate = (id: string) => {
    console.log("Regenerating", id);
    handleGenerate();
  };

  const handleDownload = (id: string) => {
    console.log("Downloading", id);
    alert(`Downloading image ${id}...`);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'uploads':
        return (
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-black tracking-tight">Upload History</h2>
                <p className="text-sm text-gray-500">View all your past sessions, input designs, and reference images.</p>
              </div>
              <UploadsHistory history={history} />
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-black tracking-tight">Output Gallery</h2>
                <p className="text-sm text-gray-500">Every single AI-generated outfit generated in this session.</p>
              </div>
              <GalleryHistory history={history} />
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="flex-1 flex overflow-hidden p-6 gap-6">
            {/* Left Side: Configuration Section */}
            <section className="w-[380px] flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <div ref={uploadsRef} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold mb-3 text-black">1. Input Sources</h3>
                <div className="space-y-6">
                  <UploadBox
                    title="Outfit Designs"
                    description="High-res photos of your garments"
                    onFilesSelected={handleOutfitUpload}
                    files={outfitFiles.map(f => ({ id: f.id, name: f.file.name }))}
                    onRemove={removeOutfit}
                    labelStyle="text-[11px] font-bold text-gray-400 uppercase tracking-tighter"
                  />
                  <UploadBox
                    title="Reference Styles"
                    description="Models, poses, or environments"
                    onFilesSelected={handleReferenceUpload}
                    files={referenceFiles.map(f => ({ id: f.id, name: f.file.name }))}
                    onRemove={removeReference}
                    labelStyle="text-[11px] font-bold text-gray-400 uppercase tracking-tighter"
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold mb-3 text-black">2. Reference Categories</h3>
                <ReferenceTags
                  categories={REFERENCE_CATEGORIES}
                  selectedCategory={settings.category}
                  onSelect={(c) => setSettings({ ...settings, category: c })}
                />
              </div>

              <div ref={settingsRef} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold mb-3 text-black">3. Settings</h3>
                <SettingsPanel
                  numOutputs={settings.numOutputs}
                  onNumOutputsChange={(v) => setSettings({ ...settings, numOutputs: v })}
                  aspectRatio={settings.aspectRatio}
                  onAspectRatioChange={(v) => setSettings({ ...settings, aspectRatio: v })}
                />
                <button
                  onClick={handleGenerate}
                  disabled={step !== 'Idle'}
                  className={cn(
                    "w-full mt-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95",
                    step === 'Idle' 
                      ? "bg-black text-white hover:bg-gray-900 shadow-black/10" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  )}
                >
                  <Sparkles size={18} />
                  <span>Generate AI Outfits</span>
                </button>
              </div>
            </section>

            {/* Right Side: Output Gallery Section */}
            <section ref={galleryRef} className="flex-1 flex flex-col space-y-4 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-black">Live Output Gallery</h2>
                <div className="flex items-center gap-3">
                  {step !== 'Idle' && (
                    <span className="flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                      <span>{step}...</span>
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                    {outputs.length} Total
                  </span>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <GalleryGrid
                  outputs={outputs}
                  onRegenerate={handleRegenerate}
                  onDownload={handleDownload}
                />
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Navbar />
      <Loader step={step} />
      {renderContent()}
    </main>
  );
};
