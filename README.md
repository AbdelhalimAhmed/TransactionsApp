This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@Expo`](https://docs.expo.dev/).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://docs.expo.dev/get-started/installation/) instructions, before proceeding.
 
## Download the app repo

```bash
git clone https://github.com/AbdelhalimAhmed/TransactionsApp
```

## Install dependencies then start the Development Server

run the following commands from the _root_ of Transactions project:

```bash
npm install

npx expo start
```

# Completed tasks
1. Implement a Transaction entry screen with fields for type, category, date, amount, and description. 
2. Adding an entering animation to create a transaction screen.
3. Implement a transactions list screen with two action buttons 'Floating button and Centered button' to navigate to the 'create transaction' screen.
4. Implement a transactions summary to show a monthly transaction income/expense.
5. Implement delete Transaction functionality with the animated Swipe to right feature.
6. Using react-hook-form to handle transaction entry screen form, for more info: https://www.react-hook-form.com/get-started/#Quickstart
7. Using Redux to manage state and using its recommended tools '@reduxjs/toolkit' from my point of view it's much nicer and readable rather than traditional boilerplate readux!.
  for more info: https://redux-toolkit.js.org/introduction/getting-started
1. Using react-native-reanimated and react-native-gesture-handler to handle stunning/performant animation like entering/exiting components and swipeable cards.


# Folder Structure
Below is the considered folder structure for this project.

```
root-project/
|- src/
  |- assets -> Contains all static assets like "Images" maybe add "font" beyond.
  |- attributes -> Contains all constants attributes such as Colors, FontStyle, Spacing,... ".
  |- components -> Contains all reusable UI components.
  |- navigation -> Contains all configuration of navigation.
  |- screens -> Contains all pages/screens with their logic.
  |- store -> Contains all Slices or reducers for managing state.
  |- utils -> Contains all utility functions like "useMonthlySummary"
```

# Demo



https://github.com/AbdelhalimAhmed/TransactionsApp/assets/16348512/74ea7b58-924d-441f-961e-4875db3a3adb


https://github.com/AbdelhalimAhmed/TransactionsApp/assets/16348512/3f88845b-20cb-4ecb-b86d-68562faac016



