export default function Header(){
     return(
          <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg">
               <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                         </div>
                         <div>
                              <h1 className="text-2xl font-bold text-white tracking-tight">Product Dashboard</h1>
                              <p className="text-blue-100 text-sm">Manage your inventory efficiently</p>
                         </div>
                    </div>
                    <div className="hidden md:block">
                         <span className="text-white/90 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                              MERN Stack Assignment
                         </span>
                    </div>
               </div>
          </header>
     )
}