export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-heading font-black text-foreground">SAV - LAPTOP</h1>
                <p className="text-sm text-muted-foreground font-medium">Tienda de Computadoras</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}
