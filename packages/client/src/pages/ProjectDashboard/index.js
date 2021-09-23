import React, { useState } from 'react';
import { Modal, useDisclosure } from '@chakra-ui/react';
import { TaskCard, TaskDetail } from '../../components';
import './ProjectDashboard.scss';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

import CustomDatePicker from '../../components/CustomDatePicker';


const task = {
  objective: 'Do something',
  status: 0,
  deadline: new Date(),
  tags: ['tag1', 'tag2', 'tag3'],
  notes: '',
  comments: [],
  users: ['me', 'myself', 'I'],
  // users: [],
  subtasks: []
};

const project = {
  title: 'TaskMaster',
  description: '',
  owner: 'I',
  deadline: new Date('9/27/21'),
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  users: ['me', 'myself', 'I', 'someone'],
  categories: ['cat1', 'cat2'],
  tasks: []
};

export default function ProjectDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ deadline, setDeadline ] = useState();

  return (
    <div className='projectDash'>
      <TaskCard task={task} project={project} mode={0} />
      <button onClick={onOpen}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <TaskDetail
          task={task}
          projectTitle={project.title}
          projectCategories={project.categories}
          projectDeadline={project.deadline}
          projectTags={project.tags}
        />
      </Modal>
      <br/>

      <CustomDatePicker />

      {/* <DatePicker
        selected={deadline ? deadline : ''}
        onChange={(date) => setDeadline(date)}
        placeholder={'Set Deadline'}
        isClearable
      /> */}
    </div>
  );
}