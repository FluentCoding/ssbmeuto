# SmashMelee.eu

This is the source code of the website [SmashMelee.EU](https://smashmelee.eu)!

## Setup

### Install Dependencies

1. Install [NodeJs LTS Version](https://nodejs.org/en/)
2. Install the latest version of
[MongoDb Community Server](https://www.mongodb.com/try/download/community)
3. Install yarn using `npm install -g yarn`

### Google Authentication Setup

1. Create a new file called ".env.local" for your local environment variables
by copying .env.examples
2. Head to [Google Cloud Platform](https://console.developers.google.com/)
and create or login with your Google account.
3. Create a new project.
4. Go to the Credentials Tab, press CREATE CREDENTIALS and then Create OAuth client ID.
5. As Application Type select Web Application and fill in a name of your choice.
6. Under *Authorised JavaScript origins* add `http://localhost:3000`.
7. Under *Authorised redirect URIs* add `http://localhost:3000/api/auth/callback/google`.
8. Open the .env.local file in a text editor of your choice.
9. Press create on the Google OAuth client ID and do not close the popup.
10.  Copy *Your Client ID* to .env.local's *GOOGLE_CLIENT_ID* field
11. Copy *Your Client Secret* to .env.local's *GOOGLE_CLIENT_SECRET*

### Creating an admin account

1. Use the MongoDB Compass Community or any other database browser to open
the MongoDB the database.
2. Open the ssmbtoschedule entry and add a collection called `adminentries`
3. Add a record using the following JSON

```json
{
    "id": "YOUREMAILHERE@gmail.com"
}
```

*Please use the email address you are going to log into the application with.*

4. Go to [http://localhost:3000/admin](http://localhost:3000/admin) to check out
admin portal.

## Development

Before the first launch, download the dependencies using the following command:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
