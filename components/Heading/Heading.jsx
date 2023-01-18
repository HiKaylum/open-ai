import Link from 'next/link'

import styles from './Heading.module.scss';

export default function Heading(props) {
  const {
    subTitle,
    children,
    asLink,
    href,
    internal,
    ...componentProps
  } = props;

  return (
    <div className={styles.title}  {...componentProps}>
      { children }
      { 
        (subTitle && !asLink) && (
          <p>{ subTitle }</p>
        ) 
      }
      {
        (subTitle && asLink && !internal) && (
          <a href={href}>{ subTitle }</a>
        )
      }
      {
        (subTitle && asLink && internal) && (
          <Link href={href}>{ subTitle }</Link>
        )
      }
    </div>
  );
}
