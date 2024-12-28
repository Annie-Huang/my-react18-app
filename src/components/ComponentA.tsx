import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import './ComponentA.styles.css';

let renderCount = 0;

// https://codesandbox.io/p/sandbox/react-hook-form-usefieldarray-rules-iyejbp?file=%2Fsrc%2Fstyles.css%3A1%2C1-182%2C1
export const ComponentA = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ firstName: 'Bill', lastName: 'Luo' }],
    },
    mode: 'onChange',
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: 'test',
      rules: {
        // minLength: 4,
        maxLength: { value: 4, message: 'cannot be more than 4 items' },
      },
    });

  console.log('errors', errors);

  const onSubmit = (data: any) => console.log('data', data);

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className='counter'>Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`test.${index}.firstName`, { required: true })}
              />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type='button' onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type='button'
          onClick={() => {
            append({ firstName: 'appendBill', lastName: 'appendLuo' });
          }}
        >
          append
        </button>
        <button
          type='button'
          onClick={() =>
            prepend({
              firstName: 'prependFirstName',
              lastName: 'prependLastName',
            })
          }
        >
          prepend
        </button>
        <button
          type='button'
          onClick={() =>
            insert(parseInt('2', 10), {
              firstName: 'insertFirstName',
              lastName: 'insertLastName',
            })
          }
        >
          insert at
        </button>

        <button type='button' onClick={() => swap(1, 2)}>
          swap
        </button>

        <button type='button' onClick={() => move(1, 2)}>
          move
        </button>

        <button
          type='button'
          onClick={() =>
            replace([
              {
                firstName: 'test1',
                lastName: 'test1',
              },
              {
                firstName: 'test2',
                lastName: 'test2',
              },
            ])
          }
        >
          replace
        </button>

        <button type='button' onClick={() => remove(1)}>
          remove at
        </button>

        <button
          type='button'
          onClick={() =>
            reset({
              test: [{ firstName: 'Bill', lastName: 'Luo' }],
            })
          }
        >
          reset
        </button>
      </section>

      {errors.test && <p className='error'>{errors.test.root?.message}</p>}

      <input type='submit' />
    </form>
  );
};
