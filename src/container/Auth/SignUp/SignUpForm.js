import React, { useContext } from 'react';
import { Redirect  } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';

const SignUpForm = () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  const { control, watch, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const onSubmit = (data) => {
    signUp(data);
  };
  if (loggedIn) {
    return <Redirect  to={{ pathname: '/' }} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gInput">
        <FormControl
          htmlFor="fn"
          error={
            errors.fn && (
              <>
                {errors.fn?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input />}
            id="fn"
            name="fn"
            placeholder="First name"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
        <FormControl
          htmlFor="ln"
          error={
            errors.ln && (
              <>
                {errors.ln?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input />}
            id="ln"
            name="ln"
            placeholder="Last name"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
      </div>
      <FormControl
        htmlFor="address"
        error={
          errors.address && (
            <>
              {errors.address?.type === 'required' && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          id="address"
          name="address"
          placeholder="Project address"
          defaultValue=""
          control={control}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <div className="gInput">
        <FormControl
          htmlFor="Card"
          error={
            errors.Card && (
              <>
                {errors.Card?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input />}
            id="Card"
            name="Card"
            placeholder="ID Card"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
        <FormControl
          htmlFor="Category"
          error={
            errors.Category && (
              <>
                {errors.Category?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input />}
            id="Category"
            name="Category"
            placeholder="Category"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
      </div>
      <FormControl
        htmlFor="email"
        error={
          errors.email && (
            <>
              {errors.email?.type === 'required' && (
                <span>This field is required!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span>Please enter a valid email address!</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          type="email"
          id="email"
          placeholder="Email address"
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          }}
        />
      </FormControl>
      <FormControl
          htmlFor="Phone"
          error={
            errors.Phone && (
              <>
                {errors.Phone?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input />}
            id="Phone"
            name="Phone"
            placeholder="Phone number"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
        <FormControl
          htmlFor="Description"
          error={
            errors.Description && (
              <>
                {errors.Description?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input.TextArea />}
            id="Description"
            name="Description"
            placeholder="Description"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>

      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
      SUBMIT
      </Button>
    </form>
  );
};

export default SignUpForm;
