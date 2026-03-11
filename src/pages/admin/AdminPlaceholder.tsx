export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-navy">{title}</h1>
      <div className="card-premium text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-navy/60 text-sm font-medium">This section is coming soon.</p>
        <p className="text-navy/40 text-xs mt-2">We're working on bringing you more features.</p>
      </div>
    </div>
  );
}
