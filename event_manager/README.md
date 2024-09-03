Installation

- Backend Project

  cd event_manager

- Create and activate a virtual environment:

  python3 -m venv venv

  source venv/bin/activate

- Install the required packages:

  pip3 install -r requirements.txt

Usage

- Run Migrations:

  python3 manage.py makemigrations

  python3 manage.py migrate

- Run Django server:

  python3 manage.py runserver
