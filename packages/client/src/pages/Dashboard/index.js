import React, { useState, useEffect, useReducer } from 'react';
import { Header, Sidebar, TaskDetailsModal, ProjectCreationModal, TaskCreationModal, ProjectView, ProfileView } from '../../components';
import { useProvideAuth } from 'hooks/useAuth';
import useProvideProject from 'hooks/useProject';
import axios from '../../utils/axiosConfig';
import './Dashboard.scss';

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
  const { state: { user }, signout } = useProvideAuth();
  const { project, fetchProject, createProject, updateProjectDescription, updateProjectUsers, createTask, updateTask, toggleAssignTask, clearProject } = useProvideProject();
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ tids, setTIDs ] = useState([]);
  const [ task, setTask ] = useState();
  const [ taskUpdated, setTaskUpdated ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false); //indicates whether task data is loaded
  const [ showTaskModal, setShowTaskModal ] = useState(false);
  const [ totalUsers, setTotalUsers ] = useState([]);

  const [ newProjectData, setNewProjectData ] = useState(initialProject);
  const [ showProjectCreationModal, setShowProjectCreationModal ] = useState(false);

  const [ newTaskData, setNewTaskData ] = useState(initialTask);
  const [ showTaskCreationModal, setShowTaskCreationModal ] = useState(false);

  const handleNavigate = (page) => {
    dispatch({
      type: 'PAGE_NAV',
      payload: page
    });
    sessionStorage.setItem('MERNAppDashboard', JSON.stringify({...state, pageView: 1}));
  }

  const handleSignout = () => {
    clearProject();
    signout();
  }

  const handleLoadProject = (pid, index) => {
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
    } catch(error) {
      console.log('Fetching Total Users Error:', error);
    }
  }

  const getTask = async (tid) => {
    try {
      const response = await axios.get(`task/${tid}`);
      setTask(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log('Task Fetch Error:', error);
    }
  }

  const handleGetStatusColor = (status) => {
    for(let i=0; i<project?.status_categories?.length; i++) {
      if(project?.status_categories[i]?.label === status) {
        return project?.status_categories[i]?.color;
      }
    }
    
  }

  //For Task Details/////////////////////////////////////////
  const handleToggleTaskModal = (action, tid = '') => {
    let newTIDs = [...tids];
    if(action) {
      newTIDs.push(tid);
      setTIDs(newTIDs);
      getTask(tid);
      setShowTaskModal(true);
    } else {
      if(tids.length === 1) {
        if(taskUpdated) {
          updateTask(task);
        }
        setTIDs([]);
        setTask({});
        setTaskUpdated(false);
        setShowTaskModal(false);
        setIsLoaded(false);  
      } else {
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

  const handleStatusUpdate = (status) => {
    setTaskUpdated(true);
    setTask({
      ...task,
      'status': status
    });
  }

  const handleToggleAssignTask = (tid, uid, operation) => {
    toggleAssignTask(tid, uid, operation);
  }

  const handleToggleAssignPayload = (tid, uid, operation) => {
    toggleAssignTask(tid, uid, operation);
    if(operation) {
      let newTask = {...task};
      delete newTask.assigned_user;
      setTask(newTask);
    } else {
      let newUser = project?.users.find((user) => user._id === uid);
      setTask({
        ...task,
        assigned_user: newUser
      });
    }
  }

  const handleToggleSubtask = (index) => {
    setTaskUpdated(true);
    const subtasks = task.subtasks.map((subtask, num) => index === num ? { ...subtask, completed: !subtask.completed } : subtask);
    setTask({
      ...task,
      'subtasks': subtasks
    });
  }
  //////////////////////////////////////////////////

  //For Project Details//////////////////////////////
  const handleProjectDescriptionUpdate = (description) => {
    updateProjectDescription(description);
  }

  const handleProjectUsersUpdate = (users) => {
    let newUsers = users.map((user) => totalUsers.find((item) => item._id === user.value));
    updateProjectUsers(newUsers);
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
    if(showProjectCreationModal) {
      setNewProjectData(initialProject);
    }
    setShowProjectCreationModal(!showProjectCreationModal);

  }

  const handleCreateProject = (event) => {
    event.preventDefault();
    event.stopPropagation();
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
    if(showTaskCreationModal) {
      setNewTaskData(initialTask);
    } else {
      setNewTaskData({
        ...newTaskData,
        status: project?.status_categories[0]?.label
      });
    }
    setShowTaskCreationModal(!showTaskCreationModal);
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
    getTotalUsers();
    const savedProject = localStorage.getItem('MernAppProject') || false;
    if(savedProject) {
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
  }, []);

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
        <Header user={user} projectTitle={project.title} pageView={state.pageView} signout={handleSignout} />
        {
          !state.pageView ? (
            <ProjectView
              project={project}
              session={state}
              openTaskDetails={handleToggleTaskModal}
              totalUsers={totalUsers}
              projectDescriptionUpdate={handleProjectDescriptionUpdate}
              projectUsersUpdate={handleProjectUsersUpdate}
              assignTask={handleToggleAssignTask}
              getStatusColor={handleGetStatusColor}
            />
          ) : (
            <ProfileView
              user={user}
              getStatusColor={handleGetStatusColor}
              openTaskDetails={handleToggleTaskModal}
            />
          )
        }
        { (showTaskModal && isLoaded) && (
            <TaskDetailsModal
              toggleModal={handleToggleTaskModal}
              // component={0}
              task={task}
              projectTitle={project.title}
              projectCategories={project.status_categories.map((status) => status.label)}
              projectUsers={totalUsers}
              taskUpdate={handleTaskUpdate}
              statusUpdate={handleStatusUpdate}
              toggleAssignTask={handleToggleAssignPayload}
              toggleSubtask={handleToggleSubtask}
              getStatusColor={handleGetStatusColor}
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
      </div>
    </div>
  );
}