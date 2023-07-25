import styles from './styles.module.scss';

interface Props {
  title: string;
}

export default function index({ title }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
