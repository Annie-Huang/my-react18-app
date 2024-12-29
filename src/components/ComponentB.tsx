import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import './ComponentB.styles.css';

let renderCount = 0;

// https://codesandbox.io/p/sandbox/react-hook-form-usefieldarray-rules-iyejbp?file=%2Fsrc%2Fstyles.css%3A1%2C1-182%2C1
// https://codesandbox.io/p/sandbox/react-hook-form-zod-with-array-of-objects-field-array-usefieldarray-8xh3ry?file=%2Fsrc%2FApp.tsx%3A29%2C6

export const ComponentB = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ firstName: 'Bill', lastName: 'Luo', percentage: '' }],
    },
    // mode: 'onChange',
    mode: 'onTouched',
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: 'test',
      rules: {
        // minLength: 4,
        maxLength: { value: 4, message: 'cannot be more than 4 items' },
        validate: (fields) => {
          if (fields.some((field) => field.percentage === '')) {
            return 'Need to fill percentage field value';
          }

          // console.log('fields=', fields);
          let total = fields.reduce(
            (accumulator, current) => accumulator + +current.percentage,
            0,
          );
          // console.log('total=', total);
          return total !== 100
            ? 'Total percentage need to add up to 100'
            : undefined; // need to use undefined for no error situation
        },
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
          // useFieldArray automatically generates a unique identifier named id which is used for key prop. For more information why this is required: https://react.dev/learn/rendering-lists
          // It got a internal id add into the array, nice!!
          // console.log('item=', item);

          // console.log(
          //   '...register(`test.${index}.percentage` as const)',
          //   ...register(`test.${index}.percentage`),
          // );

          return (
            <li key={item.id}>
              {/* when register input name, you will have to cast them as const */}
              <input
                {...register(`test.${index}.firstName` as const, {
                  required: true,
                })}
              />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />

              <div>
                <input
                  type='number'
                  {...register(`test.${index}.percentage`, {
                    required: true,
                    // maxLength: {
                    //   value: 3,
                    //   message: 'cannot be more than 3 digit',
                    // },
                    pattern: {
                      value: /^[1-9]{1,3}$/,
                      message: 'can only enter up to 3 digits and whole number',
                    },
                    max: {
                      value: 100,
                      message: 'cannot be more than 100',
                    },
                  })}
                  onBlur={(e) => {
                    console.log('I have onBlur percentage field');
                    // trigger(`test.${index}`);
                    trigger();
                  }}
                />
                {errors?.test?.[index]?.percentage && (
                  <p className='error'>
                    {errors?.test?.[index]?.percentage?.message}
                  </p>
                )}
              </div>

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
            append({
              firstName: 'appendBill',
              lastName: 'appendLuo',
              percentage: '',
            });
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
              percentage: '',
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
              percentage: '',
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
                percentage: '',
              },
              {
                firstName: 'test2',
                lastName: 'test2',
                percentage: '',
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
              test: [{ firstName: 'Bill', lastName: 'Luo', percentage: '' }],
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
