import Link from 'next/link';
import { useDeleteBeatMutation } from '@/app/lib/hooks';
import styles from './styles.module.scss';
import buttonStyles from '@/styles/button.module.scss';

export interface BeatData {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

interface Props {
  actId: number;
  beatData: BeatData;
}

export default function Beat({ actId, beatData }: Props) {
  const { mutate: deleteBeat } = useDeleteBeatMutation(actId, beatData.id);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.time}>{beatData.time}</div>
      </div>
      <h3 className={styles.name}>{beatData.name}</h3>
      <p className={styles.content}>{beatData.content}</p>
      <div className={styles.footer}>
        <Link
          className={buttonStyles.btnMini}
          href={`/edit-beat/${beatData.id}`}
        >
          Edit beat
        </Link>
        <button
          className={buttonStyles.btnWhiteMini}
          onClick={() => {
            if (window.confirm('Are you sure you delete this beat?')) {
              deleteBeat();
            }
          }}
        >
          Delete beat
        </button>
      </div>
    </div>
  );
}
