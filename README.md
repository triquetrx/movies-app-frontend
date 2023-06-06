# MoviesApp

It is the frontend application for movies application built using angular cli v10.2.4
The default port for the same is 4200.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code structure

The application consists of four main parts out of which three are being lazy loaded i.e. ADMIN, USER and Movies modules as the users might not sign in but just go through the movies available. The routing for the same is present in app-routing module.

## Code dependencies

The code makes use of angular with material ui and also bootstrap v5.2.3 (only for grids). the linting for the same has been enabled and the tslint.json file is the config for the same.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via Karma and all of the same is present in spec.ts file. The current code coverage for the same is 95%
