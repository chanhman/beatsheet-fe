import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useActs() {
  return useQuery({
    queryKey: ['acts'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:8080/acts');
      return data;
    },
  });
}

export function useBeats(actId: number) {
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
