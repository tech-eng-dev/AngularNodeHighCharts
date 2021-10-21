# Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Install packages
Run `npm install`

## Run the application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## The implementation has main requirements as following:
1. The application should take 2 inputs:
○ Language : a dropdown menu with 5 language options of your choice
○ Repo limit : a numerical input that caps at 20
2. The application title should update to reflect the language selected
3. The number of repos displayed should reflect the repo limit
4. As the inputs change, the chart should redraw
5. Application is using highcharts angular library

## The next steps
1. Beautify UI with material UI library
2. Loading overlap into chart component while fetching data from the server
3. Unit test
- Add Unit test to chart component class for user events
- Api service Unit test with mock data
