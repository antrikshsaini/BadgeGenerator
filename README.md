## Getting Started

First, run the backend server:

- Backend Project

  cd event_manager

- Create and activate a virtual environment:

  python3 -m venv venv

  source venv/bin/activate

- Install the required packages:

  pip3 install -r requirements.txt

- Run Migrations:

  python3 manage.py makemigrations

  python3 manage.py migrate

- Run Django server:

  python3 manage.py runserver

## Frontend Server

let the backend Server running and open new terminal from root directory

- Frontend Project

  cd badge-generator

- Install dependencies

  npm install

- Run Development Server

  npm run dev
