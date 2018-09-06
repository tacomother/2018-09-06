let container = $("#demo"),
  _sentenceEndExp = /(\.|\?|!)$/g;

function machineGun(text) {
  let words = text.split(" "),
    tl = new TimelineMax({ delay: 0.6, repeat: 2, repeatDelay: 4 }),
    wordCount = words.length,
    time = 0,
    word,
    element,
    duration,
    isSentenceEnd,
    i;

  for (i = 0; i < wordCount; i++) {
    word = words[i];
    isSentenceEnd = _sentenceEndExp.test(word);
    element = $("<h3>" + word + "</h3>").appendTo(container);
    duration = Math.max(0.5, word.length * 0.08);
    if (isSentenceEnd) {
      duration += 0.6;
    }
    TweenLite.set(element, { autoAlpha: 0, scale: 0, z: 0.01 });
    tl.to(
      element,
      duration,
      { scale: 1.2, ease: SlowMo.ease.config(0.25, 0.9) },
      time
    ).to(
      element,
      duration,
      { autoAlpha: 1, ease: SlowMo.ease.config(0.25, 0.9, true) },
      time
    );
    time += duration - 0.05;
    if (isSentenceEnd) {
      time += 0.6;
    }
  }
}

machineGun(
  "These words are constantly animating in your face to suck you in and leave you hanging for what comes next. Can you handle the awesomeness? Or are you left quivering in fear? It's only text, silly. Longer words stay on the screen for a greater duration. Each sentence ends with a dramatatic pause. Yes, that pause. The End"
);
