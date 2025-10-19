import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../lib/api";



export default function Home() {
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     useEffect(()=>{
          (async()=>{
               try {
                    setLoading(true);
                    const data = await fetchProducts();
                    setProducts(data);
               } catch (error) {
                    setError("Failed to fetch products");
                    console.error("Error fetching products:", error);
               } finally {
                    setLoading(false);
               }

          })();
     }, []);

     async function handleAdd(product) {
          const created = await createProduct(product);
          setProducts(prev => [created, ...prev]);
     }

     async function handleEdit(updatedProduct) {
          const updated = await updateProduct(updatedProduct);
          setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
     }

     async function handleDelete(id) {
          await deleteProduct(id);
          setProducts(prev => prev.filter(p => p._id !== id));
     }

     const totalProducts = products.length;
     const inStockProducts = products.filter(p => p.inStock).length;
     const outOfStockProducts = totalProducts - inStockProducts;
     const totalValue = products.reduce((sum, p) => sum + p.price, 0);

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
               <div className="max-w-7xl mx-auto p-6 space-y-6">
                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Products</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">{totalProducts}</p>
                                   </div>
                                   <div className="bg-blue-100 rounded-full p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-slate-600 text-sm font-medium">In Stock</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">{inStockProducts}</p>
                                   </div>
                                   <div className="bg-green-100 rounded-full p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-slate-600 text-sm font-medium">Out of Stock</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">{outOfStockProducts}</p>
                                   </div>
                                   <div className="bg-red-100 rounded-full p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-slate-600 text-sm font-medium">Total Value</p>
                                        <p className="text-3xl font-bold text-slate-800 mt-1">${totalValue.toFixed(2)}</p>
                                   </div>
                                   <div className="bg-purple-100 rounded-full p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Messages */}
                    {loading && (
                         <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                              <div className="flex items-center">
                                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                                   <p className="text-blue-800 font-medium">Loading products...</p>
                              </div>
                         </div>
                    )}
                    {error && (
                         <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                              <p className="text-red-800 font-medium">{error}</p>
                         </div>
                    )}

                    {/* Add Product Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                         <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Add New Product
                         </h2>
                         <ProductForm onAdd={handleAdd} />
                    </div>

                    {/* Products Grid */}
                    <div>
                         <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              Product Inventory ({totalProducts})
                         </h2>
                         {products.length === 0 && !loading && (
                              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                   <div className="flex justify-center mb-4">
                                        <div className="bg-slate-100 rounded-full p-6">
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                             </svg>
                                        </div>
                                   </div>
                                   <h3 className="text-xl font-semibold text-slate-700 mb-2">No products yet</h3>
                                   <p className="text-slate-500">Get started by adding your first product above.</p>
                              </div>
                         )}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {products.map(product => (
                                   <ProductCard key={product._id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
}