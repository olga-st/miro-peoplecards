const token = '2c1b55c7-1dad-44f2-8149-b83c4521f29b'

rtb.onReady(() => {
    // subscribe on user selected widgets
    //rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget)
    getUsers()
})

// Get html elements for tip and text container
const tipElement = document.getElementById('tip')
const widgetTextElement = document.getElementById('widget-text')

async function getUsers() {
    httpRequest("GET", "/users", function () {
         var resp = this.response;
         for (var i in resp)
         {
              var id = resp[i].id;
              var name = resp[i].name;
              var email = resp[i].email;
              var pic = resp[i].picture.imageUrl;

              tipElement.style.opacity = '1';
              widgetTextElement.value = id + " " + email + " " + name + " " + pic;
         }
    });
}

async function greeting() {

    httpRequest("GET", "/greeting", function () {
        var resp = this.response;
        tipElement.style.opacity = '1';
        widgetTextElement.value = 'Response: ' + resp.id + " " + resp.content;
    });
}

function httpRequest(method, path, listener) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", listener);
    xhr.responseType = "json";
    xhr.open( method, "http://localhost:8080" + path ); // false for synchronous request
    xhr.send();
}