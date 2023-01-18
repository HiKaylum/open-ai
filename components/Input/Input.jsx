import styles from './Input.module.scss';

export default function Input(props) {
  const {
    ...componentProps
  } = props;

  return (
    <input className={styles.input} {...componentProps} />
  );
}
