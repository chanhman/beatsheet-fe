import Link from 'next/link';
import { useBeats, useDeleteActMutation } from '../../lib/hooks';
import Beat, { BeatData } from '../Beat';
import { Act } from '@/app/page';
import styles from './styles.module.scss';

interface Props {
  actData: Act;
}

export default function Act({ actData }: Props) {
  const { id: actId, name: actName } = actData;
  const { isLoading, isError, data: beats } = useBeats(actId);
  const { mutate: deleteAct } = useDeleteActMutation(actId);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className={styles.container}>
      <div>Act: {actName}</div>
      <div>
        {beats.map((beat: BeatData) => (
          <Beat key={beat.id} beatData={beat} actId={actId} />
        ))}
      </div>
      <Link href={`/create-beat/${actId}`}>Create beat</Link>
      <button onClick={() => deleteAct()}>Delete act</button>
    </div>
  );
}
