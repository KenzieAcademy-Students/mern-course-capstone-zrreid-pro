import React, { useState, useEffect, useReducer } from 'react';
import { Modal, useDisclosure } from '@chakra-ui/react';
import { Header, Sidebar, ProjectView, ProfileView } from '../../components';
import { useProvideAuth } from 'hooks/useAuth';
import './Dashboard.scss';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

import CustomDatePicker from '../../components/CustomDatePicker';

//DUMMY DATA/////////////////
const dummyTask = {
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

const dummyProject = {
  title: 'TaskMaster',
  description: '',
  owner: 'I',
  deadline: new Date('9/27/21'),
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  users: ['I', 'myself', 'me', 'someone'],
  categories: ['cat1', 'cat2'],
  tasks: []
};

const dummyUser = {
  username: 'I',
  email: 'I@gmail.com',
  project_list: [
    { _id: 1, title: 'TaskMaster' },
    { _id: 2, title: 'Chores' },
    { _id: 3, title: 'Other Stuff' }
  ]
};
////////////////////////////

const initialState = {
  pageView: 0, //pageView 0 is the project dashboard
  currentProject: 0,
  projectView: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'PAGE_NAV':
      return {
        ...state,
        pageView: action.payload
      }
    case 'PROJECT_NAV':
      return {
        ...state,
        pageView: 0,
        currentProject: action.payload
      }
    default:
      return state;
  }
}

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state: { user } } = useProvideAuth();
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ project, setProject ] = useState(dummyProject);
  // const [ deadline, setDeadline ] = useState();

  const fetchProject = (pid) => {
    //For when projects are being fetched from DB
    // setProject();
  }

  const handleNavigate = (page) => {
    if(!page) {
      console.log('Navigating to the Project Dashboard');
    } else {
      console.log('Navigating to the User Dashboard');
    }
    dispatch({
      type: 'PAGE_NAV',
      payload: page
    });
  }

  const handleLoadProject = (pid) => {
    console.log('Loading Project of ID:', pid);
    dispatch({
      type: 'PROJECT_NAV',
      payload: pid
    });

    fetchProject(pid);
  }

  useEffect(() => {
    //For when users can be created
    // fetchProject(user.project_list[0]._id);
  }, []);

  // IMPORTANT:
  //////// MAKE SURE TO ASK WHETHER CONDITIONALLY RENDERING THE DIFFERENT VIEWS IS BETTER THAN ROUTING THEM

  return (
    <div className='dashboard'>
      <Sidebar
        projectList={dummyUser.project_list}
        loadProject={handleLoadProject}
        navigate={handleNavigate}
      />
      
      <div className='main'>
        <Header user={dummyUser} projectTitle={project.title} pageView={state.pageView} />
        {
          !state.pageView ? (
            <ProjectView />
          ) : (
            <ProfileView />
          )
        }
        
      </div>
    </div>
  );

  // return (
  //   <div className='projectDash'>
  //     <TaskCard task={task} project={project} mode={0} />
  //     <button onClick={onOpen}>Open Modal</button>
  //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
  //       <TaskDetail
  //         task={task}
  //         projectTitle={project.title}
  //         projectCategories={project.categories}
  //         projectDeadline={project.deadline}
  //         projectTags={project.tags}
  //       />
  //     </Modal>
  //     <br/>

  //     <CustomDatePicker />

  //     {/* <DatePicker
  //       selected={deadline ? deadline : ''}
  //       onChange={(date) => setDeadline(date)}
  //       placeholder={'Set Deadline'}
  //       isClearable
  //     /> */}
  //   </div>
  // );
}