'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function useActs() {
  return useQuery({
    queryKey: ['acts'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:8080/acts');
      return data;
    },
  });
}

function useBeats(actId: number) {
  return useQuery({
    queryKey: ['beats', actId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/acts/${actId}/beats`
      );
      return data;
    },
  });
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
      {acts.map((act: { id: number; name: string }) => (
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

function Act({ actId }: { actId: number }) {
  const queryClient = useQueryClient();
  const deleteAct = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:8080/acts/${actId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
  const addBeat = useMutation({
    mutationFn: (beat: any) => {
      return axios.post(`http://localhost:8080/acts/${actId}/beats`, beat);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['beats', actId] }),
  });
  const { isLoading, isError, data: beats } = useBeats(actId);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <>
      <div>Act: {actId}</div>
      <div>
        {beats.map(
          (beat: {
            id: number;
            name: string;
            time: string;
            content: string;
            cameraAngle: string;
            notes: string;
          }) => (
            <Beat key={beat.id} beatData={beat} actId={actId} />
          )
        )}
      </div>
      <button
        onClick={() =>
          addBeat.mutate({
            name: 'test',
            time: 'string',
            content: 'string',
            cameraAngle: 'string',
            notes: 'string',
          })
        }
      >
        Create beat
      </button>
      <button onClick={() => deleteAct.mutate()}>Delete act</button>
    </>
  );
}

function Beat({
  actId,
  beatData,
}: {
  actId: number;
  beatData: {
    id: number;
    name: string;
    time: string;
    content: string;
    cameraAngle: string;
    notes: string;
  };
}) {
  const queryClient = useQueryClient();
  const deleteBeat = useMutation({
    mutationFn: () => {
      return axios.delete(
        `http://localhost:8080/acts/${actId}/beats/${beatData.id}`
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['beats', actId] }),
  });
  return (
    <>
      <div>
        {beatData.name} / {beatData.id}
      </div>
      <div>
        <button onClick={() => deleteBeat.mutate()}>Delete beat</button>
      </div>
    </>
  );
}
