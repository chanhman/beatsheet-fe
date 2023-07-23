import { useForm } from 'react-hook-form';
import { useCreateActMutation } from '@/app/lib/hooks';

interface FormData {
  name: string;
}

export default function CreateAct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate: createAct } = useCreateActMutation();

  return (
    <form
      onSubmit={handleSubmit((values) =>
        createAct(values, { onSuccess: () => reset() })
      )}
    >
      <label htmlFor="name">Act name</label>
      <input type="text" {...register('name', { required: true })} />
      {errors.name?.type === 'required' && (
        <p role="alert">Act name is required</p>
      )}
      <button>Create act</button>
    </form>
  );
}
