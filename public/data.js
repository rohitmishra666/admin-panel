import {v4 as uuidv4} from 'uuid';
import { DollarSign, Users, Activity, LogIn } from 'lucide-react';
let userData = [
    {
        id: uuidv4(),
        name: "John Doe",
        email: "johndoe@email.com",
        gender: "M",
        status: true,
        date: "2021-07-21",
        amount: 1000
    },
    {
        id: uuidv4(),
        name: "Jane Doe",
        email: "janedoe@email.com",
        gender: "F",
        status: false,
        date: "2021-02-25",
        amount: 2000
    },
    {
        id: uuidv4(),
        name: "John Smith",
        email: "johnsmith@email.com",
        gender: "M",
        status: true,
        date: "2022-06-11",
        amount: 3000
    },
    {
        id: uuidv4(),
        name: "Jane Smith",
        email: "janesmith@email.com",
        gender: "F",
        status: false,
        date: "2023-12-01",
        amount: 4000
    },
    {
        id: uuidv4(),
        name: "Oliver Smith",
        email: "oliversmith@email.com",
        gender: "M",
        status: true,
        date: "2024-05-01",
        amount: 5000
    }
]

let tasks = [
    {
        id: uuidv4(),
        task: "Schedule meeting with client",
        date: "2023-07-01",
        status: true
    },
    {
        id: uuidv4(),
        task: "Prepare financial report",
        date: "2023-07-02",
        status: true
    },
    {
        id: uuidv4(),
        task: "Update project roadmap",
        date: "2023-07-03",
        status: false
    },
    {
        id: uuidv4(),
        task: "Conduct team building activity",
        date: "2023-07-04",
        status: true
    },
    {
        id: uuidv4(),
        task: "Review quarterly goals",
        date: "2023-07-05",
        status: false
    },
    {
        id: uuidv4(),
        task: "Organize marketing campaign",
        date: "2023-07-06",
        status: true
    },
    {
        id: uuidv4(),
        task: "Client feedback session",
        date: "2023-07-07",
        status: false
    }
];

const stats = [
    {
      title: "Total Revenue",
      numerics: "$452",
      description: "+20.1% from last month",
      icon: DollarSign
    },
    {
      title: "Total Users",
      numerics: "235",
      description: "+18.1% from last month",
      icon: Users
    },
    {
      title: "Active Users",
      numerics: "+123",
      description: "+19% from last month",
      icon: Activity
    },
    {
      title: "Active Now",
      numerics: "+57",
      description: "+20 since last hour",
      icon: LogIn
    }
  ];

export {
    userData,
    tasks,
    stats
}