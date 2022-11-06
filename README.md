# Pinger
Pinger is a functional social media that integrates user proximity with the app experience, introducing a real-world component for online communication between users.

## Documents
[Pinger - Concepts and Design](https://docs.google.com/presentation/d/1pv8PWti0bhJQTk2DIm3SGqhi-XeERzFZrlI5VrNP2KY/edit?usp=sharing) :: This is a document for pitch ideas, value propositions and other conceptual points that the team wishes to note down. The aim of this document is to let the idea evolve in ways that we can all see, and ensure that decisions made have substance behind them.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### All Figures are at the bottom of each section
I.E. 

### OUTLINE
-------
Our application (Pinger) aims to host a platform for individuals and businesses to communicate with each other, primarily using their location. Pinger is a location-based social media platform that aims to bring users closer together using their proximity as a means to communicate with each other. 

The applications target demographic is everyone, regardless of age, gender, race, etc In extension of this we aim to target local businesses and local emergency services to help grow or service a province. In summary anyone with a mobile-phone and connection to the internet with location services can use this app.

As for data sources, our primary source is Google Maps. The application utilises Google Maps API to allow us to render a map onto the users screen. With access to the full auite of Google Maps, integration of the map is easy as the infrastructure has been built by Google. Along side this we use Google Firebase to store our own data and manage client CRUD operations.

GITHUB REPO
-----------

### MVP Reflection
--------------
## As per our MVP, we set out to achieve the following features;
    *Be able to use the app,
    *Have the user see their location and it be keyed to their user account,
    *Be able to perform CRUD operations based on geographical location,
    *Heatmap functionality,
    *Multiple reporting types,
    *Functioning database,
    *Authentication,
    *Real time information.
    *Real time profile, locale

### As for what we achieved based on the list above;
   * A functional and usable application,
   * The user can see their location and it is stored in the database (Figure 1),
    * The user can perform all CRUD operations based around geographical location (Figure 2),
   * Multiple reporting types (Figure 3),
     * A Functioning cloud Database,
    * Authentication to access the application using Auth0,
    * Real-Time updating using Pub/Sub functions with Google Cloud Functions.
    

### Additional Milestones achieved that were not mentioned in the MVP;
   * A fully functioning API,
    * Application is hosted on the Internet (group-z.web.app),
    * The full integration of a cloud type database which was never intended to be used,
    * A Time To Live Function for markers, built for a self-sustaining Database (Figure 4),
    * Welcome email functionality to all new users 
    * Monitoring real time user passwords with breach protection 

### Source Code Guide
-------------------

## The React components that render on the screen are located in the folder named:
* src,
* src/Components,
* src/CoreComponents,
* src/DebuggingOrDeprecated,
* src/icons

### The Backend logic, including API, google cloud functions and live builds are in the folder named:

* RestAPI,
* RestAPI/functions, (API and functions)
* RestAPI/public (build)
    
### Next Steps
—--------
Our next steps would first be in taking a step back. We have learnt a lot in the past few weeks about how projects are managed, how to work as a team, and what each component in the Full Stack Development cycle does and its importance. As the project had to be done hastly we feel as if we did not have enough time to plan out basic sketches of what the product will do and feel like. Proper diagrams and mockups would be made to give us an idea for what we are building, with this we can then choose what is realistically achievable and what technologies will best help us achieve that.

Moving on to the technologies that will choose to develop with, in hindsight we might have been better off using React Native. React Native is a better framework for our application as we would like it to be a social media app that users can use on their phones. As for the other technologies we choose throughout this assignment such as NodeJS, Google Firebase and Auth0, we feel as if these were the right choices.

Our planning was not as structured as we liked and we tended to communicate through a telecommunications application, Discord, and decided on what eachother were going to do and proceed. This did not cause any problems, but long term it could have damaged our ability to communicate and organise effectively as one. The use of Trello, or use Github and its full capabilities.

## Roles
—----
### Taylan (45948801)
### Joshua (46558098)
### Ishaq

### Joshua managed the frontend of the application. This included the google maps api, all user functionality, all marker functionality and much of the UI
### Taylan’s role was to manage the BackEnd. This included integrating the Database and cloud functions and building the API.
### Ishaq looked after auth and security. This includes breach protection for users, a real time profile pulled from socials, an email provider setup for welcome emails and instructions and the landing page. 




### Landing page 


![image](https://user-images.githubusercontent.com/100017925/200164241-4e755082-7dac-4f07-94d0-94226fec2d7b.png)


### Login with Auth0 

![image](https://user-images.githubusercontent.com/100017925/200164318-dc4393e2-0ec1-41a0-9e03-53f6c37679ae.png)

### After logging in 

![image](https://user-images.githubusercontent.com/100017925/200164336-e638c1d1-3168-40c6-b3e5-847036a226f5.png)

### Left menu 

![image](https://user-images.githubusercontent.com/100017925/200164343-42948d07-dd6d-405c-a6a1-09c587c22bcd.png)

### Profile section

![image](https://user-images.githubusercontent.com/100017925/200164363-5abe4528-5cd9-4a32-8e97-99bdab26056d.png)

#### Add friends 

![image](https://user-images.githubusercontent.com/100017925/200164407-f6ac37a1-c533-4f72-aa8c-91758bbe1afd.png)

### Right Menu 

![image](https://user-images.githubusercontent.com/100017925/200164434-18d5e006-0984-47f3-9f5c-d36a18f1530c.png)


### Right Menu after clicking dropdown

![image](https://user-images.githubusercontent.com/100017925/200164456-2712187a-8b8b-424a-8db2-981c56414e85.png)


### Selecting marker (click on marker button in center bottom) this is before click

![image](https://user-images.githubusercontent.com/100017925/200164481-5439d7b5-f5cf-4fd1-85bf-f0aeda0bd734.png)

### After click (select marker colour)

![image](https://user-images.githubusercontent.com/100017925/200168175-d35a3e1d-36af-4237-9fc1-3a9a4117ce17.png)


### After dropping coloured markers (red, blue, green) 

![image](https://user-images.githubusercontent.com/100017925/200168198-e7a6dac6-fc3e-4a34-8199-6bcc31fcc1df.png)


### After clicking hide blue markers, the blue marker is hidden 

![image](https://user-images.githubusercontent.com/100017925/200168213-17a249c0-55ec-4cc9-8fab-e01b5a909fe8.png)


### Adding a comment to a marker, can also increase or decrease like count 


![image](https://user-images.githubusercontent.com/100017925/200164669-79bf6253-28c4-41da-b237-e7e96436cff7.png)


### Return to current location by clicking on center location on top of map 

![image](https://user-images.githubusercontent.com/100017925/200164586-05674765-3d79-473d-9f79-a6e0883da897.png)







