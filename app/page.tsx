'use client';

import { useActs } from './lib/hooks';
import Act from './components/Act';
import CreateAct from './components/CreateAct';
import styles from './styles.module.scss';

export interface Act {
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
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Your beat sheet</h1>
      </header>
      <main>
        {acts.map((act: Act) => (
          <Act key={act.id} actData={act} />
        ))}
        <CreateAct />
      </main>
    </>
  );
}
