import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productStore, Product, JewelryCategory } from "@/lib/productStore";
import { Link } from "wouter";
import {
  ChevronUp, ChevronDown, Star, Eye, Upload, X,
  Search, Download, UploadCloud, ArrowUpDown, Gem,
  Layers, Clock, Package
} from "lucide-react";

/* ─── Constants ─── */
const CATEGORIES: JewelryCategory[] = ["Rings", "Necklaces", "Earrings", "Bridal", "Custom"];
const SORT_OPTIONS = [
  { value: "default", label: "Collection Order" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "alpha", label: "A → Z" },
  { value: "alpha-desc", label: "Z → A" },
] as const;
type SortOption = typeof SORT_OPTIONS[number]["value"];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/* ─── Animation variants (subtle, fast, functional) ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
const modalContent = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.25 } }
};

/* ─── Shared classes ─── */
const FIELD_CLASS =
  "w-full bg-transparent border-b border-border/50 focus:border-primary/60 focus:bg-primary/[0.02] px-0 py-2.5 text-sm text-foreground outline-none transition-all duration-400 placeholder:text-foreground/25 placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.14em] font-light focus-visible:ring-0";
const LABEL_CLASS = "text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2 block font-medium";
const CARD_CLASS = "border border-border/25 bg-background p-5 md:p-6 transition-all duration-400 hover:border-primary/15 hover:shadow-[0_4px_20px_rgba(212,163,42,0.03)]";
const BTN_ICON = "p-1.5 text-foreground/30 hover:text-primary hover:bg-primary/[0.04] transition-all duration-300 rounded-sm";

/* ═══════════════════════════════════════════ */

