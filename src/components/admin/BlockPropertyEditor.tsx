import { useState, useRef } from "react";
import { Plus, Trash2, Image as ImageIcon, X, Link } from "lucide-react";
import type { Block } from "@/lib/siteData";

interface Props {
  block: Block;
  onChange: (block: Block) => void;
}

const BlockPropertyEditor = ({ block, onChange }: Props) => {
  const p = block.props;
  const set = (key: string, value: unknown) => onChange({ ...block, props: { ...p, [key]: value } });

  switch (block.type) {
    case "hero":
      return (
        <Fields title="Hero">
          <Input label="Title" value={p.title as string} onChange={(v) => set("title", v)} />
          <Input label="Subtitle" value={p.subtitle as string} onChange={(v) => set("subtitle", v)} />
          <Input label="Badge" value={p.badge as string} onChange={(v) => set("badge", v)} />
          <Select label="Background" value={p.bgColor as string} options={["black", "blue"]} onChange={(v) => set("bgColor", v)} />
        </Fields>
      );

    case "heading":
      return (
        <Fields title="Heading">
          <Input label="Text" value={p.text as string} onChange={(v) => set("text", v)} />
          <Input label="Accent Word" value={p.accent as string} onChange={(v) => set("accent", v)} />
          <Select label="Level" value={p.level as string} options={["h2", "h3"]} onChange={(v) => set("level", v)} />
          <Select label="Align" value={p.align as string} options={["left", "center", "right"]} onChange={(v) => set("align", v)} />
        </Fields>
      );

    case "text":
      return (
        <Fields title="Text">
          <Textarea label="Content" value={p.content as string} onChange={(v) => set("content", v)} />
          <Select label="Align" value={p.align as string} options={["left", "center", "right"]} onChange={(v) => set("align", v)} />
        </Fields>
      );

    case "image":
      return (
        <Fields title="Image">
          <ImageUpload src={p.src as string} onSrc={(v) => set("src", v)} />
          <Input label="Alt Text" value={p.alt as string} onChange={(v) => set("alt", v)} />
          <Input label="Caption" value={p.caption as string} onChange={(v) => set("caption", v)} />
          <Input label="Height (px)" value={p.height as string} onChange={(v) => set("height", v)} />
        </Fields>
      );

    case "button":
      return (
        <Fields title="Button">
          <Input label="Text" value={p.text as string} onChange={(v) => set("text", v)} />
          <Input label="Link URL" value={p.href as string} onChange={(v) => set("href", v)} />
          <Select label="Variant" value={p.variant as string} options={["primary", "outline"]} onChange={(v) => set("variant", v)} />
          <Select label="Align" value={p.align as string} options={["left", "center", "right"]} onChange={(v) => set("align", v)} />
        </Fields>
      );

    case "divider":
      return (
        <Fields title="Divider">
          <Select label="Color" value={p.color as string} options={["blue", "gray"]} onChange={(v) => set("color", v)} />
          <Input label="Width (px)" value={p.width as string} onChange={(v) => set("width", v)} />
        </Fields>
      );

    case "spacer":
      return (
        <Fields title="Spacer">
          <Input label="Height (px)" value={p.height as string} onChange={(v) => set("height", v)} />
        </Fields>
      );

    case "quote":
      return (
        <Fields title="Quote">
          <Textarea label="Quote Text" value={p.text as string} onChange={(v) => set("text", v)} />
          <Input label="Author" value={p.author as string} onChange={(v) => set("author", v)} />
        </Fields>
      );

    case "banner":
      return (
        <Fields title="Banner">
          <Textarea label="Text" value={p.text as string} onChange={(v) => set("text", v)} />
          <Input label="Button Text" value={p.buttonText as string} onChange={(v) => set("buttonText", v)} />
          <Input label="Link URL" value={p.href as string} onChange={(v) => set("href", v)} />
          <Select label="Background" value={p.bgColor as string} options={["blue", "gray"]} onChange={(v) => set("bgColor", v)} />
        </Fields>
      );

    case "twoColumn":
      return (
        <Fields title="Two Columns">
          <Textarea label="Left Column" value={p.left as string} onChange={(v) => set("left", v)} />
          <Textarea label="Right Column" value={p.right as string} onChange={(v) => set("right", v)} />
        </Fields>
      );

    case "cards": {
      const cards = (p.cards as { title: string; description: string; icon: string }[]) || [];
      return (
        <Fields title="Cards">
          <Select label="Columns" value={p.columns as string} options={["2", "3", "4"]} onChange={(v) => set("columns", v)} />
          <ListEditor
            items={cards}
            renderItem={(card, i) => (
              <div className="space-y-1.5">
                <Input label="Title" value={card.title} onChange={(v) => { const c = [...cards]; c[i] = { ...c[i], title: v }; set("cards", c); }} />
                <Input label="Description" value={card.description} onChange={(v) => { const c = [...cards]; c[i] = { ...c[i], description: v }; set("cards", c); }} />
                <Input label="Icon" value={card.icon} onChange={(v) => { const c = [...cards]; c[i] = { ...c[i], icon: v }; set("cards", c); }} />
              </div>
            )}
            onAdd={() => set("cards", [...cards, { title: "New Card", description: "Description", icon: "star" }])}
            onRemove={(i) => set("cards", cards.filter((_, j) => j !== i))}
          />
        </Fields>
      );
    }

    case "stats": {
      const stats = (p.stats as { label: string; value: string }[]) || [];
      return (
        <Fields title="Stats">
          <ListEditor
            items={stats}
            renderItem={(stat, i) => (
              <div className="space-y-1.5">
                <Input label="Value" value={stat.value} onChange={(v) => { const s = [...stats]; s[i] = { ...s[i], value: v }; set("stats", s); }} />
                <Input label="Label" value={stat.label} onChange={(v) => { const s = [...stats]; s[i] = { ...s[i], label: v }; set("stats", s); }} />
              </div>
            )}
            onAdd={() => set("stats", [...stats, { label: "New Stat", value: "0" }])}
            onRemove={(i) => set("stats", stats.filter((_, j) => j !== i))}
          />
        </Fields>
      );
    }

    case "team": {
      const members = (p.members as { id: string; name: string; role: string; photo?: string }[]) || [];
      return (
        <Fields title="Team Members">
          <ListEditor
            items={members}
            renderItem={(m, i) => (
              <div className="space-y-1.5">
                <Input label="Name" value={m.name} onChange={(v) => { const ms = [...members]; ms[i] = { ...ms[i], name: v }; set("members", ms); }} />
                <Input label="Role" value={m.role} onChange={(v) => { const ms = [...members]; ms[i] = { ...ms[i], role: v }; set("members", ms); }} />
                <ImageUpload
                  src={m.photo || ""}
                  onSrc={(v) => { const ms = [...members]; ms[i] = { ...ms[i], photo: v }; set("members", ms); }}
                />
              </div>
            )}
            onAdd={() => set("members", [...members, { id: crypto.randomUUID(), name: "", role: "Team Member", photo: "" }])}
            onRemove={(i) => set("members", members.filter((_, j) => j !== i))}
          />
        </Fields>
      );
    }

    case "coreValues": {
      const values = (p.values as { title: string; description: string; howWeDoIt: string }[]) || [];
      return (
        <Fields title="Core Values">
          <ListEditor
            items={values}
            renderItem={(v, i) => (
              <div className="space-y-1.5">
                <Input label="Title" value={v.title} onChange={(val) => { const vs = [...values]; vs[i] = { ...vs[i], title: val }; set("values", vs); }} />
                <Textarea label="Description" value={v.description} onChange={(val) => { const vs = [...values]; vs[i] = { ...vs[i], description: val }; set("values", vs); }} />
                <Textarea label="How We Live This" value={v.howWeDoIt} onChange={(val) => { const vs = [...values]; vs[i] = { ...vs[i], howWeDoIt: val }; set("values", vs); }} />
              </div>
            )}
            onAdd={() => set("values", [...values, { title: "New Value", description: "", howWeDoIt: "" }])}
            onRemove={(i) => set("values", values.filter((_, j) => j !== i))}
          />
        </Fields>
      );
    }

    case "iconFeatures": {
      const features = (p.features as { icon: string; title: string; description: string }[]) || [];
      return (
        <Fields title="Icon Features">
          <ListEditor
            items={features}
            renderItem={(f, i) => (
              <div className="space-y-1.5">
                <Input label="Icon" value={f.icon} onChange={(v) => { const fs = [...features]; fs[i] = { ...fs[i], icon: v }; set("features", fs); }} />
                <Input label="Title" value={f.title} onChange={(v) => { const fs = [...features]; fs[i] = { ...fs[i], title: v }; set("features", fs); }} />
                <Textarea label="Description" value={f.description} onChange={(v) => { const fs = [...features]; fs[i] = { ...fs[i], description: v }; set("features", fs); }} />
              </div>
            )}
            onAdd={() => set("features", [...features, { icon: "star", title: "New Feature", description: "" }])}
            onRemove={(i) => set("features", features.filter((_, j) => j !== i))}
          />
        </Fields>
      );
    }

    default:
      return <div className="p-3 text-gray-500 text-sm">No properties for this block type.</div>;
  }
};

