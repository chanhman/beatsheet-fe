'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useBeat, useUpdateBeatMutation } from '@/app/lib/hooks';

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
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    // @ts-ignore
    // Ref: https://github.com/orgs/react-hook-form/discussions/8020
    <form onSubmit={handleSubmit(updateBeat)}>
      <div>
        <label htmlFor="beatName">Beat name: </label>
        <input
          type="text"
          {...register('name', { required: true })}
          defaultValue={beat.name}
        />
        {errors.name?.type === 'required' && (
          <p role="alert">Beat name is required</p>
        )}
      </div>
      <div>
        <label htmlFor="cameraAngle">Camera angle: </label>
        <input
          type="text"
          {...register('cameraAngle', { required: true })}
          defaultValue={beat.cameraAngle}
        />
        {errors.cameraAngle?.type === 'required' && (
          <p role="alert">Camera angle is required</p>
        )}
      </div>
      <div>
        <label htmlFor="content">Content: </label>
        <input
          type="text"
          {...register('content', { required: true })}
          defaultValue={beat.content}
        />
        {errors.content?.type === 'required' && (
          <p role="alert">Content is required</p>
        )}
      </div>
      <div>
        <label htmlFor="notes">Notes: </label>
        <input
          type="text"
          {...register('notes', { required: true })}
          defaultValue={beat.notes}
        />
        {errors.notes?.type === 'required' && (
          <p role="alert">Notes are required</p>
        )}
      </div>
      <div>
        <label htmlFor="time">Time: </label>
        <input
          type="text"
          {...register('time', { required: true })}
          defaultValue={beat.time}
        />
        {errors.time?.type === 'required' && (
          <p role="alert">Time range is required</p>
        )}
      </div>
      <button disabled={updateBeatIsLoading}>
        {updateBeatIsLoading ? 'Saving' : 'Save'}
      </button>
      <Link href="/">Back</Link>
    </form>
  );
}
