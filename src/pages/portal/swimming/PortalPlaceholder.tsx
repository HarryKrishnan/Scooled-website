export default function PortalPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
      <div className="card-premium text-center py-16">
        <p className="text-muted-foreground">This section is coming soon.</p>
      </div>
    </div>
  );
}
