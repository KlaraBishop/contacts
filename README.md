This project is a simple contacts application that allows you store, add, and delete contacts.

It is made using React, Express, and Node, and deployed to fly.io.

The project is currently hosted on the url: https://aged-sound-1664.fly.dev/

Current endpoints for the backend API are:

GET '/' - Redirects to this readme

GET '/info' - Gets information about the data currently stored in the database

GET '/contacts' - Gets all contacts currently in the database

GET '/contacts/{id}' - Gets a specific contact based on the id provided in the URL

POST '/contacts' - Adds a new contact to the database based on info provided in the body of the request.
                   Data must be provided in the format of an object and must contain a "name" value and a "number" value. If either field is missing the API will respond with a 400 status code.  The "name" value must also be unique or a 400 status code will also be sent.  An id for the entry will be provisioned by the API.

                   An example of an acceptable object sent in the body of a request:
                   {
                        "name": "Phillip J Fry",
                        "number": "555-2000" 
                   }