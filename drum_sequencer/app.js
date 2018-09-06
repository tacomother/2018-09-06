let container = document.querySelector(".container");

function NoteLane() {
  this.label = "";
  this.count = 16;
  this.notes = [];
  this.curNote = 0;
  this.src = "";
  this.el = "";
  this.howler = null;

  this.init = function(label, source) {
    this.label = label;
    this.src = source;
    this.howler = new Howl({
      src: [`${this.src}`]
    });

    this.el = document.createElement("div");
    this.el.classList.add("note-lane");

    for (let i = 0; i < this.count; i++) {
      this.notes.push({
        engaged: false,
        el: this.createNoteElement()
      });
    }
  };

  this.createNoteElement = function() {
    let newNote = document.createElement("div");
    newNote.classList.add("note");
    this.createEventListener(newNote);
    return newNote;
  };

  this.createEventListener = function(el) {
    let self = this;
    return el.addEventListener("click", e => {
      self.handleClick(e.target);
    });
  };

  this.handleClick = function(e) {
    this.notes.map(note => {
      if (note.el === e) {
        note.engaged = !note.engaged;
        note.el.classList.toggle("engaged");
      }
    });
  };

  this.play = function() {
    this.howler.play();
  };

  this.loop = function() {
    let { curNote } = this;

    this.curNote++;

    if (this.notes[curNote].engaged) this.play();

    this.curNote >= this.count ? (this.curNote = 0) : this.curNote;

    console.log(`CurNote: ${curNote}`);
  };

  this.render = function() {
    container.appendChild(this.el);
    for (let i = 0; i < this.count; i++) {
      this.el.appendChild(this.notes[i].el);
    }
  };
}

let noteLanes = [];

let kick = new NoteLane();
let snare = new NoteLane();
let hihat = new NoteLane();
let tom = new NoteLane();
let cowbell = new NoteLane();
let openhat = new NoteLane();

noteLanes.push(kick, snare, hihat, tom, cowbell, openhat);

kick.init(
  "Kick",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808kick.wav"
);
kick.render();

hihat.init(
  "Kick",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808cl_hat.wav"
);
hihat.render();

snare.init(
  "Snare",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808snare.wav"
);
snare.render();

openhat.init(
  "Kick",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808op_hat.wav"
);
openhat.render();

tom.init(
  "Kick",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808lowtom.wav"
);
tom.render();

cowbell.init(
  "Kick",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/149103/808cowbell.wav"
);
cowbell.render();

(function loop() {
  kick.loop();
  snare.loop();
  hihat.loop();
  openhat.loop();
  tom.loop();
  cowbell.loop();
  setTimeout(loop, 250);
})();
