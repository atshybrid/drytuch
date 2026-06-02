import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserPen,
  MapPin,
  Package,
  Heart,
  Bell,
  Tag,
  Info,
  Phone,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { logout, selectUser } from '../store/slices/authSlice';
import Button from '../components/ui/Button';

const menuItems = [
  { to: '/profile/edit', label: 'Edit Profile', icon: UserPen },
  { to: '/profile/addresses', label: 'Saved Addresses', icon: MapPin },
  { to: '/orders', label: 'My Orders', icon: Package },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/offers', label: 'Offers', icon: Tag },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
];

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center page-pad py-16">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-luxury-card text-luxury-muted">
          <UserPen size={32} />
        </div>
        <h2 className="mt-5 font-display text-xl font-bold">Welcome to DryTuch</h2>
        <p className="mt-2 max-w-xs text-center text-sm text-luxury-muted">
          Sign in to manage orders, wishlist and more
        </p>
        <Button className="mt-6" onClick={() => navigate('/profile/login')}>
          Sign In
        </Button>
        <p className="mt-4 text-xs text-luxury-muted">Demo: rahul@drytuch.com / demo123</p>
      </div>
    );
  }

  return (
    <div className="page-pad">
      <div className="flex items-center gap-4 rounded-2xl card-luxury p-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-16 w-16 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-bold">{user.name}</h1>
          <p className="truncate text-sm text-luxury-muted">{user.email}</p>
          <p className="text-sm text-luxury-muted">{user.phone}</p>
        </div>
      </div>

      <nav className="mt-5 space-y-1">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-luxury-secondary">
              <Icon size={18} />
            </span>
            <span className="flex-1 font-medium">{label}</span>
            <ChevronRight size={16} className="text-luxury-muted" />
          </Link>
        ))}
      </nav>

      <Button
        variant="outline"
        className="mt-8 w-full"
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
}