export default function Admin() {
  /* ─── Auth ─── */
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("sga_admin") === "true"
  );
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  /* ─── Products ─── */
  const [products, setProducts] = useState<Product[]>(productStore.getProducts());
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  /* ─── Search & Filter ─── */
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<JewelryCategory | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  /* ─── Delete modal ─── */
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  /* ─── Image upload ─── */
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Import ─── */
  const importInputRef = useRef<HTMLInputElement>(null);

  /* ─── Handlers ─── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "surya2024") {
      sessionStorage.setItem("sga_admin", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect access key.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sga_admin");
    setIsAuthenticated(false);
  };

  const refreshProducts = () => setProducts(productStore.getProducts());

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = imagePreview || currentProduct.image || "";
    const productData = { ...currentProduct, image: finalImage };

    if (currentProduct.id) {
      productStore.updateProduct(currentProduct.id, productData as Product);
    } else {
      productStore.addProduct({ ...productData, id: `p-${Date.now()}` } as Product);
    }
    refreshProducts();
    setIsEditing(false);
    setCurrentProduct({});
    setImagePreview(null);
    setUploadError("");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    productStore.deleteProduct(deleteTarget.id);
    refreshProducts();
    setDeleteTarget(null);
  };

  /* ─── Image Upload ─── */
  const processFile = useCallback((file: File) => {
    setUploadError("");
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError("Unsupported format. Use JPG, PNG, or WEBP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum 5MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setCurrentProduct(prev => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setCurrentProduct(prev => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ─── Reorder ─── */
  const moveProduct = (index: number, direction: "up" | "down") => {
    const newProducts = [...products];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProducts.length) return;
    [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
    productStore.reorderProducts(newProducts);
    refreshProducts();
  };

  /* ─── Feature Toggles ─── */
  const toggleFeatured = (id: string) => {
    productStore.toggleFeatured(id);
    refreshProducts();
  };
  const toggleHero = (id: string) => {
    productStore.toggleHeroShowcase(id);
    refreshProducts();
  };

  /* ─── Export / Import ─── */
  const handleExport = () => {
    const json = productStore.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `surya-gold-collection-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const success = productStore.importJSON(ev.target?.result as string);
      if (success) {
        refreshProducts();
      } else {
        alert("Invalid collection file. Please use a valid JSON export.");
      }
    };
    reader.readAsText(file);
    if (importInputRef.current) importInputRef.current.value = "";
  };

  /* ─── Filtering & Sorting ─── */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.karat.toLowerCase().includes(q) ||
        (p.tags || "").toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.reverse();
        break;
      case "alpha":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-desc":
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
      case "default":
      default:
        break;
    }

    return result;
  }, [products, searchQuery, categoryFilter, sortBy]);

  /* ─── Stats ─── */
  const stats = useMemo(() => {
    const categories = new Set(products.map(p => p.category));
    const featuredPiece = products.find(p => p.featured);
    return {
      total: products.length,
      categories: categories.size,
      featured: featuredPiece?.name || "None selected",
      lastUpdated: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };
  }, [products]);

  /* ═══════════════════════════════════════════
      LOGIN SCREEN
     ═══════════════════════════════════════════ */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-foreground p-6 relative overflow-hidden">
        {/* Ambient gold wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,163,42,0.04),transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[360px] relative z-10"
        >
          {/* Brand mark */}
          <div className="text-center mb-12">
            <img src="/assets/surya-s-monogram-footer.png" alt="Surya Gold" className="h-16 mx-auto mb-6 opacity-80" />
            <p className="label-luxury text-primary/70 mb-4">Surya Gold &amp; Diamonds</p>
            <h1 className="font-serif text-3xl tracking-[0.12em] uppercase text-background">
              Atelier Portal
            </h1>
            <div className="w-10 h-px bg-primary/30 mx-auto mt-5" />
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label htmlFor="admin-password" className="text-[10px] uppercase tracking-[0.2em] text-background/35 mb-2 block font-medium">
                Access Key
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter your access key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-background/12 focus:border-primary/50 focus:bg-primary/[0.02] px-0 py-3 text-sm text-background outline-none transition-all duration-400 placeholder:text-background/18 placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.14em] font-light"
              />
              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <div className="w-4 h-px bg-destructive/60" />
                    <p className="text-destructive text-[11px] tracking-wider uppercase">{authError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-foreground py-3.5 uppercase tracking-[0.25em] text-[11px] font-medium btn-luxury cta-shimmer"
            >
              Enter Atelier
            </button>
          </form>

          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-background/12 mt-12">
            Established 1985 · Hyderabad
          </p>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
      DASHBOARD
     ═══════════════════════════════════════════ */
  const currentPreview = imagePreview || currentProduct.image || "";

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="bg-foreground text-background py-5 px-6 sticky top-0 z-30 backdrop-blur-md border-b border-primary/8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/surya-s-monogram-footer.png" alt="" className="h-7 opacity-70" />
            <div className="w-px h-5 bg-primary/25" />
            <h1 className="font-serif text-lg tracking-[0.2em] uppercase hidden sm:block">Atelier</h1>
            <div className="hidden md:flex items-center gap-1 border-l border-background/10 pl-4 ml-1">
              <Link href="/" className="text-[10px] uppercase tracking-[0.18em] text-background/35 hover:text-primary transition-colors duration-300 px-2 py-1">
                Homepage
              </Link>
              <a href="/#collections" className="text-[10px] uppercase tracking-[0.18em] text-background/35 hover:text-primary transition-colors duration-300 px-2 py-1">
                Collection
              </a>
              <a href="/#contact" className="text-[10px] uppercase tracking-[0.18em] text-background/35 hover:text-primary transition-colors duration-300 px-2 py-1">
                Contact
              </a>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-[0.18em] text-background/35 hover:text-background transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-6xl">

        {/* ═══ Overview Cards ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
          {[
            { label: "Total Pieces", value: stats.total, icon: Package },
            { label: "Categories", value: stats.categories, icon: Layers },
            { label: "Featured", value: stats.featured, icon: Star },
            { label: "Last Updated", value: stats.lastUpdated, icon: Clock },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={CARD_CLASS}
              role="status"
              aria-label={`${card.label}: ${card.value}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <card.icon size={13} className="text-primary/50" />
                <p className="text-[9px] uppercase tracking-[0.22em] text-foreground/35 font-medium">{card.label}</p>
              </div>
              <p className={`font-serif ${typeof card.value === "number" ? "text-2xl" : "text-sm"} text-foreground/85 truncate`}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ═══ Toolbar: Title + Actions ═══ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <p className="label-luxury text-primary mb-1">Collection Management</p>
            <h2 className="font-serif text-2xl md:text-3xl">Pieces</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Export */}
            <button onClick={handleExport} className={`${BTN_ICON} flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-2`} aria-label="Export collection">
              <Download size={13} /> Export
            </button>
            {/* Import */}
            <button onClick={() => importInputRef.current?.click()} className={`${BTN_ICON} flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-2`} aria-label="Import collection">
              <UploadCloud size={13} /> Import
            </button>
            <input ref={importInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            {/* Add piece */}
            <button
              onClick={() => { setCurrentProduct({ category: "Rings" }); setImagePreview(null); setIsEditing(true); }}
              className="border border-foreground/20 text-foreground px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-400 font-medium"
            >
              + Add Piece
            </button>
          </div>
        </div>

        {/* ═══ Search & Filter Bar ═══ */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/25" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..."
              className="w-full bg-transparent border-b border-border/40 focus:border-primary/50 pl-6 pr-2 py-2 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/25 font-light"
            />
          </div>
          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as JewelryCategory | "All")}
            className="bg-transparent border-b border-border/40 focus:border-primary/50 py-2 text-[11px] uppercase tracking-wider text-foreground/60 outline-none transition-colors duration-300 appearance-none pr-6"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23c5a24d' stroke-width='1' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0 center" }}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent border-b border-border/40 focus:border-primary/50 py-2 text-[11px] uppercase tracking-wider text-foreground/60 outline-none transition-colors duration-300 appearance-none pr-6"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23c5a24d' stroke-width='1' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0 center" }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* ═══ Edit / Add Form ═══ */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border border-border/30 p-6 md:p-8 mb-10 bg-secondary/10 relative"
            >
              {/* Form header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="label-luxury text-primary mb-1">{currentProduct.id ? "Edit Piece" : "New Piece"}</p>
                  <h3 className="font-serif text-xl md:text-2xl">{currentProduct.name || "Untitled"}</h3>
                </div>
                <button onClick={() => { setIsEditing(false); setImagePreview(null); }} className={BTN_ICON} aria-label="Close form">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-8">
                {/* Section: Details */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-foreground/25 mb-5 flex items-center gap-2">
                    <span className="w-3 h-px bg-primary/30" /> Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label htmlFor="edit-name" className={LABEL_CLASS}>Name</label>
                      <input id="edit-name" required type="text"
                        value={currentProduct.name || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                        className={FIELD_CLASS} />
                    </div>
                    <div>
                      <label htmlFor="edit-category" className={LABEL_CLASS}>Category</label>
                      <select id="edit-category"
                        value={currentProduct.category || "Rings"}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value as JewelryCategory })}
                        className={`${FIELD_CLASS} appearance-none`}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23c5a24d' stroke-width='1' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0 center" }}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-karat" className={LABEL_CLASS}>Material / Karat</label>
                      <input id="edit-karat" required type="text"
                        value={currentProduct.karat || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, karat: e.target.value })}
                        className={FIELD_CLASS} />
                    </div>
                    <div>
                      <label htmlFor="edit-clarity" className={LABEL_CLASS}>Clarity</label>
                      <input id="edit-clarity" type="text"
                        value={currentProduct.clarity || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, clarity: e.target.value })}
                        placeholder="e.g. VVS1, VS1"
                        className={FIELD_CLASS} />
                    </div>
                    <div>
                      <label htmlFor="edit-tags" className={LABEL_CLASS}>Tags <span className="normal-case tracking-normal text-foreground/20">(comma-separated)</span></label>
                      <input id="edit-tags" type="text"
                        value={currentProduct.tags || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, tags: e.target.value })}
                        className={FIELD_CLASS} />
                    </div>
                  </div>
                </div>

                {/* Section: Media */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-foreground/25 mb-5 flex items-center gap-2">
                    <span className="w-3 h-px bg-primary/30" /> Media
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload zone */}
                    <div>
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all duration-300 ${
                          isDragging
                            ? "border-primary/50 bg-primary/[0.03]"
                            : "border-border/30 hover:border-primary/25 hover:bg-primary/[0.01]"
                        }`}
                      >
                        <Upload size={20} className="mx-auto mb-3 text-foreground/25" />
                        <p className="text-[11px] text-foreground/40 mb-1">Drag & drop or click to upload</p>
                        <p className="text-[9px] text-foreground/20 uppercase tracking-wider">JPG, PNG, WEBP · Max 5MB</p>
                      </div>
                      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={handleFileSelect} />
                      {uploadError && (
                        <p className="text-destructive text-[11px] mt-2 tracking-wider">{uploadError}</p>
                      )}
                      {/* Or paste URL */}
                      <div className="mt-4">
                        <label htmlFor="edit-image-url" className={LABEL_CLASS}>Or paste image URL</label>
                        <input id="edit-image-url" type="text"
                          value={currentProduct.image || ""}
                          onChange={(e) => { setCurrentProduct({ ...currentProduct, image: e.target.value }); setImagePreview(null); }}
                          placeholder="https://..."
                          className={FIELD_CLASS} />
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      {currentPreview ? (
                        <div className="relative aspect-[4/5] bg-secondary overflow-hidden group">
                          <img src={currentPreview} alt="Preview" className="w-full h-full object-cover image-luxury-grade" />
                          <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5" />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 bg-foreground/80 text-background hover:bg-destructive transition-colors duration-300 opacity-0 group-hover:opacity-100"
                            aria-label="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-[4/5] border border-dashed border-border/20 flex items-center justify-center">
                          <div className="text-center">
                            <Gem size={24} className="mx-auto mb-2 text-foreground/10" />
                            <p className="text-[10px] text-foreground/20 uppercase tracking-wider">No image</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section: Story */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-foreground/25 mb-5 flex items-center gap-2">
                    <span className="w-3 h-px bg-primary/30" /> Story
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="edit-description" className={LABEL_CLASS}>Description</label>
                      <textarea id="edit-description" required rows={3}
                        value={currentProduct.description || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                        className={`${FIELD_CLASS} resize-none`} />
                    </div>
                    <div>
                      <label htmlFor="edit-craftsmanship" className={LABEL_CLASS}>Craftsmanship Notes</label>
                      <textarea id="edit-craftsmanship" required rows={2}
                        value={currentProduct.craftsmanship || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, craftsmanship: e.target.value })}
                        className={`${FIELD_CLASS} resize-none`} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-5 pt-5 border-t border-border/20">
                  <button type="button" onClick={() => { setIsEditing(false); setImagePreview(null); }}
                    className="text-[11px] uppercase tracking-widest text-foreground/35 hover:text-foreground border border-transparent hover:border-border/30 px-5 py-2.5 transition-all duration-300">
                    Cancel
                  </button>
                  <button type="submit"
                    className="bg-primary text-foreground px-8 py-2.5 text-[11px] uppercase tracking-[0.2em] btn-luxury cta-shimmer font-medium">
                    {currentProduct.id ? "Update Piece" : "Save Piece"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ Products Table (Desktop) ═══ */}
        <div className="border border-border/25 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center bg-secondary/20 border-b border-border/25">
            <div className="px-4 py-3">
              <ArrowUpDown size={12} className="text-foreground/20" />
            </div>
            <div className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">Piece</div>
            <div className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">Category</div>
            <div className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">Material</div>
            <div className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">Status</div>
            <div className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium text-right">Actions</div>
          </div>

          {/* Rows */}
          {filteredProducts.map((product, i) => {
            const originalIndex = products.findIndex(p => p.id === product.id);
            return (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="border-b border-border/15 hover:bg-primary/[0.02] transition-colors duration-300 group"
              >
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-[auto_3fr_1fr_1fr_1fr_auto] items-center">
                  {/* Reorder */}
                  <div className="px-3 py-3 flex flex-col gap-0.5">
                    <button onClick={() => moveProduct(originalIndex, "up")} disabled={originalIndex === 0}
                      className={`${BTN_ICON} disabled:opacity-15`} aria-label="Move up">
                      <ChevronUp size={14} />
                    </button>
                    <button onClick={() => moveProduct(originalIndex, "down")} disabled={originalIndex === products.length - 1}
                      className={`${BTN_ICON} disabled:opacity-15`} aria-label="Move down">
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {/* Product info */}
                  <div className="px-4 py-3 flex items-center gap-4">
                    <div className="w-14 h-14 overflow-hidden bg-secondary shrink-0">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover image-luxury-grade group-hover:scale-[1.04] transition-transform duration-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-serif text-base block truncate">{product.name}</span>
                      <span className="text-[11px] text-foreground/35 font-light line-clamp-1 mt-0.5">{product.description}</span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="px-4 py-3 text-foreground/50 text-[11px] uppercase tracking-wider">{product.category}</div>

                  {/* Material */}
                  <div className="px-4 py-3 text-foreground/45 font-light text-sm">{product.karat}</div>

                  {/* Featured / Hero badges */}
                  <div className="px-4 py-3 flex items-center gap-2">
                    <button onClick={() => toggleFeatured(product.id)}
                      className={`p-1 transition-colors duration-300 ${product.featured ? "text-primary" : "text-foreground/15 hover:text-primary/50"}`}
                      aria-label={product.featured ? "Remove featured" : "Set as featured"} title="Featured Masterpiece">
                      <Star size={14} fill={product.featured ? "currentColor" : "none"} />
                    </button>
                    <button onClick={() => toggleHero(product.id)}
                      className={`p-1 transition-colors duration-300 ${product.heroShowcase ? "text-primary" : "text-foreground/15 hover:text-primary/50"}`}
                      aria-label={product.heroShowcase ? "Remove from showcase" : "Add to showcase"} title="Hero Showcase">
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-3 text-right flex items-center justify-end gap-3">
                    <button
                      onClick={() => { setCurrentProduct(product); setImagePreview(null); setIsEditing(true); }}
                      className="text-[10px] uppercase tracking-wider text-primary/60 hover:text-primary transition-colors duration-300"
                      aria-label={`Edit ${product.name}`}
                    >Edit</button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="text-[10px] uppercase tracking-wider text-foreground/20 hover:text-destructive transition-colors duration-300"
                      aria-label={`Remove ${product.name}`}
                    >Remove</button>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="md:hidden p-4 flex gap-4">
                  <div className="w-20 h-20 overflow-hidden bg-secondary shrink-0">
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover image-luxury-grade" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif text-base truncate">{product.name}</p>
                        <p className="text-[11px] text-foreground/40 mt-0.5">{product.category} · {product.karat}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => toggleFeatured(product.id)}
                          className={`p-1 ${product.featured ? "text-primary" : "text-foreground/15"}`}>
                          <Star size={13} fill={product.featured ? "currentColor" : "none"} />
                        </button>
                        <button onClick={() => toggleHero(product.id)}
                          className={`p-1 ${product.heroShowcase ? "text-primary" : "text-foreground/15"}`}>
                          <Eye size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button onClick={() => moveProduct(originalIndex, "up")} className={BTN_ICON} aria-label="Move up"><ChevronUp size={14} /></button>
                      <button onClick={() => moveProduct(originalIndex, "down")} className={BTN_ICON} aria-label="Move down"><ChevronDown size={14} /></button>
                      <div className="flex-1" />
                      <button onClick={() => { setCurrentProduct(product); setImagePreview(null); setIsEditing(true); }}
                        className="text-[10px] uppercase tracking-wider text-primary/60">Edit</button>
                      <button onClick={() => setDeleteTarget(product)}
                        className="text-[10px] uppercase tracking-wider text-foreground/20">Remove</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="px-6 py-20 text-center">
              <Gem size={32} className="mx-auto mb-4 text-foreground/10" />
              <p className="text-foreground/30 font-light text-sm tracking-wider mb-1">
                {searchQuery || categoryFilter !== "All" ? "No pieces match your search." : "No pieces in the collection."}
              </p>
              <p className="text-foreground/15 text-[11px] tracking-wider">
                {searchQuery || categoryFilter !== "All" ? "Try adjusting your filters." : "Add one to begin curating."}
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        {(searchQuery || categoryFilter !== "All") && (
          <p className="text-[10px] uppercase tracking-wider text-foreground/25 mt-3">
            Showing {filteredProducts.length} of {products.length} pieces
          </p>
        )}
      </main>

      {/* ═══ Delete Confirmation Modal ═══ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            variants={modalOverlay} initial="hidden" animate="visible" exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-6"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              variants={modalContent} initial="hidden" animate="visible" exit="exit"
              className="bg-background border border-border/30 p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Product preview */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/20">
                <div className="w-16 h-16 overflow-hidden bg-secondary shrink-0">
                  <img src={deleteTarget.image} alt={deleteTarget.name} className="w-full h-full object-cover image-luxury-grade" />
                </div>
                <div>
                  <p className="font-serif text-lg">{deleteTarget.name}</p>
                  <p className="text-[11px] text-foreground/40 uppercase tracking-wider mt-0.5">{deleteTarget.category}</p>
                </div>
              </div>

              <p className="text-foreground/60 text-sm font-light leading-relaxed mb-8">
                This piece will be permanently removed from the collection. This action cannot be undone.
              </p>

              <div className="flex justify-end gap-4">
                <button onClick={() => setDeleteTarget(null)}
                  className="text-[11px] uppercase tracking-widest text-foreground/40 hover:text-foreground px-4 py-2 transition-colors duration-300">
                  Cancel
                </button>
                <button onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-destructive/90 transition-colors duration-300">
                  Remove Piece
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
