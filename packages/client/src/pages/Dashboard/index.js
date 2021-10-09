import React, { useState, useEffect, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { Modal, useDisclosure } from '@chakra-ui/react';
import { Header, Sidebar, TaskDetailsModal, ProjectCreationModal, TaskCreationModal, TaskDetail, ProjectView, ProfileView } from '../../components';
import { useProvideAuth } from 'hooks/useAuth';
import useProvideProject from 'hooks/useProject';
import axios from '../../utils/axiosConfig';
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
  objective: '',
  status: '',
  // deadline: '',
  // tags: [],
  notes: '',
  // comments: [],
  // users: [],
  // subtasks: [],
  // timestamps: ''
}

const initialProject = {
  title: '',
  description: '',
  users: []
};



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
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { state: { user }, signout } = useProvideAuth();
  const { project, fetchProject, createProject, updateProject, createTask, updateTask } = useProvideProject();
  // const [ project, setProject ] = useState(projectState);
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // const [ project, setProject ] = useState(dummyProject);
  const [ tids, setTIDs ] = useState([]);
  const [ task, setTask ] = useState();
  const [ taskUpdated, setTaskUpdated ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false); //indicates whether task data is loaded
  const [ showTaskModal, setShowTaskModal ] = useState(false);
  const [ totalUsers, setTotalUsers ] = useState([]);

  // const [ projectDescription, setProjectDescription ] = useState();

  const [ newProjectData, setNewProjectData ] = useState(initialProject);
  const [ showProjectCreationModal, setShowProjectCreationModal ] = useState(false);

  const [ newTaskData, setNewTaskData ] = useState(initialTask);
  const [ showTaskCreationModal, setShowTaskCreationModal ] = useState(false);

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

  const getTotalUsers = async () => {
    try {
      const response = await axios.get('user/minimum');
      setTotalUsers(response.data.users);
      // console.log(response.data)
    } catch(error) {
      console.log('Fetching Total Users Error:', error);
    }
  }

  const getTask = async (tid) => {
    try {
      console.log(tid)
      const response = await axios.get(`task/${tid}`);
      console.log(response.data);
      setTask(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log('Task Fetch Error:', error);
    }
  }

  //For Task Details/////////////////////////////////////////
  const handleToggleTaskModal = (action, tid = '') => {
    let newTIDs = [...tids];
    if(action) {
      console.log('Opening Task Details for:', tid);
      newTIDs.push(tid);
      setTIDs(newTIDs);
      getTask(tid);
      setShowTaskModal(true);
    } else {
      if(tids.length === 1) {
        if(taskUpdated) {
          console.log('Update Task')
          updateTask(task);
        }
        setTIDs([]);
        setTask({});
        setTaskUpdated(false);
        setShowTaskModal(false);
        setIsLoaded(false);  
      } else {
        console.log('Opening Task Details for:', newTIDs[-1]);
        newTIDs.pop();
        setTIDs(newTIDs);
        getTask(newTIDs[-1]);
      }
    }
    
  }

  const handleTaskUpdate = (event) => {
    setTaskUpdated(true);
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  }
  //////////////////////////////////////////////////

  //For Project Details//////////////////////////////
  const handleProjectUpdate = (description) => {
    updateProject(description);
  }

  ///////////////////////////////////////////////////

  //For Project Creation////////////////////////////
  const handleProjectInputChange = (event) => {
    setNewProjectData({
      ...newProjectData,
      [event.target.name]: event.target.value
    });
  }

  const handleProjectUsersChange = (userList) => {
    setNewProjectData({
      ...newProjectData,
      users: userList
    });
  }

  const handleToggleProjectCreationModal = () => {
    setShowProjectCreationModal(!showProjectCreationModal);
  }

  const handleCreateProject = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log('Create Project:', newProjectData);
    createProject(newProjectData);
    setShowProjectCreationModal(false);
    setNewProjectData(initialProject);
  }
  ////////////////////////////////////////////

  //For Task Creation////////////
  const handleTaskInputChange = (event) => {
    setNewTaskData({
      ...newTaskData,
      [event.target.name]: event.target.value
    });
  }

  const handleToggleTaskCreationModal = () => {
    setShowTaskCreationModal(!showTaskCreationModal);
    setNewTaskData({
      ...newTaskData,
      status: project?.status_categories[0]?.label
    });
  }

  const handleCreateTask = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Create Task:', newTaskData);
    createTask(newTaskData);
    setShowTaskCreationModal(false);
    setNewTaskData(initialTask);
  }
  ///////////////////////////////

  useEffect(() => {
    //For when users can be created
    // fetchProject(user.project_list[0]._id);
    // console.log('Current User:', user);
    // console.log(user);
    // fetchProject(user)
    getTotalUsers();
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

  // useEffect(() => {
  //   if(project) {
  //     setProjectDescription(project.description);
  //   }
  // }, [project]);

  // IMPORTANT:
  //////// MAKE SURE TO ASK WHETHER CONDITIONALLY RENDERING THE DIFFERENT VIEWS IS BETTER THAN ROUTING THEM

  return (
    <div className='dashboard'>
      <Sidebar
        projectList={user.project_list}
        loadProject={handleLoadProject}
        navigate={handleNavigate}
        toggleProjectCreationModal={handleToggleProjectCreationModal}
        openTaskCreate={handleToggleTaskCreationModal}
      />
      
      <div className='main'>
        <Header user={user} projectTitle={project.title} pageView={state.pageView} signout={signout} />
        {
          !state.pageView ? (
            <ProjectView
              project={project}
              session={state}
              openTaskDetails={handleToggleTaskModal}
              totalUsers={totalUsers}
              projectUpdate={handleProjectUpdate}
            />
          ) : (
            <ProfileView />
          )
        }
        { (showTaskModal && isLoaded) && (
            <TaskDetailsModal
              toggleModal={handleToggleTaskModal}
              // component={0}
              task={task}
              projectTitle={project.title}
              taskUpdate={handleTaskUpdate}
            />
            ) }
          
          { showProjectCreationModal && (
              <ProjectCreationModal
                data={newProjectData}
                totalUsers={totalUsers}
                currentUser={user.uid}
                handleInputChange={handleProjectInputChange}
                updateUserList={handleProjectUsersChange}
                createProject={handleCreateProject}
                toggleModal={handleToggleProjectCreationModal}
              />
          )}

          { showTaskCreationModal && (
            <TaskCreationModal
              data={newTaskData}
              handleInputChange={handleTaskInputChange}
              createTask={handleCreateTask}
              toggleModal={handleToggleTaskCreationModal}
            />
          )}
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