// ── Image Upload ──

function ImageUpload({ src, onSrc }: { src: string; onSrc: (v: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const isDataUrl = src?.startsWith("data:");
  const displayUrl = isDataUrl ? "" : (src || "");

  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-400 mb-1">Image</label>

      {src && (
        <div className="relative mb-2 group">
          <img src={src} alt="preview" className="w-full h-20 object-cover rounded border border-gray-700" />
          <button
            onClick={() => onSrc("")}
            className="absolute top-1 right-1 bg-gray-900/90 text-red-400 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded p-3 text-center cursor-pointer transition-colors mb-2 ${
          isDragging ? "border-blue-400 bg-blue-500/10 text-blue-400" : "border-gray-700 hover:border-gray-500 text-gray-500"
        }`}
      >
        <ImageIcon size={16} className="mx-auto mb-1" />
        <p className="text-[10px]">{isDragging ? "Drop to upload" : "Drop image or click to upload"}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        className="hidden"
      />

      <button
        onClick={() => setUrlMode((v) => !v)}
        className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors mb-1"
      >
        <Link size={11} /> {urlMode ? "Hide URL input" : "Or paste a URL"}
      </button>

      {urlMode && (
        <input
          value={displayUrl}
          onChange={(e) => onSrc(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-blue-500"
        />
      )}
    </div>
  );
}

// ── Shared UI ──

function Fields({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-400 mb-0.5">{label}</label>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
    </div>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-400 mb-0.5">{label}</label>
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-y" />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-400 mb-0.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ListEditor<T>({ items, renderItem, onAdd, onRemove }: {
  items: T[]; renderItem: (item: T, index: number) => React.ReactNode; onAdd: () => void; onRemove: (i: number) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="bg-gray-800 border border-gray-700 rounded p-2 relative">
          <button onClick={() => onRemove(i)} className="absolute top-1.5 right-1.5 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
          {renderItem(item, i)}
        </div>
      ))}
      <button onClick={onAdd} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
        <Plus size={14} /> Add item
      </button>
    </div>
  );
}

export default BlockPropertyEditor;
