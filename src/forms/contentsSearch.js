export const searchForm = {
  posts: {
    model: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Title',
          model: 'title',
          placeholder: 'Title',
          required: true
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
