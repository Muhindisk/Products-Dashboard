import { useState } from "react";

export default function ProductForm({ onAdd }){
     const [form, setForm] = useState({
          name: "",
          description: "",
          price: "",
          category: "",
          inStock: false
     });

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setForm({
               ...form,
               [name]: type === "checkbox" ? checked : value
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if(!form.name || !form.description || !form.price || !form.category){
               alert("Please fill in all required fields.");
               return;
          }
          
          try {
               await onAdd({...form, price: parseFloat(form.price)});
               setForm({name: "", description: "", price: "", category: "", inStock: false});
          } catch (error) {
               console.error("Error adding product:", error);
               alert("Failed to add product. Please try again.");
          }
     }

return(
     <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                    <input 
                         name="name" 
                         value={form.name} 
                         onChange={handleChange} 
                         placeholder="e.g., Wireless Mouse"
                         className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
               </div>

               <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <input
                         name="description"
                         value={form.description}
                         onChange={handleChange}
                         placeholder="e.g., Ergonomic design with..."
                         className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
               </div>

               <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                    <input
                         name="price"
                         type="number"
                         step="0.01"
                         value={form.price}
                         onChange={handleChange}
                         placeholder="29.99"
                         className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
               </div>

               <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <input
                         name="category"
                         value={form.category}
                         onChange={handleChange}
                         placeholder="e.g., Electronics"
                         className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
               </div>
          </div>

          <div className="flex items-center justify-between">
               <label className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                         name="inStock"
                         type="checkbox"
                         checked={form.inStock}
                         onChange={handleChange}
                         className="rounded w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-700">In Stock</span>
               </label>

               <button 
                    type="submit" 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-6 py-2.5 hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg"
               >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
               </button>
          </div>
     </form>
)
}