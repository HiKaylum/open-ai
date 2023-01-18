import clsx from 'clsx';
import styles from './Button.module.scss';

export default function Button(props) {
  const { 
    children,
    secondary,
    ...componentProps
  } = props;

  const buttonClasses = clsx(styles.button, { [styles.secondary]: secondary });

  return (
    <a className={buttonClasses} {...componentProps}>{children}</a>
  );
}
