import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input,Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';

const ContactForm = () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  const { control, watch, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    signUp(data);
  };
  if (loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gInputC">
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
      <div className="gInputC">
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
            placeholder="Project name"
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
            placeholder="Subject"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>
      </div>
 
        <FormControl
          htmlFor="message"
          error={
            errors.message && (
              <>
                {errors.message?.type === 'required' && (
                  <span>This field is required!</span>
                )}
              </>
            )
          }
        >
          <Controller
            as={<Input.TextArea />}
            id="message"
            name="message"
            placeholder="Your message"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
          />
        </FormControl>

      <Button
        className="sending-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
      Send
      </Button>
    </form>
  );
};

export default ContactForm;
