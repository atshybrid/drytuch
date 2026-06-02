export default function StarRating({ rating, size = 'sm' }) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <span className={`inline-flex items-center gap-0.5 text-accent ${sizes[size]}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < full ? '★' : i === full && half ? '★' : '☆'}
        </span>
      ))}
      <span className="ml-1 text-stone-500">{rating}</span>
    </span>
  );
}
