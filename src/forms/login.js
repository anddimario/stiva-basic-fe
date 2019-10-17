import VueFormGenerator from 'vue-form-generator';

export const LoginForm = {
  model: {},
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'email',
        label: 'E-mail',
        inputName: 'email',
        model: 'email',
        placeholder: 'User\'s e-mail address',
        required: true,
        validator: VueFormGenerator.validators.email
      },
      {
        type: 'input',
        inputType: 'password',
        label: 'Password',
        model: 'password',
        inputName: 'password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters',
        validator: VueFormGenerator.validators.string
      },
    ]

  },
  formOptions: {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  }
};