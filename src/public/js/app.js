//this(in public directory) runs in frontend
//files in public directory are showing to users
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // add function at last in param to executed by backend
  // functions run in front, executed by backend
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
