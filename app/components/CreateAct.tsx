import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

export default function CreateAct() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const createAct = useMutation({
    mutationFn: (newAct: { name: string }) => {
      return axios.post('http://localhost:8080/acts', newAct);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['acts'] }),
  });
  return (
    <form
      onSubmit={handleSubmit((values) =>
        createAct.mutate(values, { onSuccess: () => reset() })
      )}
    >
      <label htmlFor="name">Act name</label>
      <input type="text" {...register('name')} />
      <button>Create act</button>
    </form>
  );
}
