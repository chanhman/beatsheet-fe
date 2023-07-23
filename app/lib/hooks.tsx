import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BeatData } from '../components/Beat';

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

export function useBeat(beatId: string) {
  return useQuery({
    queryKey: ['beat', beatId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/beats/${beatId}`);
      return data;
    },
  });
}
export function useCreateActMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAct: { name: string }) => {
      return axios.post('http://localhost:8080/acts', newAct);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
}

export function useDeleteBeatMutation(actId: number, beatId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(
        `http://localhost:8080/acts/${actId}/beats/${beatId}`
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['beats', actId] }),
  });
}

export function useDeleteActMutation(actId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:8080/acts/${actId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
}

export function useCreateBeatMutation(paramsId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (beat: BeatData) => {
      return axios.post(`http://localhost:8080/acts/${paramsId}/beats`, beat);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['beats', paramsId] }),
  });
}

export function useUpdateBeatMutation(paramsId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return axios.put(`http://localhost:8080/acts/beats/${paramsId}`, data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
}
