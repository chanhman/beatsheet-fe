import Link from 'next/link';
import { useBeats, useDeleteActMutation } from '../lib/hooks';
import Beat, { BeatData } from './Beat';

interface Props {
  actId: number;
}

export default function Act({ actId }: Props) {
  const { isLoading, isError, data: beats } = useBeats(actId);
  const { mutate: deleteAct } = useDeleteActMutation(actId);

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
        {beats.map((beat: BeatData) => (
          <Beat key={beat.id} beatData={beat} actId={actId} />
        ))}
      </div>
      <Link href={`/create-beat/${actId}`}>Create beat</Link>
      <button onClick={() => deleteAct()}>Delete act</button>
    </>
  );
}
