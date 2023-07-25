import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useBeats, useDeleteActMutation } from '@/app/lib/hooks';
import { Act } from '@/app/page';
import buttonStyles from '@/styles/button.module.scss';
import Beat, { BeatData } from '@/app/components/Beat';
import styles from './styles.module.scss';

const beatsVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

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
          <button
            className={buttonStyles.btnWhite}
            onClick={() => {
              if (window.confirm('Are you sure you delete this act?')) {
                deleteAct();
                toast.error('Act deleted');
              }
            }}
          >
            Delete act
          </button>
          <Link className={buttonStyles.btn} href={`/create-beat/${actId}`}>
            Create a beat
          </Link>
        </div>
      </div>
      {beats.length > 0 ? (
        <motion.div
          variants={beatsVariants}
          initial="hidden"
          animate="show"
          className={styles.beats}
        >
          {beats.map((beat: BeatData) => (
            <Beat key={beat.id} beatData={beat} actId={actId} />
          ))}
        </motion.div>
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
