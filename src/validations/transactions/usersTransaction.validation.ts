import * as yup from "yup";

const userTransactionsSchema = {
  schema: {
    body: {
      yupSchema: yup
        .object()
        .shape({
          username: yup.string().required("username is required"),
          cashOut: yup.number().positive().required("number is required"),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

export default userTransactionsSchema;
