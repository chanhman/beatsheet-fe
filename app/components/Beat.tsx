import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function Beat({
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
