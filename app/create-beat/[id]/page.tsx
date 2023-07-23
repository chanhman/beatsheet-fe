'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useCreateBeatMutation } from '@/app/lib/hooks';

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
  const { register, handleSubmit, reset } = useForm<FormData>();

  return (
    // @ts-ignore
    // Ref: https://github.com/orgs/react-hook-form/discussions/8020
    <form
      onSubmit={handleSubmit((values) =>
        createBeat(values, { onSuccess: () => reset() })
      )}
    >
      <div>
        <label htmlFor="beatName">Beat name: </label>
        <input type="text" {...register('name')} />
      </div>
      <div>
        <label htmlFor="cameraAngle">cameraAngle: </label>
        <input type="text" {...register('cameraAngle')} />
      </div>
      <div>
        <label htmlFor="content">content: </label>
        <input type="text" {...register('content')} />
      </div>
      <div>
        <label htmlFor="notes">notes: </label>
        <input type="text" {...register('notes')} />
      </div>
      <div>
        <label htmlFor="time">time: </label>
        <input type="text" {...register('time')} />
      </div>
      <button disabled={isLoading}>{isLoading ? 'Creating' : 'Create'}</button>
      <Link href="/">Back</Link>
    </form>
  );
}
