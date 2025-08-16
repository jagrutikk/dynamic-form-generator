const formConfig = [
  {
    name: "username",
    label: "Username",
    type: "text",
    validation: { required: true, minLength: 3 }
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: { required: true }
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    validation: { required: true, min: 18 }
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    validation: { required: true }
  },
  {
    name: "terms",
    label: "Accept Terms",
    type: "checkbox",
    validation: { required: true }
  }
];

export default formConfig;
