import { useForm } from 'react-hook-form';
import { useCreateActMutation } from '@/app/lib/hooks';
import styles from './styles.module.scss';
import buttonStyles from '@/styles/button.module.scss';

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
    <section className={styles.container}>
      <h2 className={styles.heading}>Create a new act</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit((values) =>
          createAct(values, { onSuccess: () => reset() })
        )}
      >
        <label htmlFor="name">Act name</label>
        <input type="text" {...register('name', { required: true })} />
        {errors.name?.type === 'required' && (
          <p role="alert">Act name is required</p>
        )}
        <button className={buttonStyles.btn}>Create act</button>
      </form>
    </section>
  );
}
