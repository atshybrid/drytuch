import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function IconButton({
  icon: Icon,
  to,
  onClick,
  badge,
  variant = 'glass',
  className = '',
  label,
}) {
  const variants = {
    glass: 'glass text-stone-700 shadow-sm',
    primary: 'gradient-primary text-white shadow-md shadow-primary/25',
    ghost: 'bg-transparent text-stone-600',
  };

  const inner = (
    <>
      <Icon size={20} strokeWidth={2} />
      {badge > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-stone-900">
          {badge > 9 ? '9+' : badge}
        </span>
      ) : null}
    </>
  );

  const classes = `relative flex h-10 w-10 items-center justify-center rounded-xl transition ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label}>
        {inner}
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={classes}
      aria-label={label}
    >
      {inner}
    </motion.button>
  );
}
