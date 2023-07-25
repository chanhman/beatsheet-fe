// @ts-nocheck
// Ref: https://github.com/orgs/react-hook-form/discussions/8020

'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import buttonStyles from '@/styles/button.module.scss';
import formStyles from '@/styles/form.module.scss';
import { useBeat, useUpdateBeatMutation } from '@/app/lib/hooks';
import Alert from '@/app/components/Alert';
import { MotionWrapper } from '@/app/components/MotionWrapper';
import Status from '@/app/components/Status';

import styles from './styles.module.scss';

interface FormData {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

export default function Beat({ params }: { params: { id: string } }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { isLoading, isError, data: beat } = useBeat(params.id);
  const { mutate: updateBeat, isLoading: updateBeatIsLoading } =
    useUpdateBeatMutation(params.id);

  if (isLoading) {
    return <Status title="Loading..." />;
  }

  if (isError) {
    return <Status title="Error" />;
  }

  return (
    <MotionWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Edit beat</h1>
          <Link className={buttonStyles.btnWhite} href="/">
            Back
          </Link>
        </div>
        <form
          className={formStyles.form}
          onSubmit={handleSubmit((values) => {
            updateBeat(values, {
              onSuccess: () => {
                toast('Changes saved');
              },
            });
          })}
        >
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="beatName">
              Beat name:
            </label>
            <input
              className={formStyles.input}
              type="text"
              {...register('name', { required: true })}
              defaultValue={beat.name}
            />
            {errors.name?.type === 'required' && (
              <Alert text="Beat name is required" />
            )}
          </div>
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="cameraAngle">
              Camera angle:
            </label>
            <p className={formStyles.helper}>Ex. Close up shot</p>
            <input
              className={formStyles.input}
              type="text"
              {...register('cameraAngle', { required: true })}
              defaultValue={beat.cameraAngle}
            />
            {errors.cameraAngle?.type === 'required' && (
              <Alert text="Camera angle is required" />
            )}
          </div>
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="content">
              Content:
            </label>
            <textarea
              className={formStyles.input}
              rows={6}
              {...register('content', { required: true })}
              defaultValue={beat.content}
            />
            {errors.content?.type === 'required' && (
              <Alert text="Content is required" />
            )}
          </div>
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="notes">
              Notes:
            </label>
            <textarea
              className={formStyles.input}
              rows={6}
              {...register('notes', { required: true })}
              defaultValue={beat.notes}
            />
            {errors.notes?.type === 'required' && (
              <Alert text="Notes are required" />
            )}
          </div>
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="time">
              Time:
            </label>
            <p className={formStyles.helper}>Ex. 3:30-4:00</p>
            <input
              className={formStyles.input}
              type="text"
              {...register('time', { required: true })}
              defaultValue={beat.time}
            />
            {errors.time?.type === 'required' && (
              <Alert text="Time range is required" />
            )}
          </div>
          <div className={styles.footer}>
            <button className={buttonStyles.btn} disabled={updateBeatIsLoading}>
              {updateBeatIsLoading ? 'Saving' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </MotionWrapper>
  );
}
