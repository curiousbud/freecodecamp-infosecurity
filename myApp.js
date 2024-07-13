const express = require("express");
const helmet = require("helmet");
const app = express();
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// app.use(helmet.hidePoweredBy()); //to hide potentially dangerous information using helmet.hidePoweredBy() middleware
// app.use(helmet.frameguard({ action: "deny" })); //mitigate the risk of clickjacking using helmet.frameguard() middleware
// app.use(helmet.xssFilter()); //mitigate th risk of cross site scripting (xss) attacks using helmet.xssfilter()
// app.use(helmet.noSniff()); //Avoid Inferring the Response MIME Type with helmet.noSniff()
// app.use(helmet.ieNoOpen()); //Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true })); //Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
// app.use(helmet.dnsPrefetchControl()); //Disable DNS Prefetching with helmet.dnsPrefetchControl()
// app.use(helmet.noCache()); //Disable Client-Side Caching with helmet.noCache()
// app.use(  //Set a Content Security Policy with helmet.contentSecurityPolicy()
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       "script-src": ["'self'", "trusted-cdn.com"],
//     },
//   })
// );

app.use(
  helmet({
    frameguard: {
      // configure
      action: "deny",
    },
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        "script-src": ["'self'", "trusted-cdn.com"],
      },
    },
    dnsPrefetchControl: false, // disable
  })
);

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
