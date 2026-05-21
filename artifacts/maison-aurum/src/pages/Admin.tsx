import { useState } from "react";
import { motion } from "framer-motion";
import { productStore, Product, JewelryCategory } from "@/lib/productStore";
import { Link } from "wouter";

const rowVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const FIELD_CLASS =
  "w-full bg-transparent border-b border-border/60 focus:border-primary/70 px-0 py-2.5 text-sm text-foreground outline-none transition-colors duration-400 placeholder:text-foreground/30 placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.14em] font-light";
const LABEL_CLASS = "text-[10px] uppercase tracking-[0.18em] text-foreground/45 mb-1.5 block";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("sga_admin") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>(productStore.getProducts());
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "surya2024") {
      sessionStorage.setItem("sga_admin", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect access key.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sga_admin");
    setIsAuthenticated(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      productStore.updateProduct(currentProduct.id, currentProduct as Product);
    } else {
      productStore.addProduct({ ...currentProduct, id: `p-${Date.now()}` } as Product);
    }
    setProducts(productStore.getProducts());
    setIsEditing(false);
    setCurrentProduct({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Remove this piece from the collection?")) {
      productStore.deleteProduct(id);
      setProducts(productStore.getProducts());
    }
  };

  /* ── Login screen ── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(0,0%,8%)] p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[360px]"
        >
          {/* Brand mark */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[hsl(46,70%,48%)] mb-4">Surya Gold &amp; Diamonds</p>
            <h1 className="font-serif text-3xl tracking-[0.15em] uppercase text-[hsl(40,40%,97%)]">
              Atelier Portal
            </h1>
            <div className="w-8 h-px bg-[hsl(46,70%,48%)]/40 mx-auto mt-5" />
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className={`${LABEL_CLASS} text-[hsl(40,40%,97%)]/40`}>Access Key</label>
              <input
                type="password"
                placeholder="Enter your access key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[hsl(40,40%,97%)]/15 focus:border-[hsl(46,70%,48%)]/60 px-0 py-3 text-sm text-[hsl(40,40%,97%)] outline-none transition-colors duration-400 placeholder:text-[hsl(40,40%,97%)]/20 placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.14em] font-light"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[hsl(0,84%,60%)] text-[11px] mt-3 tracking-wider uppercase"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[hsl(46,70%,48%)] text-[hsl(0,0%,8%)] py-3.5 uppercase tracking-[0.25em] text-[11px] font-medium hover:bg-[hsl(46,70%,55%)] transition-colors duration-500"
            >
              Enter
            </button>
          </form>

          <p className="text-center text-[10px] uppercase tracking-widest text-[hsl(40,40%,97%)]/15 mt-10">
            Established 1985 · Hyderabad
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-px h-5 bg-primary/40" />
            <h1 className="font-serif text-lg tracking-[0.25em] uppercase">Atelier Admin</h1>
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.2em] text-background/40 hover:text-primary transition-colors duration-400 border-l border-background/15 pl-5 ml-1"
            >
              View Site
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-[0.2em] text-background/40 hover:text-background transition-colors duration-400"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-14">
        {/* Header row */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-primary text-[10px] uppercase tracking-widest mb-2">Collection Management</p>
            <h2 className="font-serif text-3xl">Pieces</h2>
          </div>
          <button
            onClick={() => { setCurrentProduct({ category: "Rings" }); setIsEditing(true); }}
            className="border border-foreground/25 text-foreground px-7 py-3 text-[11px] uppercase tracking-[0.22em] hover:border-primary hover:text-primary transition-all duration-500"
          >
            + Add Piece
          </button>
        </div>

        {/* Edit / Add form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="border border-border/50 p-8 mb-12 bg-secondary/20"
          >
            <p className="text-primary text-[10px] uppercase tracking-widest mb-1">
              {currentProduct.id ? "Edit Piece" : "New Piece"}
            </p>
            <h3 className="font-serif text-2xl mb-8">{currentProduct.name || "Untitled"}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {[
                  { label: "Name", field: "name", type: "text" },
                  { label: "Material / Karat", field: "karat", type: "text" },
                  { label: "Image URL", field: "image", type: "text" },
                  { label: "Tags (comma-separated)", field: "tags", type: "text" },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className={LABEL_CLASS}>{label}</label>
                    <input
                      required={field !== "tags"}
                      type={type}
                      value={(currentProduct as Record<string, string>)[field] || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, [field]: e.target.value })}
                      className={FIELD_CLASS}
                    />
                  </div>
                ))}
                <div>
                  <label className={LABEL_CLASS}>Category</label>
                  <select
                    value={currentProduct.category || "Rings"}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value as JewelryCategory })}
                    className={`${FIELD_CLASS} bg-transparent`}
                  >
                    {["Rings", "Necklaces", "Earrings", "Bridal", "Custom"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={LABEL_CLASS}>Description</label>
                <textarea required rows={3} value={currentProduct.description || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className={`${FIELD_CLASS} resize-none`} />
              </div>
              <div>
                <label className={LABEL_CLASS}>Craftsmanship Notes</label>
                <textarea required rows={2} value={currentProduct.craftsmanship || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, craftsmanship: e.target.value })}
                  className={`${FIELD_CLASS} resize-none`} />
              </div>
              <div className="flex justify-end gap-6 pt-5 border-t border-border/30">
                <button type="button" onClick={() => setIsEditing(false)}
                  className="text-[11px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors duration-400">
                  Cancel
                </button>
                <button type="submit"
                  className="bg-foreground text-background px-8 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-primary transition-colors duration-500">
                  Save Piece
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products table */}
        <div className="border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-normal">Piece</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-normal">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-normal">Material</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={rowVariant}
                    className="border-b border-border/20 hover:bg-primary/[0.03] transition-colors duration-400 group"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-11 h-11 overflow-hidden bg-secondary shrink-0">
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" />
                      </div>
                      <span className="font-serif text-lg">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-foreground/55 text-[11px] uppercase tracking-wider">{product.category}</td>
                    <td className="px-6 py-4 text-foreground/50 font-light text-sm">{product.karat}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                        className="text-[10px] uppercase tracking-widest text-primary/70 hover:text-primary mr-5 transition-colors duration-400"
                      >Edit</button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-[10px] uppercase tracking-widest text-foreground/25 hover:text-destructive transition-colors duration-400"
                      >Remove</button>
                    </td>
                  </motion.tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-foreground/30 font-light text-sm tracking-wider">
                      No pieces in the collection. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
