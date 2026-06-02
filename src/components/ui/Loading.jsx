export default function Loading({ fullScreen = false }) {
  const el = (
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-luxury-primary" />
      <p className="text-sm text-luxury-muted">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-bg">
        {el}
      </div>
    );
  }
  return <div className="flex justify-center py-20">{el}</div>;
}
