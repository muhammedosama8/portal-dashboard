export const Rules = [
  { label: "Admin", value: "admin" },
  { label: "Rules", value: "rules" },
  { label: "Assets", value: "assets" },
  { label: "Employees", value: "employees" },
  { label: "Projects", value: "projects" },
  // { label: "Salary", value: "salary" },
];

export const customRules= [
  {
    label: "admin",
    rules:[
      {label: "Add", value: 'add_admin'},
      {label: "Edit", value: 'edit_admin'},
      {label: "Delete", value: 'delete_admin'},
      {label: "View", value: 'view_admin'},
    ]
  },
  {
    label: "rules",
    rules:[
      // {label: "Add", value: 'add_rules'},
      {label: "Edit", value: 'edit_rules'},
      // {label: "Delete", value: 'delete_rules'},
      {label: "View", value: 'view_rules'},
    ]
  },
  {
    label: "custody",
    rules:[
      {label: "Add", value: 'add_custody'},
      {label: "Edit", value: 'edit_custody'},
      {label: "Delete", value: 'delete_custody'},
      {label: "View", value: 'view_custody'},
    ]
  },
  {
    label: "employees",
    rules:[
      {label: "Add", value: 'add_employees'},
      {label: "Edit", value: 'edit_employees'},
      {label: "Delete", value: 'delete_employees'},
      {label: "View", value: 'view_employees'},
    ]
  },
  {
    label: "departments",
    rules:[
      {label: "Add", value: 'add_departments'},
      {label: "Edit", value: 'edit_departments'},
      {label: "Delete", value: 'delete_departments'},
      {label: "View", value: 'view_departments'},
    ]
  },
  {
    label: "projects",
    rules:[
      {label: "Add", value: 'add_projects'},
      {label: "Edit", value: 'edit_projects'},
      {label: "Delete", value: 'delete_projects'},
      {label: "View", value: 'view_projects'},
    ]
  },
  {
    label: "payment",
    rules:[
      {label: "Add", value: 'add_payment'},
      {label: "Edit", value: 'edit_payment'},
      {label: "Delete", value: 'delete_payment'},
      {label: "View", value: 'view_payment'},
    ]
  },
]