# Example Backend

This is a basic example showing how to serve access tokens to a client application using NodeJS

First install dependencies in the root folder:
```
npm install
```

Then, build the libraries with:
```
npm run build
```

This creates a `dist` folder with the compiled JS files.

After that, cd into the example folder and build and run the sample with Node
```
cd examples/Example\ Backend
npm install
node index.js
```

This will start a simple webserver at http://localhost:80

To generate an access token open this URL in your browser:
http://localhost/scill/generate-access-token?sessionid=xyz

It will return something like that:
```
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFwcF9pZCI6IjU5Mzg1MjYyODg1MzU4Nzk3MCIsInVzZXJfaWQiOiIifSwiYXVkIjoiVVMgU0NJTEwiLCJleHAiOjE2MDEzODU4NDcsImlhdCI6MTYwMTM4MjI0NywiaXNzIjoidXMtZGV2LnNjaWxsZ2FtZS5jb20iLCJuYmYiOjE2MDEzODIyMzJ9.Acplg5bzMJ2G1ytOr314i0H8YM7GX4hr5HW0jT7NvGbP4xxlj33OWWb1UHB5Cnbuz4lg8PMM-cGx8vIy3LLuHVpQy-EjtYLCcadqI-QDV14IfNwxlMSx4u0BeBKvDdxfVRbRU8Un9mivS9wvvSznqz0AjnW0SOJA9x5wrGv5u8yNw0lNeENbDYRP-CyYBYt9jPknWzVeIa6xAYXRkqRFwq3e2GijVfLKutPqEsyMZRDotSdctkHq1cJVrI-fHN6y1p2hm_iLhsoKaJYgfsVYq-WCnvjRNEK9FrOHsl6eLDpXT913M6wcX0dlaLsVgyy9OplDrm7DopGs7snt8uJ1bw"
}
```

The provided sessionid is ignored in the example code and the user id that is provided to create the access token for is
hard coded. However, in your code you will need to implement a mechanism based on your auth/session system. 
