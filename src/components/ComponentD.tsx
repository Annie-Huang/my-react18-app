import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import './ComponentD.styles.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  people: z.object({ name: z.string() }).array().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export const ComponentD = () => {
  const { register, handleSubmit, formState, control, trigger } =
    useForm<FormValues>({
      resolver: zodResolver(formSchema),
      mode: 'onChange',
      reValidateMode: 'onChange',
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'people',
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div style={{ display: 'flex' }}>
              <input {...register(`people.${index}.name` as const)} />
              <button type='button' onClick={() => remove(index)}>
                Remove
              </button>
            </div>
            <p>{formState.errors.people?.[index]?.name?.message}</p>
          </div>
        ))}
        <p>{formState.errors.people?.message}</p>
        <button
          type='button'
          onClick={() => {
            append({ name: '' });
            trigger('people');
          }}
        >
          Add
        </button>
        <input type='submit' />
      </form>
    </div>
  );
};
