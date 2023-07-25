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
        onSubmit={handleSubmit((values) =>
          createAct(values, { onSuccess: () => reset() })
        )}
      >
        <div className={styles.formInner}>
          <label className={styles.label} htmlFor="name">
            Act name
          </label>
          <input
            className={styles.input}
            type="text"
            {...register('name', { required: true })}
          />
          <button className={buttonStyles.btn}>Create act</button>
        </div>
        {errors.name?.type === 'required' && (
          <p className={styles.alert} role="alert">
            Act name is required
          </p>
        )}
      </form>
    </section>
  );
}
