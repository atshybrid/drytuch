import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, selectUser } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function EditProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: user || {} });

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    dispatch(showToast('Profile updated'));
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="page-pad space-y-4">
      <p className="text-sm text-luxury-muted">Update your account details</p>
      <Input label="Name" {...register('name')} />
      <Input label="Email" type="email" {...register('email')} />
      <Input label="Phone" {...register('phone')} />
      <Button type="submit" className="w-full">Save Changes</Button>
    </form>
  );
}
