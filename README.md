## SCILL JavaScript SDK

Most of the API code is auto generated by Swagger using our public OpenAPI specification.

This generator creates TypeScript/JavaScript client that utilizes [Fetch API](https://fetch.spec.whatwg.org/). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition should be automatically resolved via `package.json`. ([Reference](http://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html))

### Building NodeJS libraries

To build an compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Build client SDK

To build the client side (i.e. browser JS file) use this command:
```
num run build-client
```

This code uses browserify to build a `scill.js` file that you can include into the header of your web page directly
and use the code like you do in NodeJS:

```html
<script type="text/javascript" src="scill.js"></script>
<script type="text/javascript">
    let scill = new SCILLClient();
    let eventsApi = scill.getEventsApi("XnY,-AV+7dNGwrp!fVmP;96xAZ~,sqXJ]]8Htd4U[F");
    eventsApi.sendEvent({
        eventName: "instant-death",
        eventType: "single",
        userId: "123456",
        sessionId: "1234",
        metaData: {
            amount: 1
        }
    }).then(result => {
        console.log("Sending event: ", result);
    }).catch(error => {
        console.warn("Failed to send event", error);
    });
</script>
```

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @scillgame/scill-js --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
