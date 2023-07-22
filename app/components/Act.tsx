import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useActs, useBeats } from '../lib/hooks';
import Beat from './Beat';

export default function Act({ actId }: { actId: number }) {
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
