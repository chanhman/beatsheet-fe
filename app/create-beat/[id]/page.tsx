'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useCreateBeatMutation } from '@/app/lib/hooks';
import styles from '@/app/edit-beat/[id]/styles.module.scss';
import buttonStyles from '@/styles/button.module.scss';

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
          createBeat(values, { onSuccess: () => reset() })
        )}
      >
        <div className={styles.group}>
          <label className={styles.label} htmlFor="beatName">
            Beat name:{' '}
          </label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name?.type === 'required' && (
            <p role="alert">Beat name is required</p>
          )}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="cameraAngle">
            Camera angle:{' '}
          </label>
          <input type="text" {...register('cameraAngle', { required: true })} />
          {errors.cameraAngle?.type === 'required' && (
            <p role="alert">Camera angle is required</p>
          )}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="content">
            Content:{' '}
          </label>
          <input type="text" {...register('content', { required: true })} />
          {errors.content?.type === 'required' && (
            <p role="alert">Content is required</p>
          )}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="notes">
            Notes:{' '}
          </label>
          <input type="text" {...register('notes', { required: true })} />
          {errors.notes?.type === 'required' && (
            <p role="alert">Notes are required</p>
          )}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="time">
            Time:{' '}
          </label>
          <input type="text" {...register('time', { required: true })} />
          {errors.time?.type === 'required' && (
            <p role="alert">Time range is required</p>
          )}
        </div>
        <div className={styles.footer}>
          <button className={buttonStyles.btn} disabled={isLoading}>
            {isLoading ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
