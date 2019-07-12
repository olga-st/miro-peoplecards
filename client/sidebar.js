const token = '2c1b55c7-1dad-44f2-8149-b83c4521f29b'

rtb.onReady(() => {
    // subscribe on user selected widgets
    //rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget)
    getUsers()
})

const userlist = document.getElementById('userlist').getElementsByTagName("ul")[0];

async function getUsers() {

    httpRequest("GET", "/users", function () {

        clearUserList();

        var resp = this.response;
        for (var i in resp)
        {
            addUserToList(resp[i]);
        }
    });
}

function addUserToList(data) {
    var id = data.id;
    var name = data.name;
    var email = data.email;
    var pic = data.picture.imageUrl;

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    li.onclick = function() {
        userChosen(name, email, pic);
    }
    userlist.appendChild(li);
}

function clearUserList() {
    var lis = userlist.getElementsByTagName("li");
    for(var i = lis.length - 1; i >= 0; i--) {
        userlist.removeChild(lis[i]);
    }
}

async function userChosen(name, email, picture) {
    var x = 0;
    var y = 0;

    await rtb.board.widgets.create({
        type: "SHAPE",
        x: x,
        y: y,
        style: { shapeType: 3, backgroundColor: "#fef445", backgroundOpacity: 1, borderColor: "#1a1a1a", borderWidth: 2},
        width: 200,
        height: 400
    });

    await rtb.board.widgets.create({
        type: "IMAGE",
        url: picture,
        x: x + 10,
        y: y - 100,
        width: 160,
        height: 160
    });

    await rtb.board.widgets.create({
        type: "SHAPE",
        text: name,
        x: x + 10,
        y: x + 20,
        width: 160,
        height: 180,
        style: {
            shapeType: 3,
            backgroundColor: "transparent",
            backgroundOpacity: 1,
            bold: 0,
            borderColor: "transparent",
            fontFamily: 0,
            highlighting: 0,
            italic: 0,
            strike: 0,
            textAlign: "l",
            textColor: "#1a1a1a",
            underline: 0
        }
    });

    rtb.showNotification('Done!')
}

function httpRequest(method, path, listener) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", listener);
    xhr.responseType = "json";
    xhr.open( method, "http://localhost:8080" + path ); // false for synchronous request
    xhr.send();
}