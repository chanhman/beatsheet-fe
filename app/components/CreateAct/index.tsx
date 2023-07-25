import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateActMutation } from '@/app/lib/hooks';
import Alert from '@/app/components/Alert';
import buttonStyles from '@/styles/button.module.scss';
import styles from './styles.module.scss';

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
          createAct(values, {
            onSuccess: () => {
              reset();
              toast('Act created');
            },
          })
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
          <Alert text="Act name is required" />
        )}
      </form>
    </section>
  );
}
