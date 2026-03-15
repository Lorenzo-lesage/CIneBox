export function MovieCardText({ title, vote }: { title: string; vote: number }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4">
      <p className="text-white font-bold text-sm truncate">{title}</p>
      <span className="text-yellow-400 text-xs">★ {vote.toFixed(1)}</span>
    </div>
  );
}