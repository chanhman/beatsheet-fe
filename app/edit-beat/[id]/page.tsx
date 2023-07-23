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
  const { register, handleSubmit } = useForm<FormData>();
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
        <input type="text" {...register('name')} defaultValue={beat.name} />
      </div>
      <div>
        <label htmlFor="cameraAngle">cameraAngle: </label>
        <input
          type="text"
          {...register('cameraAngle')}
          defaultValue={beat.cameraAngle}
        />
      </div>
      <div>
        <label htmlFor="content">content: </label>
        <input
          type="text"
          {...register('content')}
          defaultValue={beat.content}
        />
      </div>
      <div>
        <label htmlFor="notes">notes: </label>
        <input type="text" {...register('notes')} defaultValue={beat.notes} />
      </div>
      <div>
        <label htmlFor="time">time: </label>
        <input type="text" {...register('time')} defaultValue={beat.time} />
      </div>
      <button disabled={updateBeatIsLoading}>
        {updateBeatIsLoading ? 'Saving' : 'Save'}
      </button>
      <Link href="/">Back</Link>
    </form>
  );
}
