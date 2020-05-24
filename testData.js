const todos = {
  activeTodos: [
    {
      text: "my first todo",
      completed: false,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 1
    },
    {
      text: "my second todo. I'm checked off",
      completed: true,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 2
    }
  ],
  clearedTodos: [
    {
      text: "my first cleared todo",
      completed: false,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 1
    },
    {
      text: "my second cleared todo. I'm checked off",
      completed: true,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 2
    }
  ],
  deletedTodos: [
    {
      text: "my deleted first todo",
      completed: false,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 1
    },
    {
      text: "my deleted second todo",
      completed: false,
      createdAt: "00:00:0000",
      clearedAt: "00:00:0000",
      deletedAt: "00:00:0000",
      id: 2
    }
  ]
};

export default todos;
