import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { useDeleteBeatMutation } from '@/app/lib/hooks';
import buttonStyles from '@/styles/button.module.scss';

import styles from './styles.module.scss';

const beatVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

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
    <motion.div variants={beatVariants} className={styles.container}>
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
            if (
              window.confirm(
                `Are you sure you want to delete ${beatData.name}?`
              )
            ) {
              deleteBeat();
              toast.error(`${beatData.name} was deleted`);
            }
          }}
        >
          Delete beat
        </button>
      </div>
    </motion.div>
  );
}
