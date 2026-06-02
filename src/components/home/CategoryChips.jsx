import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../api';

export default function CategoryChips() {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });
  const [active, setActive] = useState('all');

  return (
    <div className="mt-6">
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <Link
          to="/categories"
          onClick={() => setActive('all')}
          className={`chip ${active === 'all' ? 'chip-active' : 'chip-inactive'}`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            onClick={() => setActive(cat.id)}
            className={`chip ${active === cat.id ? 'chip-active' : 'chip-inactive'}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
