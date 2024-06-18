let madeGlobalEventHandlers = false; // Ensuring this is defined at the top level

let knobInUse = {
  id: "",
  initY: 0,
  currentKnob: {}
};

class Knob {
  constructor({
    id = "knob1",
    lowVal = 0,
    highVal = 100,
    value = 0,
    size = "medium",
    sensitivity = 1,
    type = "LittlePhatty",
    label = true,
    lblTxtColor = "silver"
  }) {
    this.id = id;
    this.lowVal = lowVal;
    this.highVal = highVal;
    if (value > highVal) {
      this.currentValue = highVal;
    } else if (value < lowVal) {
      this.currentValue = lowVal;
    } else {
      this.currentValue = value;
    }
    this.sensitivity = sensitivity;
    this.scaler = 100 / (this.highVal - this.lowVal);
    this.type = type;
    this.label = label;
    this.lblTxtColor = lblTxtColor;
    if (size == "xlarge") {
      this.size = 128;
    } else if (size == "large") {
      this.size = 85;
    } else if (size == "medium") {
      this.size = 50;
    } else if (size == "small") {
      this.size = 40;
    } else {
      this.size = 30;
    }
    this.imgFile = `${this.type}/${this.type}_${this.size}.png`;

    this.setUpKnob();
  }

  setUpKnob() {
    let div = document.getElementById(this.id);
    let imgDiv = document.createElement("div");
    let src = `${window.location.origin}/audioKnobs/knob_Images/` + this.imgFile;

    console.log(`Image source for knob ${this.id}: ${src}`);

    imgDiv.innerHTML = `<img draggable='false' style='pointer-events: none; transform: translateY(0px);' src=${src}>`;
    let lblDiv = document.createElement("div");
    div.appendChild(imgDiv);
    div.appendChild(lblDiv);
    imgDiv.style = `overflow: hidden; height: ${this.size}px; user-select: none;`;
    div.style = "position: relative; display: inline-block;";

    imgDiv.addEventListener(
      "mousedown",
      function(e) {
        knobInUse = {
          id: this.id,
          initY: e.pageY,
          value: this.currentValue,
          currentKnob: this
        };
      }.bind(this)
    );

    imgDiv.addEventListener(
      "touchstart",
      function(e) {
        knobInUse = {
          id: this.id,
          initY: e.targetTouches[0].pageY,
          value: this.currentValue,
          currentKnob: this
        };
      }.bind(this)
    );

    if (madeGlobalEventHandlers == false) {
      createGlobalEventHandlers();
      madeGlobalEventHandlers = true;
    }

    lblDiv.style =
      "text-align: center; width: 100%; margin: 0 auto; font-size: 12px";
    lblDiv.style.color = this.lblTxtColor;

    this.setImage();
  }

  setValue(val) {
    if (val > this.highVal) {
      this.currentValue = this.highVal;
      console.log(
        `you tried to set a value of ${val} which exceeded the upper limit of ${
          this.highVal
        }`
      );
    } else if (val < this.lowVal) {
      this.currentValue = this.lowVal;
      console.log(
        `you tried to set a value of ${val} which exceeded the lower limit of ${
          this.lowVal
        }`
      );
    } else {
      this.currentValue = val;
    }
    this.setImage();
    if (typeof knobChanged == "function") {
      knobChanged(this.id, this.currentValue);
    }
  }

  setImage() {
    let sum =
      (Math.floor(((this.currentValue - this.lowVal) * this.scaler) / 2) + 0) *
      this.size;

    let newY = `translateY(-${sum}px)`;
    document.getElementById(
      this.id
    ).childNodes[0].childNodes[0].style.transform = newY;

    if (this.label != false) {
      document.getElementById(
        this.id
      ).childNodes[1].innerHTML = this.currentValue;
    }
  }

  getValue() {
    return this.currentValue;
  }
}

window.Knob = Knob;

function createGlobalEventHandlers() {
  document
    .querySelectorAll("html, body")
    .forEach(node => (node.style.height = "100%"));

  document.body.addEventListener("mouseup", function(e) {
    resetKnobInUse(e);
  });

  document.body.addEventListener("touchend", function(e) {
    resetKnobInUse(e);
  });

  function resetKnobInUse() {
    knobInUse = {
      id: "",
      initY: 0,
      value: 0,
      currentKnob: null
    };
  }

  document.body.addEventListener("mousemove", function(e) {
    if (knobInUse.id != "") {
      if (e.pageY <= 10 || e.pageY >= document.body.clientHeight - 10) {
        knobInUse = { id: "", initY: 0, currentKnob: null };
        return;
      } else {
        knobInUse.currentKnob.currentValue = Math.round(
          knobInUse.value +
            ((knobInUse.initY - e.pageY) * knobInUse.currentKnob.sensitivity) /
              knobInUse.currentKnob.scaler
        );

        let max = knobInUse.currentKnob.highVal,
          min = knobInUse.currentKnob.lowVal;

        if (knobInUse.currentKnob.currentValue > max) {
          knobInUse.currentKnob.currentValue = max;
        } else if (knobInUse.currentKnob.currentValue < min) {
          knobInUse.currentKnob.currentValue = min;
        }
      }

      if (knobInUse.currentKnob.label != false) {
        document.getElementById(knobInUse.id).childNodes[1].innerHTML =
          knobInUse.currentKnob.currentValue;
      }

      let sum =
        (Math.floor(
          ((knobInUse.currentKnob.currentValue - knobInUse.currentKnob.lowVal) *
            knobInUse.currentKnob.scaler) /
            2
        ) +
          0) *
        knobInUse.currentKnob.size;
      let newY = `translateY(-${sum}px)`;
      document.getElementById(
        knobInUse.id
      ).childNodes[0].childNodes[0].style.transform = newY;

      if (typeof knobChanged == "function") {
        knobChanged(knobInUse.id, knobInUse.currentKnob.currentValue);
      }
    }
  });

  document.body.addEventListener("touchmove", function(e) {
    if (knobInUse.id != "") {
      if (
        e.targetTouches[0].pageY <= 10 ||
        e.targetTouches[0].pageY >= document.body.clientHeight - 10
      ) {
        knobInUse = { id: "", initY: 0, currentKnob: null };
        return;
      } else {
        knobInUse.currentKnob.currentValue = Math.round(
          knobInUse.value +
            ((knobInUse.initY - e.targetTouches[0].pageY) *
              knobInUse.currentKnob.sensitivity) /
              knobInUse.currentKnob.scaler
        );

        let max = knobInUse.currentKnob.highVal,
          min = knobInUse.currentKnob.lowVal;

        if (knobInUse.currentKnob.currentValue > max) {
          knobInUse.currentKnob.currentValue = max;
        } else if (knobInUse.currentKnob.currentValue < min) {
          knobInUse.currentKnob.currentValue = min;
        }
      }

      if (knobInUse.currentKnob.label != false) {
        document.getElementById(knobInUse.id).childNodes[1].innerHTML =
          knobInUse.currentKnob.currentValue;
      }

      let sum =
        (Math.floor(
          ((knobInUse.currentKnob.currentValue - knobInUse.currentKnob.lowVal) *
            knobInUse.currentKnob.scaler) /
            2
        ) -
          1) *
        knobInUse.currentKnob.size;
      let newY = `translateY(-${sum}px)`;
      document.getElementById(
        knobInUse.id
      ).childNodes[0].childNodes[0].style.transform = newY;

      if (typeof knobChanged == "function") {
        knobChanged(knobInUse.id, knobInUse.currentKnob.currentValue);
      }
    }
  });
}