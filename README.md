# ManageHostel Frontend

ManageHostel is an online Hostel booking website where student can book hostel rooms.

## Tech-Stack
1. [ReactJs](https://reactjs.org/)
2. [NodeJs](https://nodejs.org/en/about/)
3. [Express](https://expressjs.com/)
4. [MongoDB](https://www.mongodb.com/)
5. [JWT](https://jwt.io/introduction)

## Pre-Requisites

1. Any IDE (eg. VS Code , Sublime etc).
2. Node JS
3. NPM Installer

## Set up in Your local system

- You can clone the repository

  1. Make sure your machine is having internet connection.
  2. Open shell (which ever your OS support) on your PC.
  3. Change drive to the location where you want your project to be copied.
  4. Make a folder name **ManageHostel** and change directory to that folder.
  5. Now type or copy-paste the below given commands.
      - Frontend
        ```
          https://github.com/ashutosh3027/ManageHostel-Frontend
        ```
      - Backend
        ```
          https://github.com/ashutosh3027/ManageHostel-Backend
        ```
  6. Press Enter and the project will be cloned in you system.

  ```You can directly download the zip file and extract it```

- After extracting the zip file or after cloning the repository

  1. You will find 2 folders.
      - ManageHostel-Frontend
      - ManageHostel-Backend
      
      ```You can change the names of folder if you want.```
   2. To run Client folder, type the following commands in terminal
      - cd ManageHostel-Frontend
      - npm install
      - npm start
      
      ```Frontend port - 3000```
  3. To run Server folder, type the following commands in terminal
      - cd ManageHostel-Backend
      - npm install
      - npm start
      
      ```Backend port - 8000```


## Brief Project Structure

```
/
|-- ManageHostel-Frontend/		
    |-- public/
        |-- index.html            #First webpage of the project
    |-- src/
        |-- assets/ 
            |-- css/                    #Contains css used in the project
            |-- images/                 #Contains images used in the project
        |-- axiosConfigure              #Contains setup for axios
        |-- components/           #Contains all the required components of project
            |-- About/                  #Contains about page
            |-- Home/                   #Contains home page
            |-- Login/                  #Contains UI for login
            |-- Navebar/                #Contains UI for Navbar  
            |-- Profile/                #Contains UI for student's profile
            |-- Register/               #Contains UI for siginUp
            |-- requests/               #Contains UI for requesting rooms
            |-- RequestStatus/          #Contains UI for checking Request Status
            |-- RoomDetail/             #Contains UI for room detail
            |-- RoomStatus/             #Contains UI for room status
            |-- Spinner/                #Contains global loader.
        |-- context/              #Defined all global states
        |-- services/             #Contains all api functions used in the project
        |-- utils/                #Contains authentication component
|    
|-- ManageHostel-Backend/
    |-- controller/          #Contains all the controllers of project
        |-- authController.js     #Contains all the functions related to authentication
        |-- errorController.js    #Contains all the functions related to errors
        |-- requestController.js  #Contains all the functions related to request
        |-- roomController.js     #Contains all the functions related to rooms
        |-- userController.js  #Contains all the functions related to user
    |-- modals/               #Contains Schemas
        |-- requestModals.js       #Contains request schema
        |-- roomModals.js          #Contains room schema
        |-- userModals.js          #Contains user schema
    |-- routes/               #Contains all routes used in project
        |-- requestRoutes.js       #Contains all routes related to requests
        |-- roomRoutes.js          #Contains all routes related to rooms
        |-- userRoutes.js          #Contains all routes related too users
    |-- utils/               #Contains basis utils of project
    |-- app.js               #Contains express app
    |-- server.js            #Main file of ManageHostel server folder
```

