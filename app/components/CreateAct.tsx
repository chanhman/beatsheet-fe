import { useForm } from 'react-hook-form';
import { useCreateActMutation } from '@/app/lib/hooks';

interface FormData {
  name: string;
}

export default function CreateAct() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: createAct } = useCreateActMutation();

  return (
    <form
      onSubmit={handleSubmit((values) =>
        createAct(values, { onSuccess: () => reset() })
      )}
    >
      <label htmlFor="name">Act name</label>
      <input type="text" {...register('name')} />
      <button>Create act</button>
    </form>
  );
}
