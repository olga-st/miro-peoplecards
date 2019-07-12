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
    li.setAttribute('draggable', true);
//    li.onclick = function() {
//        userChosen(name, email, pic);
//    }
    li.addEventListener('dragend', function(e) {
        console.log(e);
        var x = e.pageX;
        var y = e.pageY;
        userChosen(x, y, name, email, pic);
    });

    li.addEventListener('dragstart', function() {console.log("dragstart")}, false);
            li.addEventListener('dragenter', function() {console.log("dragenter")}, false)
            li.addEventListener('dragover', function() {console.log("dragover")}, false);
            li.addEventListener('dragleave', function() {console.log("dragleave")}, false);
            li.addEventListener('drop', function() {console.log("drop")}, false);
            li.addEventListener('dragend', function() {console.log("dragend")}, false);

    userlist.appendChild(li);
}

function clearUserList() {
    var lis = userlist.getElementsByTagName("li");
    for(var i = lis.length - 1; i >= 0; i--) {
        userlist.removeChild(lis[i]);
    }
}

async function userChosen(x, y, name, email, picture) {
    var viewport = await rtb.board.viewport.getViewport();

    var coef = viewport.height / window.innerHeight;

    x = x * coef + viewport.x;
    y = y * coef + viewport.y;

    height = viewport.height * 0.2;
    width = height * 0.5;

    await rtb.board.widgets.create({
        type: "SHAPE",
        x: x,
        y: y,
        style: { shapeType: 3, backgroundColor: "#fef445", backgroundOpacity: 1, borderColor: "#1a1a1a", borderWidth: 2},
        width: width,
        height: height
    });

    await rtb.board.widgets.create({
        type: "IMAGE",
        url: picture,
        x: x,
        y: y - height * 0.25,
        width: width * 0.8,
        height: width * 0.8
    });

    await rtb.board.widgets.create({
        type: "SHAPE",
        text: name,
        x: x,
        y: y + height * 0.25,
        width: width * 0.8,
        height: height * 0.5,
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
            textAlignVertical: "t",
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