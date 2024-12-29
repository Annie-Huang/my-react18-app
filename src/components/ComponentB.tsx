import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import './ComponentB.styles.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

let renderCount = 0;

// https://codesandbox.io/p/sandbox/react-hook-form-usefieldarray-rules-iyejbp?file=%2Fsrc%2Fstyles.css%3A1%2C1-182%2C1
// https://codesandbox.io/p/sandbox/react-hook-form-zod-with-array-of-objects-field-array-usefieldarray-8xh3ry?file=%2Fsrc%2FApp.tsx%3A29%2C6

// https://github.com/react-hook-form/resolvers/issues/566
// https://codesandbox.io/p/sandbox/react-hook-form-array-length-error-zod-forked-zjx7g7?file=%2Fsrc%2FApp.tsx%3A17%2C39

const validateTotalPercentage = (fields: any) => {
  // console.log('fields=', fields);
  let total = fields.reduce(
    (accumulator: number, current: any) => accumulator + +current.percentage,
    0,
  );
  return total === 100;
};

const PERCENTAGE_PATTERN1 = new RegExp(/^[1-9]{1,2,3}$/);
const PERCENTAGE_PATTERN = new RegExp(/^[^\.]+$/);

const formSchema = z.object({
  // test: z.object({ name: z.string() }).array().min(1),
  test: z
    .object({
      firstName: z.string().min(1, 'firstName field is required'),
      lastName: z.string().min(1, 'lastName field is required'),
      percentage: z
        .string()
        .min(1, { message: 'Percentage is required' })
        .regex(PERCENTAGE_PATTERN, {
          message: 'Percentage can only be up to 3 digits whole number',
        })
        .refine((text: string) => +text <= 100, {
          message: 'Each Percentage cannot be more than 100',
        }),
      // .coerce.number(),
    })
    .array()
    .refine(
      (fields: any) => !fields.some((field: any) => field.percentage === ''),
      {
        message: 'Need to fill percentage field value for EACH Beneficiary',
      },
    )
    .refine((fields: any) => validateTotalPercentage(fields), {
      message: 'Total percentage need to add up to 100',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export const ComponentB = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      test: [{ firstName: 'Bill', lastName: 'Luo', percentage: '' }],
    },
    resolver: zodResolver(formSchema),
    // mode: 'onChange',
    mode: 'onTouched',
    // reValidateMode: "onChange"
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: 'test',
      // rules: {
      //   // minLength: 4,
      //   maxLength: { value: 4, message: 'cannot be more than 4 items' },
      //   validate: (fields) => {
      //     if (fields.some((field) => field.percentage === '')) {
      //       return 'Need to fill percentage field value';
      //     }
      //
      //     // console.log('fields=', fields);
      //     let total = fields.reduce(
      //       (accumulator, current) => accumulator + +current.percentage,
      //       0,
      //     );
      //     // console.log('total=', total);
      //     return total !== 100
      //       ? 'Total percentage need to add up to 100'
      //       : undefined; // need to use undefined for no error situation
      //   },
      // },
    });

  console.log('errors', errors);
  console.log('isValid', isValid);
  console.log('------------------------------');

  const onSubmit = (data: any) => console.log('data', data);

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='CompBForm'>
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
              {/*
              <input
                {...register(`test.${index}.firstName` as const, {
                  required: true,
                })}
              />
               */}

              <div>
                {/* when register input name, you will have to cast them as const */}
                <input {...register(`test.${index}.firstName` as const)} />
                {errors?.test?.[index]?.firstName && (
                  <p className='error'>
                    {errors?.test?.[index]?.firstName?.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  render={({ field }) => <input {...field} />}
                  name={`test.${index}.lastName`}
                  control={control}
                />
                {errors?.test?.[index]?.lastName && (
                  <p className='error'>
                    {errors?.test?.[index]?.lastName?.message}
                  </p>
                )}
              </div>

              {/*
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
                */}
              <div>
                <input
                  type='number'
                  {...register(`test.${index}.percentage` as const)}
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

      {errors.test && (
        <p className='error'>
          {errors.test.message || errors.test.root?.message}
        </p>
      )}

      <hr />

      {errors.test && <p className='error'>message: {errors.test.message}</p>}
      {errors.test && (
        <p className='error'>root?.message: {errors.test?.root?.message}</p>
      )}

      {/*<input type='submit' />*/}
      <button
        type='submit'
        disabled={!isValid || !!errors.test}
        // disabled={!!errors.test}
        // disabled={!isValid}
        style={{ width: '100%' }}
      >
        SUBMIT
      </button>
    </form>
  );
};
