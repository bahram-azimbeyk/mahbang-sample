# Mahbang Sample Project

This project is a simple Angular application that demonstrates the use of the facade design pattern to interact with a REST API. The application allows users to view a list of employees, create new employees, edit existing employee details, and delete employees.

## Features

- **Employee List**: Displays a list of employees with options to edit or delete each employee.
- **Employee Dialog**: A dialog that allows users to create a new employee or edit an existing one. The dialog uses reactive forms with validation.
- **API Service**: Handles all API calls to the provided REST API endpoint.
- **Employee State**: Manages the state of the employee list using RxJS.
- **Employee Facade**: Implements the facade design pattern to abstract the interaction between the application components and the state & API service.
- **Error Handling**: Uses an API interceptor to handle potential errors from the API, including CORS issues.

## Facade Design Pattern

The facade design pattern provides a unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use. In this project, the `EmployeeFacade` class serves as the facade, providing a simplified API for the components to interact with the employee data without directly dealing with the state management or API calls.

## Special Features

- **Environment Configuration**: The project uses different environment configurations for development and production. For instance, error descriptions are shown in development mode but are hidden in production mode.
- **API Interceptor**: The `ApiInterceptor` class intercepts HTTP requests and handles potential errors, such as server unresponsiveness or too many requests.

## Setup

1. Clone the repository: `git clone https://github.com/bahram-azimbeyk/mahbang-sample.git`
2. Navigate to the project directory: `cd mahbang-sample`
3. Install the dependencies: `npm install`
4. Run the application: `ng serve`
5. Open a browser and navigate to `http://localhost:4200/`

## Links to Key Files

- [Employee Model](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/models/employee.model.ts)
- [Employee Dialog Component](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/components/employee-dialog/employee-dialog.component.ts)
- [Employee List Component](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/components/employee-list/employee-list.component.ts)
- [Employee Facade](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/facade/employee.facade.ts)
- [Employee State](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/states/employee-state.ts)
- [API Service](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/apis/api.service.ts)
- [API Interceptor](https://github.com/bahram-azimbeyk/mahbang-sample/blob/master/src/app/interceptor/api.interceptor.ts)

