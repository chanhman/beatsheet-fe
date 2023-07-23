import Link from 'next/link';
import { useBeats, useDeleteActMutation } from '../../lib/hooks';
import Beat, { BeatData } from '../Beat';
import { Act } from '@/app/page';
import styles from './styles.module.scss';
import buttonStyles from '@/styles/button.module.scss';

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
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Act: {actName}</h2>
        <div className={styles.headerOptions}>
          <button className={buttonStyles.btnWhite} onClick={() => deleteAct()}>
            Delete act
          </button>
          <Link className={buttonStyles.btn} href={`/create-beat/${actId}`}>
            Create a beat
          </Link>
        </div>
      </div>
      {beats.length > 0 ? (
        <div className={styles.beats}>
          {beats.map((beat: BeatData) => (
            <Beat key={beat.id} beatData={beat} actId={actId} />
          ))}
        </div>
      ) : (
        <div>
          <p>This act as no beats.</p>
          <Link className={buttonStyles.btn} href={`/create-beat/${actId}`}>
            Create a beat
          </Link>
        </div>
      )}
    </section>
  );
}
