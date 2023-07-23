import Link from 'next/link';
import { useDeleteBeatMutation } from '../lib/hooks';

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
  const { mutate: deleteBeat } = useDeleteBeatMutation(actId, beatData.id);

  return (
    <>
      <div>{beatData.name}</div>
      <div>
        <Link href={`/edit-beat/${beatData.id}`}>Edit beat</Link>
        <button onClick={() => deleteBeat()}>Delete beat</button>
      </div>
    </>
  );
}
