import { useState } from "react";

export default function ProductCard({product, onEdit, onDelete}){
     const [edit, setEdit] = useState(false);
     const [draft, setDraft] = useState(product);

     return(
          <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300">
               {!edit ? (
                    <div className="p-5">
                         {/* Category Badge & Stock Status */}
                         <div className="flex items-center justify-between mb-3">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                   </svg>
                                   {product.category}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                                   product.inStock 
                                        ? "bg-green-50 text-green-700" 
                                        : "bg-red-50 text-red-700"
                              }`}>
                                   <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></span>
                                   {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                         </div>

                         {/* Product Info */}
                         <div className="mb-4">
                              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                   {product.name}
                              </h3>
                              <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                                   {product.description}
                              </p>
                              <div className="flex items-baseline gap-2">
                                   <span className="text-3xl font-bold text-green-600">
                                        ${product.price.toFixed(2)}
                                   </span>
                              </div>
                         </div>

                         {/* Metadata */}
                         {product.createdAt && (
                              <div className="flex items-center gap-1 text-slate-400 text-xs mb-4 border-t pt-3">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                   </svg>
                                   Added {new Date(product.createdAt).toLocaleDateString()}
                              </div>
                         )}

                         {/* Action Buttons */}
                         <div className="flex gap-2">
                              <button 
                                   onClick={() => setEdit(true)} 
                                   className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                              >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                   </svg>
                                   Edit
                              </button>
                              <button 
                                   onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                                             onDelete(product._id);
                                        }
                                   }} 
                                   className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2.5 hover:bg-red-700 transition-colors font-medium shadow-sm hover:shadow-md"
                              >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                   </svg>
                                   Delete
                              </button>
                         </div>
                    </div>
               ) : (
                    <form className="p-5 space-y-3 bg-slate-50" onSubmit={(e) => { e.preventDefault(); onEdit(draft); setEdit(false); }}>
                         <h3 className="text-lg font-bold text-slate-800 mb-3">Edit Product</h3>
                         
                         <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                              <input 
                                   className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                   placeholder="Product Name"
                                   value={draft.name}
                                   onChange={e=> setDraft({...draft, name: e.target.value})}
                                   required
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                              <textarea 
                                   className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                   placeholder="Description"
                                   rows="2"
                                   value={draft.description}     
                                   onChange={e=> setDraft({...draft, description: e.target.value})}
                                   required
                              />
                         </div>

                         <div className="grid grid-cols-2 gap-3">
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                                   <input 
                                        className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        type="number"
                                        step="0.01"
                                        placeholder="Price"
                                        value={draft.price}
                                        onChange={e=> setDraft({...draft, price: parseFloat(e.target.value)})}
                                        required
                                   />
                              </div>
                              
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                   <input 
                                        className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        type="text"
                                        placeholder="Category"
                                        value={draft.category}
                                        onChange={e=> setDraft({...draft, category: e.target.value})}
                                        required
                                   />
                              </div>
                         </div>

                         <label className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
                              <input 
                                   type="checkbox"
                                   checked={draft.inStock}
                                   onChange={e=> setDraft({...draft, inStock: e.target.checked})}
                                   className="rounded w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm font-medium text-slate-700">In Stock</span>
                         </label>

                         <div className="flex gap-2 mt-4 pt-3 border-t">
                              <button 
                                   type="submit" 
                                   className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 flex-1 font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                              >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                   </svg>
                                   Save
                              </button>
                              <button 
                                   type="button" 
                                   onClick={() => { setEdit(false); setDraft(product); }} 
                                   className="bg-slate-600 text-white px-4 py-2.5 rounded-lg hover:bg-slate-700 flex-1 font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                              >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                                   Cancel
                              </button>
                         </div>               
                    </form>
               )}
          </div>
     )
}