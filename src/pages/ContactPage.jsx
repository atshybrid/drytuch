import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { showToast } from '../store/slices/uiSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const contactInfo = [
  { icon: Mail, text: 'support@drytuch.com' },
  { icon: Phone, text: '+91 1800-DRY-TUCH' },
  { icon: MapPin, text: 'New Delhi, India' },
  { icon: Clock, text: 'Mon–Sat, 9 AM – 6 PM IST' },
];

export default function ContactPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    dispatch(showToast('Message sent! We will reply within 24 hours.'));
    reset();
  };

  return (
    <div className="page-pad">
      <p className="text-sm text-luxury-muted">We&apos;re here to help</p>

      <div className="mt-4 space-y-3 rounded-2xl card-luxury p-4">
        {contactInfo.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-luxury-secondary">
              <Icon size={16} />
            </span>
            {text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input label="Name" {...register('name', { required: true })} />
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Input as="textarea" label="Message" {...register('message', { required: true })} />
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
