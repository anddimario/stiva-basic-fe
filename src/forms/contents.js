const post = {
  model: {
    title: '',
    contentType: 'post'
  },
  schema: {
    groups: [
      {
        legend: 'Add post',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Title',
            model: 'title',
            placeholder: 'Content title',
            featured: true,
            required: true
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'contentType',
            model: 'contentType',
            placeholder: 'Content tipe',
            featured: true,
            visible: false,
            required: true
          }
        ]
      }
    ]
  },

  formOptions: {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  },
};

export const contentsForms = {
  post
};
