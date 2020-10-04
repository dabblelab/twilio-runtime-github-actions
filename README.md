# Twilio Runtime Github Actions

This is a template for a Github Actions workflow that deploys Twilio Runtime functions and assets when code changes are pushed to a Github repository.

> NOTE: You'll need a [Twilio Account](https://twilio.com) and a [Github Account](https://github.com) to complete the following steps.

## STEPS

1. [Fork this repository on github](https://github.com/dabblelab/twilio-runtime-github-actions/fork)
2. Get your Twilio Account SID, API Key, and API Secret
3. Add `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY`, `TWILIO_API_SECRET` secrets in Github
4. Review the Github Actions Flow
5. Push changes to test the Actions Flow

## Getting your Twilio Account SID, API Key, and API Secret

1. Login to the [Twilio Console](https://www.twilio.com/console)
2. Note your Account SID is located on the right-side of the console dashboard
3. [Create a new API Key](https://www.twilio.com/console/project/api-keys/create)
    - Give the key a name and leave the key type as `Standard`
    - Copy the `SID` (which is the API Key value)
    - Copy the `SECRET`

    > IMPORTANT: After clicking the 'Done' button you will no longer be able to access the SECRET value.

## Add `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY`, `TWILIO_API_SECRET` secrets in Github

You'll need to provide an `Account SID`, `API Key`, and `API Secret` that Github can use to access your Twilio account. To do that you'll setup secrets for the repository. 

1. Go to the repository settings for the forked repo
2. Click the `Secrets` link
3. Add three new secrets using the names in the table below.

|Name               |Value               |
|-------------------|--------------------|
|TWILIO_ACCOUNT_SID |Twilio Account SID  |
|TWILIO_API_KEY     |Twilio API Key      |
|TWILIO_API_SECRET  |Twilio API Secret   |

> NOTE: The secret values are used by the Actions workflow.

## Review the Github Actions Flow
The Github Actions Flow is located in `.github/workflows/main.yml`. This is a text file in [YAML Format](https://en.wikipedia.org/wiki/YAML) that defines when the workflow is triggered and the job it will perform. 
The parts to note in the file are:

1. The workflow is triggered when code is pushed to the master branch.

```yaml
on:
  push:
    branches: [ master ]
```

2. This workflow contains a single job called "build" that runs using the `ubuntu-latest` job runner.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

3. Within the job, there are three steps. The first step sets up Node.js. The second step installs npm dependancies, and the final step installs the Twilio CLI with the required CLI plugin, then deploys the code.

4. The last step install the Twilio CLI and the serverless plugin then uses the secrets we setup to deploy our code.

```yaml
      - name: Install twilio cli and run deploy command
        env:
         TWILIO_ACCOUNT_SID: ${{ secrets.TWILIO_ACCOUNT_SID }}
         TWILIO_API_KEY: ${{ secrets.TWILIO_API_KEY }}
         TWILIO_API_SECRET: ${{secrets.TWILIO_API_SECRET}}
        run: npm install twilio-cli -g && twilio plugins:install @twilio-labs/plugin-serverless && twilio serverless:deploy --force
```
## Push changes to test the flow

At this point you can simply push code changes to trigger the workflow.

To test this:

1. clone your repository to your local computer. 

```
git clone {your-github-repo-url}
```

2. open the `functions/hello-world.js` file and change the message "Hello World" to "Hello Universe!". 

3. Commit and push the change.

```
git add .
git commit -m "update hello-world.js"
git push
```

> NOTE: If you open the repository page in your web browser and view the actions tab you should notice the workflow has been triggered.

4. After the job completes (1-2 minutes usually) login to your Twilio Console and view [services in your functions console](https://www.twilio.com/console/functions/overview/services), you should now see a new service named `twilio-runtime-github-actions`.
