import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface BeatData {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

interface Props {
  actId: number;
  beatData: BeatData;
}

export default function Beat({ actId, beatData }: Props) {
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
        <Link href={`/beats/${beatData.id}`}>Edit beat</Link>
        <button onClick={() => deleteBeat.mutate()}>Delete beat</button>
      </div>
    </>
  );
}
