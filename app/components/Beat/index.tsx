import Link from 'next/link';
import { useDeleteBeatMutation } from '@/app/lib/hooks';
import styles from './styles.module.scss';

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
      <div className={styles.time}>{beatData.time}</div>
      <h3>{beatData.name}</h3>
      <p>{beatData.content}</p>
      <div className={styles.footer}>
        <Link href={`/edit-beat/${beatData.id}`}>Edit beat</Link>
        <button onClick={() => deleteBeat()}>Delete beat</button>
      </div>
    </div>
  );
}
