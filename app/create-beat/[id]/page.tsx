'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateBeatMutation } from '@/app/lib/hooks';
import Alert from '@/app/components/Alert';
import buttonStyles from '@/styles/button.module.scss';
import styles from '@/app/edit-beat/[id]/styles.module.scss';
import { MotionWrapper } from '@/app/components/MotionWrapper';

interface FormData {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

export default function CreateBeat({ params }: { params: { id: string } }) {
  const { mutate: createBeat, isLoading } = useCreateBeatMutation(params.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <MotionWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Create beat</h1>
          <Link className={buttonStyles.btnWhite} href="/">
            Back
          </Link>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit((values) =>
            createBeat(values, {
              onSuccess: () => {
                toast(`The beat "${values.name}" was created`);
                reset();
              },
            })
          )}
        >
          <div className={styles.group}>
            <label className={styles.label} htmlFor="beatName">
              Beat name:
            </label>
            <input
              className={styles.input}
              type="text"
              {...register('name', { required: true })}
            />
            {errors.name?.type === 'required' && (
              <Alert text="Beat name is required" />
            )}
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="cameraAngle">
              Camera angle:
            </label>
            <p className={styles.helper}>Ex. Close up shot</p>
            <input
              className={styles.input}
              type="text"
              {...register('cameraAngle', { required: true })}
            />
            {errors.cameraAngle?.type === 'required' && (
              <Alert text="Camera angle is required" />
            )}
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="content">
              Content:
            </label>
            <textarea
              className={styles.input}
              rows={6}
              {...register('content', { required: true })}
            />
            {errors.content?.type === 'required' && (
              <Alert text="Content is required" />
            )}
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="notes">
              Notes:
            </label>
            <textarea
              className={styles.input}
              rows={6}
              {...register('notes', { required: true })}
            />
            {errors.notes?.type === 'required' && (
              <Alert text="Notes are required" />
            )}
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="time">
              Time:
            </label>
            <p className={styles.helper}>Ex. 3:30-4:00</p>
            <input
              className={styles.input}
              type="text"
              {...register('time', { required: true })}
            />
            {errors.time?.type === 'required' && (
              <Alert text="Time range is required" />
            )}
          </div>
          <div className={styles.footer}>
            <button className={buttonStyles.btn} disabled={isLoading}>
              {isLoading ? 'Creating' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </MotionWrapper>
  );
}
