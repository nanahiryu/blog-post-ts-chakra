import { useCallback, useState } from 'react';
import { Category } from '../types/api/Category';

type Props = {
  id: number;
  categories: Array<Category>;
  onOpen: () => void;
};

export const useSelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const onSelectCategory = useCallback((props: Props) => {
    const { id, categories, onOpen } = props;
    const targetCategory = categories.find((category) => category.id === id);
    setSelectedCategory(targetCategory!);
    onOpen();
  }, []);
  return { onSelectCategory, selectedCategory };
};
