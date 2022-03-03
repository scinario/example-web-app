// Example templates. In real apps, use some rendering library
const templates = {
    error: function(message){
        return `<div class="error-message">
            An error occured. The message was:
            <p>${message}</p>
            </div>`
    },
    success: function(username, users){
        return `<div class="headline">You're signed in as <b>${username}</b></div>
        <p>Here are some other users in your instance:</p>
        <ul>
        ${[].concat(users).map( function(user){
            return `<li>${user.username}</li>`
        }).join('')}
        </ul>
        `
    }
}

const setup = async function(){

    // Set parameters
    // This is only necessary when not hosted on SCNARIO SaaS
    //  or when calling the API from a different origin
    await scinario.initialize({host: SCINARIO_INSTANCE_URL, client: SCINARIO_CLIENT_NAME});

    const main = document.querySelector('main');
    if(!main) return;

    // Get user session
    scinario.signin({username: SCINARIO_USER_NAME, password: SCINARIO_PASSWORD})
        .then( async record => {

            // Once authenticated you can query 
            // every model, for example other users
            const model = new scinario.Model('core/Users');
            const allUsers = await model.find();

            // Update UI
            main.innerHTML = templates.success(record.username, [].concat(allUsers.records) );
        })
        .catch( error => {

            // When error occurs update UI
            main.innerHTML = templates.error(error.message);
        })
    


}

const loadSDK = function(){
    // Create a script tag dynamically. 
    // Normally you would put a script tag into index.html
    // when SCINARIO instance url is known in advance
    var script = document.createElement("script");
    script.src = SCINARIO_INSTANCE_URL + '/sdk/scinario-core-v2.js';
    // When 
    script.onload = setup;

    // Append script to body to get started
    document.body.appendChild(script);
}

// Kick off
loadSDK();