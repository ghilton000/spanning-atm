# ATM project for Spanning

### Basic requirements

Provide a basic ATM (Automated Teller Machine) implementation.  At a minimum, this program should offer the following features:

  1. Enter a PIN to identify a unique customer
  2. Query and show the current account balance
  3. Withdraw cash
  4. Make a deposit

### Implementation
 
I assumed the app would be used at a typical ATM kiosk with a fixed-size screen, although I did add some
responsiveness for demonstration. The buttons are large for kiosk use. By no means do I consider his to be
a polished design.

I hope the controls are self-explanatory. There are three PINs you can use: `1111`, `2222`, and `3333`.
 
I sprinkled TODOs around the code where there are some other obvious things to be added.

### Running the Application

Clone the `spanning-atm` repository using git:

```
git clone https://github.com/ghilton000/spanning-atm
```

Start the app using:

```
cd spanning-atm
npm start
```

Now browse to the app at [http://localhost:8000](http://localhost:8000).

If you already have something running on port 8000, edit the `package.json` file and change
the port number in the `start` script

## public directory Layout

```
public/
  app/                    --> the source files for the application
    components/           --> application elements written as Angular components
      confirm-deposit/    --> a modal dialog for confirming deposit amounts
      notice/             --> a modal dialog for displaying application notices
      pin/                --> a modal dialog for entering a PIN
    controllers/          --> application elements written as Angular controllers
      cash/               --> the controller and view for the Withdraw Cash page
      deposit/            --> the controller and view for the Deposit page
      home/               --> the controller and view for the Home page
    filters/              --> custom Angular filters
      dollars.js          --> formats amounts in cents for display as dollars and optional cents
    services/             --> injectable Angular services to support the components and controllers
      lodash.js           --> service for accessing the lodash library
      notice.js           --> service for displaying notice dialogs
    app.css               --> stylesheet
    app.js                --> main application module
    config.js             --> configuration function
  bower_components/
  index.html              --> the main html file of the app
```
