import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { 
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr
} from 'src/constants/articleProps';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  currentStyles: ArticleStateType;
  onApply: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  currentStyles,
  onApply
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(currentStyles);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(currentStyles);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      <aside 
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`} 
        ref={formRef}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Select
            selected={formState.fontFamilyOption}
            onChange={(option) => setFormState({...formState, fontFamilyOption: option})}
            options={fontFamilyOptions}
            title="Шрифт"
          />
          
          <Separator />
          
          <RadioGroup
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({...formState, fontSizeOption: option})}
            options={fontSizeOptions}
            name="font-size"
            title="Размер шрифта"
          />
          
          <Separator />
          
          <Select
            selected={formState.fontColor}
            onChange={(option) => setFormState({...formState, fontColor: option})}
            options={fontColors}
            title="Цвет шрифта"
          />
          
          <Separator />
          
          <Select
            selected={formState.backgroundColor}
            onChange={(option) => setFormState({...formState, backgroundColor: option})}
            options={backgroundColors}
            title="Цвет фона"
          />
          
          <Separator />
          
          <Select
            selected={formState.contentWidth}
            onChange={(option) => setFormState({...formState, contentWidth: option})}
            options={contentWidthArr}
            title="Ширина контента"
          />
          
          <div className={styles.bottomContainer}>
            <Button 
              title="Сбросить" 
              type="clear" 
              htmlType="reset"
              onClick={handleReset}
            />
            <Button 
              title="Применить" 
              type="apply" 
              htmlType="submit"
              onClick={handleApply}
            />
          </div>
        </form>
      </aside>
    </>
  );
};