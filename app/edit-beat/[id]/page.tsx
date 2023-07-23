'use client';

import Link from 'next/link';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useBeat } from '@/app/lib/hooks';

interface FormData {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

export default function Beat({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<FormData>();
  const { isLoading, isError, data: beat } = useBeat(params.id);

  const updateBeat = useMutation({
    mutationFn: (data) => {
      return axios.put(`http://localhost:8080/acts/beats/${params.id}`, data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    // @ts-ignore
    // Ref: https://github.com/orgs/react-hook-form/discussions/8020
    <form onSubmit={handleSubmit(updateBeat.mutate)}>
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
      <button disabled={updateBeat.isLoading}>
        {updateBeat.isLoading ? 'Saving' : 'Save'}
      </button>
      <Link href="/">Back</Link>
    </form>
  );
}
