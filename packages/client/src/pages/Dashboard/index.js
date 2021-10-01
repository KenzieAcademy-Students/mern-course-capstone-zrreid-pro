import React, { useState, useEffect, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Modal, useDisclosure } from '@chakra-ui/react';
import { Header, Sidebar, TaskDetail, ProjectView, ProfileView } from '../../components';
import { useProvideAuth } from 'hooks/useAuth';
import useProvideProject from 'hooks/useProject';
import './Dashboard.scss';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import CustomDatePicker from '../../components/CustomDatePicker';

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
  description: 'lorem ipsum and all that',
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
  // currentProject: 0,
  projectView: 0
}

const initialTask = {
  _id: '',
  objective: '',
  status: '',
  deadline: '',
  tags: [],
  notes: '',
  comments: [],
  users: [],
  subtasks: [],
  timestamps: ''
}



const reducer = (state, action) => {
  switch(action.type) {
    case 'PAGE_NAV':
      return {
        ...state,
        pageView: action.payload
      };
    case 'PROJECT_NAV':
      return {
        ...state,
        pageView: 0
        // currentProject: action.payload
      };
    case 'RELOAD':
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state: { user } } = useProvideAuth();
  const { project, fetchProject } = useProvideProject();
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // const [ project, setProject ] = useState(dummyProject);
  const [ task, setTask ] = useState();

  const handleNavigate = (page) => {
    // if(!page) {
    //   // console.log('Navigating to the Project Dashboard');
    // } else {
    //   // console.log('Navigating to the User Dashboard');
    // }
    dispatch({
      type: 'PAGE_NAV',
      payload: page
    });
    sessionStorage.setItem('MERNAppDashboard', JSON.stringify({...state, pageView: 1}));
  }

  const handleLoadProject = (pid, index) => {
    // if(!state.currentProject === index) {
    //   dispatch({
    //     type: 'PROJECT_NAV',
    //     payload: index
    //   });

    //   localStorage.setItem('MERNAppDashboard', JSON.stringify({...state, currentProject: index}));
  
    //   fetchProject(pid);
    // }
    dispatch({
      type: 'PROJECT_NAV',
      payload: index
    });

    sessionStorage.setItem('MERNAppDashboard', JSON.stringify({...state, pageView: 0}));

    fetchProject(pid);
  }

  const fetchTask = async (tid) => {

  }

  const handleOnOpen = (tid) => {
    console.log('open modal')
  }

  useEffect(() => {
    //For when users can be created
    // fetchProject(user.project_list[0]._id);
    // console.log('Current User:', user);
    // console.log(user);
    // fetchProject(user)
    const savedProject = localStorage.getItem('MernAppProject') || false;
    if(savedProject) {
      // dispatch({
      //     type: 'LOAD',
      //     payload: savedProject
      // });
      fetchProject(savedProject);
    } else {
        if(user.project_list.length !== 0) {
          fetchProject(user.project_list[0]._id);
        }
    }


    const savedState = JSON.parse(sessionStorage.getItem('MERNAppDashboard')) || false;
    if(savedState) {
      dispatch({
        type: 'RELOAD',
        payload: savedState
      });
    } else {
      sessionStorage.setItem('MERNAppDashboard', JSON.stringify(initialState));
    }

    // console.log('PROJECT:', project);
  }, []);

  // IMPORTANT:
  //////// MAKE SURE TO ASK WHETHER CONDITIONALLY RENDERING THE DIFFERENT VIEWS IS BETTER THAN ROUTING THEM

  return (
    <div className='dashboard'>
      <Sidebar
        projectList={user.project_list}
        loadProject={handleLoadProject}
        navigate={handleNavigate}
      />
      
      <div className='main'>
        <Header user={user} projectTitle={project.title} pageView={state.pageView} />
        {
          !state.pageView ? (
            <ProjectView project={project} session={state} openTaskDetails={handleOnOpen}/>
          ) : (
            <ProfileView />
          )
        }
        {/* <Switch>
          <Route exact path='/' render={() => <ProjectView session={state} openTaskDetails={handleOnOpen} />} />
          <Route exact path='/profile' render={() => <ProfileView />} />
          
        </Switch> */}
      </div>
    </div>
  );

  // return (
  //   <div className='dashboard'>
  //     <Sidebar
  //       projectList={user.project_list}
  //       loadProject={handleLoadProject}
  //       navigate={handleNavigate}
  //     />
      
  //     <div className='main'>
  //       <Header user={user} projectTitle={project.title} pageView={state.pageView} />
  //       {
  //         !state.pageView ? (
  //           <ProjectView session={state} openTaskDetails={handleOnOpen}/>
  //         ) : (
  //           <ProfileView />
  //         )
  //       }
  //     </div>
  //   </div>
  // );

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