import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSiteData, saveSiteData, resetSiteData, defaultSiteData, publishSiteData, getPublishedData,
  createBlock, type SiteData, type PageData, type Block, type BlockType,
} from "@/lib/siteData";
import BlockRenderer from "@/components/BlockRenderer";
import BlockPropertyEditor from "@/components/admin/BlockPropertyEditor";
import {
  Save, RotateCcw, LogOut, Check, Undo2, Redo2, ExternalLink,
  Plus, Trash2, ChevronUp, ChevronDown, Copy, GripVertical, Eye, EyeOff,
  Download, Upload, Palette, FileText, Layout, Globe,
  Type, Image, MousePointer, Minus, Square, Columns, Quote, Flag, BarChart3,
  Users, Heart, Zap, AlertCircle, X,
} from "lucide-react";

const MAX_UNDO = 30;

const BLOCK_PALETTE: { type: BlockType; label: string; icon: typeof Type }[] = [
  { type: "hero", label: "Hero Banner", icon: Layout },
  { type: "heading", label: "Heading", icon: Type },
  { type: "text", label: "Text Block", icon: FileText },
  { type: "image", label: "Image", icon: Image },
  { type: "button", label: "Button", icon: MousePointer },
  { type: "divider", label: "Divider", icon: Minus },
  { type: "spacer", label: "Spacer", icon: Square },
  { type: "cards", label: "Cards Grid", icon: Columns },
  { type: "stats", label: "Stats", icon: BarChart3 },
  { type: "team", label: "Team Grid", icon: Users },
  { type: "coreValues", label: "Core Values", icon: Heart },
  { type: "twoColumn", label: "Two Columns", icon: Columns },
  { type: "iconFeatures", label: "Icon Features", icon: Zap },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "banner", label: "Banner / CTA", icon: Flag },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SiteData>(getSiteData);
  const [activePageId, setActivePageId] = useState(data.pages[0]?.id || "");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [zoom, setZoom] = useState(85);
  const [leftTab, setLeftTab] = useState<"pages" | "blocks" | "penpot" | "io">("pages");
  const [showPalette, setShowPalette] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [publishStatus, setPublishStatus] = useState<"idle" | "published">("idle");
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

  // Undo/Redo
  const undoStack = useRef<SiteData[]>([]);
  const redoStack = useRef<SiteData[]>([]);
  const [, forceRender] = useState(0);

  const pushUndo = useCallback((current: SiteData) => {
    undoStack.current = [...undoStack.current.slice(-MAX_UNDO + 1), current];
    redoStack.current = [];
    forceRender((n) => n + 1);
  }, []);

  const updateData = useCallback((updater: (prev: SiteData) => SiteData) => {
    setData((prev) => {
      pushUndo(prev);
      return updater(prev);
    });
  }, [pushUndo]);

  const undo = useCallback(() => {
    if (!undoStack.current.length) return;
    const prev = undoStack.current.at(-1)!;
    undoStack.current = undoStack.current.slice(0, -1);
    setData((curr) => { redoStack.current = [...redoStack.current, curr]; return prev; });
    forceRender((n) => n + 1);
  }, []);

  const redo = useCallback(() => {
    if (!redoStack.current.length) return;
    const next = redoStack.current.at(-1)!;
    redoStack.current = redoStack.current.slice(0, -1);
    setData((curr) => { undoStack.current = [...undoStack.current, curr]; return next; });
    forceRender((n) => n + 1);
  }, []);

  const save = () => { saveSiteData(data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const reset = () => { if (window.confirm("Reset all content to defaults?")) { pushUndo(data); resetSiteData(); setData(defaultSiteData); } };
  const logout = () => { sessionStorage.removeItem("techTitans_admin"); navigate("/admin"); };
  const publish = () => { saveSiteData(data); publishSiteData(data); setPublishStatus("published"); setTimeout(() => setPublishStatus("idle"), 3000); };

  const isLive = (() => {
    const pub = getPublishedData();
    return pub ? JSON.stringify(data) === JSON.stringify(pub) : false;
  })();

  // ── Page helpers ──
  const activePage = data.pages.find((p) => p.id === activePageId);
  const selectedBlock = activePage?.blocks.find((b) => b.id === selectedBlockId);

  const updatePage = (pageId: string, updater: (page: PageData) => PageData) => {
    updateData((d) => ({ ...d, pages: d.pages.map((p) => p.id === pageId ? updater(p) : p) }));
  };

  const addPage = () => {
    const id = crypto.randomUUID();
    const slug = `/page-${Date.now()}`;
    const newPage: PageData = { id, title: "New Page", slug, showInNav: true, blocks: [
      createBlock("hero"),
    ] };
    updateData((d) => ({ ...d, pages: [...d.pages, newPage] }));
    setActivePageId(id);
  };

  const deletePage = (pageId: string) => {
    if (data.pages.length <= 1) return;
    if (!window.confirm("Delete this page?")) return;
    updateData((d) => ({ ...d, pages: d.pages.filter((p) => p.id !== pageId) }));
    if (activePageId === pageId) setActivePageId(data.pages.find((p) => p.id !== pageId)!.id);
  };

  const duplicatePage = (pageId: string) => {
    const page = data.pages.find((p) => p.id === pageId);
    if (!page) return;
    const id = crypto.randomUUID();
    const copy: PageData = {
      ...structuredClone(page),
      id, title: page.title + " (Copy)", slug: page.slug + "-copy",
      blocks: page.blocks.map((b) => ({ ...b, id: crypto.randomUUID(), props: { ...b.props } })),
    };
    updateData((d) => ({ ...d, pages: [...d.pages, copy] }));
    setActivePageId(id);
  };

  // ── Block helpers ──
  const addBlock = (type: BlockType) => {
    if (!activePage) return;
    const block = createBlock(type);
    updatePage(activePageId, (p) => ({ ...p, blocks: [...p.blocks, block] }));
    setSelectedBlockId(block.id);
    setShowPalette(false);
  };

  const updateBlock = (updated: Block) => {
    updatePage(activePageId, (p) => ({
      ...p, blocks: p.blocks.map((b) => b.id === updated.id ? updated : b),
    }));
  };

  const deleteBlock = (blockId: string) => {
    updatePage(activePageId, (p) => ({ ...p, blocks: p.blocks.filter((b) => b.id !== blockId) }));
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const moveBlock = (blockId: string, dir: -1 | 1) => {
    updatePage(activePageId, (p) => {
      const blocks = [...p.blocks];
      const idx = blocks.findIndex((b) => b.id === blockId);
      const target = idx + dir;
      if (target < 0 || target >= blocks.length) return p;
      [blocks[idx], blocks[target]] = [blocks[target], blocks[idx]];
      return { ...p, blocks };
    });
  };

  const duplicateBlock = (blockId: string) => {
    updatePage(activePageId, (p) => {
      const idx = p.blocks.findIndex((b) => b.id === blockId);
      if (idx === -1) return p;
      const copy = { ...p.blocks[idx], id: crypto.randomUUID(), props: { ...p.blocks[idx].props } };
      const blocks = [...p.blocks];
      blocks.splice(idx + 1, 0, copy);
      return { ...p, blocks };
    });
  };

  // ── I/O ──
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `techtitans-${new Date().toISOString().split("T")[0]}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.pages) {
          pushUndo(data);
          setData(parsed);
          saveSiteData(parsed);
          setImportStatus("success");
        } else { setImportStatus("error"); }
      } catch { setImportStatus("error"); }
      setTimeout(() => setImportStatus("idle"), 3000);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden text-white">
      {/* ── Top Toolbar ── */}
      <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold mr-3">Tech Titans Editor</span>
          <button onClick={undo} disabled={!undoStack.current.length} className="p-1.5 text-gray-400 hover:text-white disabled:text-gray-700 transition-colors" title="Undo"><Undo2 size={15} /></button>
          <button onClick={redo} disabled={!redoStack.current.length} className="p-1.5 text-gray-400 hover:text-white disabled:text-gray-700 transition-colors" title="Redo"><Redo2 size={15} /></button>
        </div>
        <div className="flex items-center gap-1 bg-gray-800 rounded px-2 py-0.5">
          <button onClick={() => setZoom(Math.max(50, zoom - 15))} className="text-gray-400 hover:text-white text-xs px-1">-</button>
          <span className="text-[11px] text-gray-300 w-8 text-center">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 15))} className="text-gray-400 hover:text-white text-xs px-1">+</button>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={reset} className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-800"><RotateCcw size={13} /> Reset</button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-800"><ExternalLink size={13} /> Preview</a>
          <button onClick={save} className="flex items-center gap-1 text-[11px] bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">{saved ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save</>}</button>
          <button onClick={publish} className={`flex items-center gap-1 text-[11px] px-3 py-1 rounded font-medium transition-colors ${isLive ? "bg-green-700 text-green-200 cursor-default" : "bg-green-600 hover:bg-green-500 text-white"}`}>
            {publishStatus === "published" || isLive ? <><Check size={13} /> Published</> : <><Globe size={13} /> Publish</>}
          </button>
          <button onClick={logout} className="p-1 text-gray-400 hover:text-red-400"><LogOut size={14} /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Sidebar ── */}
        <div className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
          <div className="flex border-b border-gray-800 text-[11px]">
            {(["pages", "blocks", "penpot", "io"] as const).map((t) => (
              <button key={t} onClick={() => setLeftTab(t)}
                className={`flex-1 py-2 font-medium capitalize transition-colors ${leftTab === t ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}>
                {t === "io" ? "I/O" : t === "penpot" ? "PenPot" : t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Pages tab */}
            {leftTab === "pages" && (
              <div className="py-2">
                {data.pages.map((page) => (
                  <div key={page.id}
                    className={`group flex items-center gap-1 px-2 py-1.5 text-[12px] cursor-pointer transition-colors ${page.id === activePageId ? "bg-blue-500/15 text-blue-400" : "text-gray-400 hover:bg-gray-800"}`}
                    onClick={() => { setActivePageId(page.id); setSelectedBlockId(null); }}>
                    <FileText size={13} className="shrink-0" />
                    <span className="flex-1 truncate">{page.title}</span>
                    {!page.showInNav && <EyeOff size={11} className="text-gray-600" />}
                    <button onClick={(e) => { e.stopPropagation(); duplicatePage(page.id); }} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white"><Copy size={11} /></button>
                    <button onClick={(e) => { e.stopPropagation(); deletePage(page.id); }} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"><Trash2 size={11} /></button>
                  </div>
                ))}
                <button onClick={addPage} className="flex items-center gap-1 px-2 py-1.5 text-[11px] text-blue-400 hover:text-blue-300 w-full"><Plus size={13} /> Add Page</button>

                {/* Page settings */}
                {activePage && (
                  <div className="border-t border-gray-800 mt-2 pt-2 px-2 space-y-2">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Page Settings</p>
                    <div>
                      <label className="text-[10px] text-gray-500">Title</label>
                      <input value={activePage.title} onChange={(e) => updatePage(activePageId, (p) => ({ ...p, title: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">Slug</label>
                      <input value={activePage.slug} onChange={(e) => updatePage(activePageId, (p) => ({ ...p, slug: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <label className="flex items-center gap-2 text-[11px] text-gray-400 cursor-pointer">
                      <input type="checkbox" checked={activePage.showInNav} onChange={(e) => updatePage(activePageId, (p) => ({ ...p, showInNav: e.target.checked }))}
                        className="rounded" />
                      Show in navigation
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Blocks tab */}
            {leftTab === "blocks" && activePage && (
              <div className="py-2">
                <p className="px-2 text-[10px] text-gray-500 uppercase font-semibold mb-1">Blocks in "{activePage.title}"</p>
                {activePage.blocks.map((block, i) => (
                  <div key={block.id}
                    className={`group flex items-center gap-1 px-2 py-1 text-[11px] cursor-pointer transition-colors ${block.id === selectedBlockId ? "bg-blue-500/15 text-blue-400" : "text-gray-400 hover:bg-gray-800"}`}
                    onClick={() => setSelectedBlockId(block.id)}>
                    <GripVertical size={11} className="text-gray-600 shrink-0" />
                    <span className="flex-1 truncate">{block.type}{block.props.title ? `: ${block.props.title}` : ""}</span>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }} disabled={i === 0} className="opacity-0 group-hover:opacity-100 disabled:text-gray-700 text-gray-500 hover:text-white"><ChevronUp size={11} /></button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }} disabled={i === activePage.blocks.length - 1} className="opacity-0 group-hover:opacity-100 disabled:text-gray-700 text-gray-500 hover:text-white"><ChevronDown size={11} /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"><Trash2 size={11} /></button>
                  </div>
                ))}
                <button onClick={() => setShowPalette(true)} className="flex items-center gap-1 px-2 py-1.5 text-[11px] text-blue-400 hover:text-blue-300 w-full"><Plus size={13} /> Add Block</button>
              </div>
            )}

            {/* PenPot tab */}
            {leftTab === "penpot" && (
              <div className="p-3 space-y-3">
                <p className="text-[11px] text-gray-400">Embed a PenPot design viewer.</p>
                <input value={data.penpotEmbedUrl} onChange={(e) => updateData((d) => ({ ...d, penpotEmbedUrl: e.target.value }))}
                  placeholder="https://design.penpot.app/#/view/..."
                  className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-blue-500" />
              </div>
            )}

            {/* I/O tab */}
            {leftTab === "io" && (
              <div className="p-3 space-y-3">
                <button onClick={handleExport} className="w-full flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[11px] py-2 rounded">
                  <Download size={13} /> Export JSON
                </button>
                <label className="w-full flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white text-[11px] py-2 rounded cursor-pointer border border-gray-700">
                  <Upload size={13} /> Import JSON
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
                {importStatus === "success" && <p className="text-green-400 text-[11px] flex items-center gap-1"><Check size={12} /> Imported</p>}
                {importStatus === "error" && <p className="text-red-400 text-[11px] flex items-center gap-1"><AlertCircle size={12} /> Invalid file</p>}
              </div>
            )}
          </div>
        </div>

        {/* ── Center Canvas ── */}
        {leftTab === "penpot" && data.penpotEmbedUrl ? (
          <div className="flex-1 bg-gray-950">
            <iframe src={data.penpotEmbedUrl} title="PenPot" className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin allow-popups" />
          </div>
        ) : (
          <div className="flex-1 bg-gray-950 overflow-auto">
            <div className="p-6 flex justify-center">
              <div className="w-full max-w-[900px] origin-top" style={{ transform: `scale(${zoom / 100})` }}>
                {activePage ? (
                  <div className="bg-background rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
                    {activePage.blocks.map((block, i) => (
                      <div
                        key={block.id}
                        draggable
                        onDragStart={(e) => { e.stopPropagation(); setDraggingBlockId(block.id); }}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (block.id !== draggingBlockId) setDragOverBlockId(block.id); }}
                        onDragLeave={() => setDragOverBlockId(null)}
                        onDrop={(e) => {
                          e.preventDefault(); e.stopPropagation();
                          if (draggingBlockId && draggingBlockId !== block.id) {
                            updatePage(activePageId, (p) => {
                              const blocks = [...p.blocks];
                              const fromIdx = blocks.findIndex((b) => b.id === draggingBlockId);
                              const toIdx = blocks.findIndex((b) => b.id === block.id);
                              blocks.splice(toIdx, 0, blocks.splice(fromIdx, 1)[0]);
                              return { ...p, blocks };
                            });
                          }
                          setDraggingBlockId(null); setDragOverBlockId(null);
                        }}
                        onDragEnd={() => { setDraggingBlockId(null); setDragOverBlockId(null); }}
                        className={`relative group transition-opacity ${draggingBlockId === block.id ? "opacity-40" : "opacity-100"} ${dragOverBlockId === block.id ? "ring-2 ring-blue-400 ring-inset" : ""}`}
                      >
                        <BlockRenderer
                          block={block}
                          isAdmin
                          isSelected={block.id === selectedBlockId}
                          onClick={() => setSelectedBlockId(block.id)}
                        />
                        {/* Hover controls */}
                        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 flex gap-0.5 z-10 transition-opacity">
                          <div className="bg-gray-900/90 text-gray-400 p-0.5 rounded cursor-grab active:cursor-grabbing" title="Drag to reorder"><GripVertical size={12} /></div>
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }} disabled={i === 0} className="bg-gray-900/90 text-gray-400 hover:text-white disabled:text-gray-700 p-0.5 rounded"><ChevronUp size={12} /></button>
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }} disabled={i === activePage.blocks.length - 1} className="bg-gray-900/90 text-gray-400 hover:text-white disabled:text-gray-700 p-0.5 rounded"><ChevronDown size={12} /></button>
                          <button onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }} className="bg-gray-900/90 text-gray-400 hover:text-white p-0.5 rounded"><Copy size={12} /></button>
                          <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="bg-gray-900/90 text-gray-400 hover:text-red-400 p-0.5 rounded"><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    {/* Add block button at bottom */}
                    <button onClick={() => setShowPalette(true)}
                      className="w-full py-4 border-t border-dashed border-gray-700 text-gray-600 hover:text-blue-400 hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-sm">
                      <Plus size={16} /> Add Block
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-600 py-20">No page selected</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Right Sidebar (Properties) ── */}
        <div className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-2.5 border-b border-gray-800">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Properties</h3>
          </div>
          <div className="p-2.5 flex-1">
            {selectedBlock ? (
              <BlockPropertyEditor block={selectedBlock} onChange={updateBlock} />
            ) : (
              <div className="text-center text-gray-600 text-[12px] mt-8">Click a block to edit its properties</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Block Palette Modal ── */}
      {showPalette && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setShowPalette(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-lg w-[500px] max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-sm font-bold text-white">Add Block</h2>
              <button onClick={() => setShowPalette(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {BLOCK_PALETTE.map((bp) => (
                <button key={bp.type} onClick={() => addBlock(bp.type)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-gray-400 hover:text-blue-400">
                  <bp.icon size={24} />
                  <span className="text-[11px] font-medium">{bp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
