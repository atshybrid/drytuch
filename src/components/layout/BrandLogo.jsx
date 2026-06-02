import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'md', linkTo = '/' }) {
  const sizes = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' };

  const el = (
    <span className={`font-display font-extrabold tracking-tight ${sizes[size]}`}>
      <span className="text-luxury-primary">DRY</span>
      <span className="text-stone-900">TUCH</span>
    </span>
  );

  return linkTo ? <Link to={linkTo}>{el}</Link> : el;
}
