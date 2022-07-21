# CSV Upload

## Installation

Clone this repository on your system and install the packages for both client and server.

#### Environment variable

Add a .env file on the root folder and create a variable `DB`

Only for local database, which you can see on .env.example on this repository.

\* DB: mongodb://localhost:27017/db-name

```bash
git clone git@github.com:shahrierQA/csv_upload.git
cd csv_upload
yarn
cd client
yarn
cd ..
yarn dev
```

## Features

- [x] CSV Upload
  - [x] Can upload any CSV file
  - [x] Support only CSV file format
  - [x] Can DELETE a particular CSV file
- [x] CSV Data Table
  - [x] Display all data for a CSV file in a table format
  - [x] Able to search on a table data
  - [x] Can UPDATE the specific field data in table
  - [x] Can paginate the page

## Tech Stack

- Frontend: ReactJS, TailwindCSS, React Query
- Backend: NodeJS, ExpressJS
- Database: MongoDB
