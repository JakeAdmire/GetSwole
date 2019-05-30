# GetSwole
### A mobile application for scheduling user-specific workout routines.

## Overview

### GetSwole was the capstone project for Module 4 students at Turing School of Software and Design.  Students from both the Frontend and Backend programs are put in groups of 4 and given 13 days to create a full-stack application.  This project gave us further insight into how teams communicate and collaborate if efforts to smoothly integrate both sides of the project team into a cohesive unit.  As well, our group chose to work in React Native, a framework that was new to the entire team.  

## Learning Goals

[More information about original assignment can be found here](http://frontend.turing.io/projects/capstone.html)

## Preview

<img src="https://user-images.githubusercontent.com/41882380/58638179-6a8da200-82b1-11e9-984d-2401e6945afe.gif" width="287"><img src="https://user-images.githubusercontent.com/41882380/58638202-7d07db80-82b1-11e9-8973-eb690395d464.gif" width="287"><img src="https://user-images.githubusercontent.com/41882380/58640416-43859f00-82b6-11e9-849b-e5c7cf57f08b.gif" width="287">

## Wireframe

<img width="1128" alt="Screen Shot 2019-05-29 at 1 43 45 AM" src="https://user-images.githubusercontent.com/39415039/58538858-4350ab00-81b3-11e9-9f00-5f628222a3b7.png">


## Getting Started

These instructions will get a copy of the project up and running on your local machine for usage and testing purposes.

## FrontEnd instructions

## 1.  Install the Expo CLI

```
npm install -g expo-cli
```
## 2.  

## BackEnd instructions
## 1. Clone down the repo:
```
git clone git@github.com:timnallen/BE-GetSwole.git
```
### 2. Install the dependencies in the Gemfile:

```
bundle install
```

## Set up the database:

### 1. Create and migrate:

```
rake db:{create,migrate}
```

### 2. Import the exercises from the .csv file in the /lib directory:

```
rake import:exercises
```

#### 3. Seed the other db items in the seed file:

```
rake db:seed
```

#### 4. Run the code in development mode:

```
rails s
```

#### 5. Open your browser and visit http://localhost:3000

## Future Iterations
- Use OAuth for sign-in
- Edit Routines by sets/reps/duration
- Custom Exercises
- Editable/Deletable Routines
- Google/Apple Store Deployment
- Calendar upgrades


## Tech Stack
### GetSwole was built using: 
- ReactNative
- React Native Elements
- React Navigation
- Redux
- Redux Thunk
- Sass

### And tested using:
- [Enzyme](https://airbnb.io/enzyme/) & [Jest](https://airbnb.io/enzyme/docs/guides/jest.html)

## Credits
Credit for this project goes to: 
- [Jake Admire](https://github.com/JakeAdmire)
- [Eric Fitzsimons](https://github.com/ericfitzsimons451)
- [David Cisneros](https://github.com/developingdavid)
- [Tim Allen](https://github.com/timallen)

---
This project was assigned by David Whitaker and Will Mitchell

*@ Turing School of Software and Design, Denver, CO.*

---
**[Back to Top](https://github.com/JakeAdmire/JA-DC-EF-TA--GetSwole/blob/master/README.md)**
