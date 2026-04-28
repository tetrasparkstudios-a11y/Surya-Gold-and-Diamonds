import { useState } from "react";
import { productStore, Product, JewelryCategory } from "@/lib/productStore";
import { Link } from "wouter";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('sga_admin') === 'true');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [products, setProducts] = useState<Product[]>(productStore.getProducts());
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "surya2024") {
      sessionStorage.setItem('sga_admin', 'true');
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sga_admin');
    setIsAuthenticated(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      productStore.updateProduct(currentProduct.id, currentProduct as Product);
    } else {
      const newProduct = {
        ...currentProduct,
        id: `p-${Date.now()}`
      } as Product;
      productStore.addProduct(newProduct);
    }
    setProducts(productStore.getProducts());
    setIsEditing(false);
    setCurrentProduct({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productStore.deleteProduct(id);
      setProducts(productStore.getProducts());
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm bg-card p-8 rounded-xl border border-border shadow-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl tracking-widest uppercase mb-2">Admin Portal</h1>
            <p className="text-muted-foreground text-sm">Surya Gold & Diamonds</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
              {error && <p className="text-destructive text-xs mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-foreground text-background py-3 uppercase tracking-widest text-xs font-medium hover:bg-foreground/90 transition-colors">
              Access Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground text-background py-4 px-6 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl tracking-widest uppercase">Admin Panel</h1>
            <Link href="/" className="text-xs uppercase text-background/60 hover:text-primary transition-colors ml-4 border-l border-background/20 pl-4">View Site</Link>
          </div>
          <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-background/60 hover:text-background transition-colors">
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl">Products</h2>
          <button 
            onClick={() => {
              setCurrentProduct({ category: "Rings" });
              setIsEditing(true);
            }}
            className="bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
          >
            + Add Product
          </button>
        </div>

        {isEditing ? (
          <div className="bg-card border border-border rounded-xl p-8 mb-12 shadow-sm">
            <h3 className="font-serif text-2xl mb-6">{currentProduct.id ? 'Edit Product' : 'New Product'}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/70">Name</label>
                  <input required type="text" value={currentProduct.name || ''} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/70">Category</label>
                  <select value={currentProduct.category || 'Rings'} onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value as JewelryCategory})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none">
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/70">Image URL</label>
                  <input required type="text" value={currentProduct.image || ''} onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/70">Material (Karat)</label>
                  <input required type="text" value={currentProduct.karat || ''} onChange={(e) => setCurrentProduct({...currentProduct, karat: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/70">Tags (comma-separated)</label>
                  <input type="text" value={currentProduct.tags || ''} onChange={(e) => setCurrentProduct({...currentProduct, tags: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/70">Description</label>
                <textarea required rows={3} value={currentProduct.description || ''} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/70">Craftsmanship Notes</label>
                <textarea required rows={2} value={currentProduct.craftsmanship || ''} onChange={(e) => setCurrentProduct({...currentProduct, craftsmanship: e.target.value})} className="w-full border border-border rounded-md px-4 py-2 text-sm bg-background focus:border-primary focus:outline-none" />
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-border">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground">Cancel</button>
                <button type="submit" className="bg-foreground text-background px-6 py-2 text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors rounded-sm">Save Product</button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-widest text-xs text-foreground/50 bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Material</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y border-t border-border divide-border">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md bg-secondary" />
                      <span className="font-serif text-lg">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 text-foreground/70">{product.karat}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="text-primary hover:text-primary/80 mr-4 text-xs uppercase tracking-widest">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive/80 text-xs uppercase tracking-widest">Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-foreground/50">No products found. Add one above.</td>
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
