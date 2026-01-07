import { Controller } from 'react-hook-form';

import Input from './Input';

const FormInput = ({ control, name, rules, defaultValue = '', ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          {...props}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormInput;
