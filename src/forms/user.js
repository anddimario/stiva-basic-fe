import VueFormGenerator from 'vue-form-generator';

export const userForms = {
  add: {
    model: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'email',
          label: 'E-mail',
          model: 'email',
          placeholder: 'User\'s e-mail address',
          required: true,
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Password',
          model: 'password',
          min: 6,
          required: true,
          hint: 'Minimum 6 characters',
          validator: VueFormGenerator.validators.string
        },
        {
          type: 'select',
          label: 'Role',
          model: 'userRole',
          values: [
            'user',
            'admin'
          ]
        }
      ]
    },
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
      validateAsync: true
    }
  },
  updateUser: {
    model: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'email',
          label: 'E-mail',
          model: 'email',
          placeholder: 'User\'s e-mail address',
          required: true
        },
        {
          type: 'input',
          inputType: 'text',
          label: 'Name',
          model: 'fullname',
          placeholder: 'Your name',
        },
        {
          type: 'select',
          label: 'Role',
          model: 'userRole',
          values: [
            'user',
            'admin'
          ]
        }

      ]
    },
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
      validateAsync: true
    }
  },
  updatePassword: {
    model: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'email',
          label: 'E-mail',
          model: 'email',
          placeholder: 'User\'s e-mail address',
          required: true
        },
        {
          type: 'input',
          inputType: 'newpassword',
          label: 'Password',
          model: 'password',
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
  }
};