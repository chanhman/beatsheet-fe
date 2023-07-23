'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useActs } from './lib/hooks';
import Act from './components/Act';

interface Act {
  id: number;
  name: string;
}

export default function Home() {
  const queryClient = useQueryClient();
  const addAct = useMutation({
    mutationFn: (newAct: { name: string }) => {
      return axios.post('http://localhost:8080/acts', newAct);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
  const { isLoading, isError, data: acts } = useActs();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <main>
      {acts.map((act: Act) => (
        <>
          <Act key={act.id} actId={act.id} />
          <hr />
        </>
      ))}
      <div>
        <button onClick={() => addAct.mutate({ name: 'test2' })}>
          Add Act
        </button>
      </div>
    </main>
  );
}
