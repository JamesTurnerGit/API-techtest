# API tech test 

## Installation
### Pre-requisites
* LTS version of NodeJS, and NPM: https://nodejs.org/

### Usage
Start the mock API server:
`npm install && npm run start`
Run the tests with 
`npm test`

## Tasks

Using the provided API:

1. Retrieve all fixtures. 
    1. Assert that there are 3 fixtures within the returned object.
    1. Assert that each of the 3 fixtures has a fixtureId value.
1. Using the model guide in `apiDocs.html`, store a new fixture in the database.
    1. Get the new fixture.
    1. Assert, within the `teams` array, that the first object has a `teamId` of 'HOME'.
1. To simulate latency within systems, there is an intentional, random delay to store a new fixture on the server. 
    1. Bearing the delay in mind, create a new fixture and then retrieve it as soon as it's available
1. Create and delete a new fixture.
    1. Assert that the fixture no longer exists.

## Overall comments
Tasks were completed as listed; in an actual office scenario this tests would not be sufficient for the api.
In particular it'd be great to have some node ENV files but that would take co-ordination with dev to be sure both tests and server were using the values.
If running in a real world situation, depending on server load and connection quality, tests have a chance of intermittently failing, to reduce false positives tests would have to be set to retry.

## Bugs
* you can have multible fixtures with the same id (assumption that non-unique id's are not allowed)
* you can make malformed fixtures and they will enter the "db" but be unrecoverable
* The docs suggest you need a int for ID whereas the data structure requires strings to be recoverable

## task comments
1. 1. 
    1. because this step fell under "all fixtures" the test was done here, in a normal situation you'd do a at least basic check in all, but at least one full deep check on a fixture
1. guide not complete/accurate
    1. again would normally check in both "all fixtures" and "fixture by id"
    1. tested full fixture as it was actually simpler
1. we need a cleanup step here, whereas it would be a much cleaner test if we could just restore the db to it's initial state directly rather than relying on the systems under test.
    1.The benefit of using JS is that it's already designed to handle async really well; this was literally free to deal with
1. there is some overlap with the cleanup on the post stage; in an ideal situation, given we're already able to restore the DB to a known point, we'd just delete an existing record instead of also creating a new one
