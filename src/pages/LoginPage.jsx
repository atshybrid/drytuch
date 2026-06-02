import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userService } from '../api';
import { setCredentials } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BrandLogo from '../components/layout/BrandLogo';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const { user, token } = await userService.login(data.email, data.password);
      dispatch(setCredentials({ user, token }));
      dispatch(showToast(`Welcome, ${user.name}!`));
      navigate('/profile');
    } catch (e) {
      dispatch(showToast(e.message));
    }
  };

  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center page-pad">
      <BrandLogo size="lg" linkTo={null} />
      <h1 className="mt-6 font-display text-2xl font-bold">Sign In</h1>
      <p className="mt-1 text-sm text-luxury-muted">Access your orders & wishlist</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full max-w-sm space-y-4">
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password required' })}
          error={errors.password?.message}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-xs text-luxury-muted">Demo: rahul@drytuch.com / demo123</p>
    </div>
  );
}
