'use client';

import { useActs } from './lib/hooks';
import Act from './components/Act';
import CreateAct from './components/CreateAct';

interface Act {
  id: number;
  name: string;
}

export default function Home() {
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
      <CreateAct />
    </main>
  );
}
