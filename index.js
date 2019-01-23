const EmployeesController = require("./controllers/EmployeesController");
const ProjectController = require("./controllers/ProjectsController");
const TaskController = require("./controllers/TaskController");
let { Tasks, Projects, Employees } = require("./data/data");

const initialTasks = [
    {name: "Implement me!", description: "You have to fully implement me.", duration: 2},
    {name: "Dont Implement me!", description: "You have to NOT implement me.", duration: 2},
    {name: "Third Task!", description: "Last one, I promise..", duration: 5}
    ];
const initialProjects = [
    {name: "Project X", startDate: "January 1 2019", timeSlack: 5},
    {name: "Lightcatcher", startDate: "January 1 2019", timeSlack: 10}
    ];
const initialEmployees = [
    {name: "Pesho", lastName: "Peshev", supervisor: "Gosho"},
    {name: "Gosho", lastName: "Goshev", supervisor: "Stamat"}
];

function startApp() {
    //CREATING EMPLOYEE
    let emp1 = EmployeesController.createEmployee(initialEmployees[0]);
    let emp2 = EmployeesController.createEmployee(initialEmployees[1]);
    //TEST CREATING EMPLOYEES >>>
    //console.log(Employees);

    //CREATING PROJECT
    let proj1 = ProjectController.createProject(initialProjects[0]);
    let proj2 = ProjectController.createProject(initialProjects[1]);
    //TEST CREATING PROJECTS >>>
    //console.log(Projects);

    //CREATING TASK - 2 Ways
    let task1 = TaskController.createTask(initialTasks[0]);
    let task2 = TaskController.createTask(initialTasks[1]);
    let task3 = TaskController.createTask(initialTasks[2]);
    //TEST CREATING TASKS >>>
    //console.log(Tasks);

    //ADDING TASKS TO PROJECT
    ProjectController.addTaskToProject(proj1, task1);
    ProjectController.addTaskToProject(proj1, task2);
    //TEST ADDING TASKS TO PROJECT >>>
    //console.log(proj1);

    //EDIT TASK DURATION
    TaskController.editTaskDuration(task1, 3);
    //TEST EDITING TASK DURATION >>>
    //=== TEST 1 >>> Task duration was initially 2, has to be 3 now.
    //console.log(task1);
    //=== TEST 2 >>> Checking if Tasks array (which holds all tasks) is updated. Has to be 3 again.
    //console.log(Tasks[0]);
    //=== TEST 3 >>> Checking if project which has assigned this task is updated. 3 again...
    //console.log(proj1);
    //=== TEST 4 >>> Checking if Projects array is updated .
    //(Here we can see that property "endDate" of project is also updated).
    //console.log(Projects[0]);

    //ASSIGNING PROJECT TO EMPLOYEE.
    //Uncommenting the last line here will lead to message in console, informing us
    //that we can assign maximum 2 projects to one employee.
    EmployeesController.assignProjectToEmployee(proj1, emp1);
    EmployeesController.assignProjectToEmployee(proj2, emp1);
    //EmployeesController.assignProjectToEmployee(proj2, emp1);
    //console.log(emp1.projects);


    //Now lets check if employee object updates when we add another task to project.
    ProjectController.addTaskToProject(proj2, task3);
    //console.log(emp1.projects);

    //DELETE A SINGLE TASK & ALL UNDERLYING REFERENCES
    TaskController.deleteTask(task1);
    //TaskController.deleteTask(task2);
    //TaskController.deleteTask(task3);
    //=== TEST 1 >>> Employees projects have no more the tasks.
    //console.log(emp1);
    //=== TEST 2 >>> As we can see, endDate is also updated.
    //console.log(emp1.projects[1]);

    //DELETE A SINGLE PROJECT & ALL UNDERLYING REFERENCES
    //ProjectController.deleteProject(proj1);
    //=== TEST 1 >>> Now there is no more proj1 in Projects collection.
    //console.log(Projects);
    //=== TEST 2 >>> Employees who previously had this project, don't have it now.
    //console.log(emp1);

    //DISPLAY ALL EMPLOYEES (Their names only..)
    //EmployeesController.getAllEmployees();

    //DISPLAY ALL TASKS FOR A GIVEN PROJECT
    //ProjectController.getAllTasksInProject(proj2);

    //GET DAYS NEEDED FOR LIST OF PROJECTS
    //First: we have to create several projects and add them a task.
    let firstProj = ProjectController.createProject({name: "Honor 9", startDate: "January 1 2019", timeSlack: 10});
    let secondProj = ProjectController.createProject({name: "Honor 10", startDate: "January 1 2019", timeSlack: 10});
    let taskToAdd = TaskController.createTask({name: "Create this phone!", description: "Lorem ipsum blah bla..", duration: 5});
    ProjectController.addTaskToProject(firstProj, taskToAdd);
    ProjectController.addTaskToProject(secondProj, taskToAdd);
    //So we have 10 days from firstProj, 10 days from secondProj, and 2 x 5 which we've added,
    //by adding the task to the two projects.

    //In total it has to display 30 days.
    ProjectController.getDaysNeededForProjects([firstProj, secondProj]);
}

startApp();
