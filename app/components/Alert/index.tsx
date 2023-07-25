import styles from './styles.module.css';

interface Props {
  text: string;
}

export default function Alert({ text }: Props) {
  return (
    <p className={styles.container} role="alert">
      {text}
    </p>
  );
}
