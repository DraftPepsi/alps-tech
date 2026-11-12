const audio = document.getElementById("audio");
const status = document.getElementById("status");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
const personName = document.getElementById("personName");
const subtitle = document.querySelector(".subtitle");

const params = new URLSearchParams(window.location.search);
const audioId = (params.get("id") || "carl").trim().toLowerCase();

// Add each person's details here.
const people = {
  joeffrey: {
    name: "Para sayo Daddy Joeffrey!",
    audio: "joeffrey.wav",
    cover: "joeffrey.jpg",
    subtitle: "Yo man! Maraming salamat sa pakikisama mo sakin. Dahil sayo, di ko nafeel na out of place ako dahil pinansin mo ko agad nung first week ko. Feeling ko belong ako sa ALPS hahaha. Congrats sa baby! More blessings to come, and I wish you and your family good health!"
  },
  emman: {
    name: "Yooooo Par",
    audio: "emman.wav",
    cover: "emman.jpg",
    subtitle: "Salamat sayo par! Ang saya niyo kakulitan sa Tech, at kakaibang dedikasyon sa trabaho. Andaming nawala pero di bumaba ang quality ng trabaho niyo par. Maipagpatuloy niyo sana to!"
  },
  ericka: {
    name: "Sup Irika",
    audio: "ericka.wav",
    cover: "ericka.jpg",
    subtitle: "Maraming salamat sayow, masaya ka kakwentuhan, at palaging andyan ka para makinig tsaka makasama sa kakulitan. God bless sa iyo at magresign ka na din! It's time HAHAHA"
  },
  justin: {
    name: "Wazap Scatter Lord",
    audio: "justin.wav",
    cover: "justin.jpg",
    subtitle: "Ano na par, kailan ka magreresign? HAHAHA! Maraming salamat men, grabe saya niyo kakulitan dyan sa Tech Sol kaya nalulungkot ako na aalis din ako, pero sana di kayo magbago, ang saya magtrabaho kapag kumpleto kayo eh, ang saya lagi. Hahaha."
  },
  janine: {
    name: "Madam J",
    audio: "janine.wav",
    cover: "janine.jpg",
    subtitle: "Best Employee, sheesh. Maraming salamat sa'yo madam. Kung wala ka, wala din daw ALPS sheeeeeeeesh."
  },
  jj: {
    name: "Devil Spawn",
    audio: "jj.wav",
    cover: "jj.jpg",
    subtitle: "Mamimiss ko lahat ng katarantaduhan mong hinayupak ka. HAHAHAHA. Wag kang puputi, baka bumait ka pre. Maraming salamat sayo men, kahit puro ka kagaguhan ang saya mo pa din kasama! Lovelots mwamwa chupchup xoxo"
  },
  carl: {
    name: "Sup Carl",
    audio: "carl.wav",
    cover: "carl.jpg",
    subtitle: "Maraming salamat sayo, nang dahil sayo, hindi kami napapagalitan. HAHA. Sana wag kang magbago, ibang iba yung kabaitan mo saming lahat, sobrang appreciated ka namin. Maraming salamat Carl! Lovelots <3 <3"
  },
  gelo: {
    name: "What if bumalik si Matt?",
    audio: "gelo.wav",
    cover: "gelo.jpg",
    subtitle: "Charot. HAHAHA. Miss na miss na kita sa SDO, sobrang tumahimik nung nawala kayo ni Joeff. Pero okay lang, kailangan ka sa baba eh. Gusto ko lang sabihin na bilib na bilib ako sa trabaho mo, sobrang ganda at malinis lagi. Maraming salamat sayo! "
  },
  ivy: {
    name: "UST Professor and Muslim Lover",
    audio: "ivy.wav",
    cover: "ivy.jpg",
    subtitle: "Isa lang kasi piliin mo! Or iisa lang yan? hmmmmmmm. Maraming salamat Ivy! Saya mo kausap, kahit alam ko minsan napipikon ka na sakin. HAHAHA. Pagpray ko na sana gumaan na workload mo, at maging masaya na ang buhay mo. Yun lang. TYSMYKILCN - Anak ni Melai"
  },
  josh: {
    name: "The Tondo Pakboi",
    audio: "josh.wav",
    cover: "josh.jpg",
    subtitle: "Syempre joke lang, alam kong sobrang loyal ka sa jowa mo. Maraming salamat tol! Sobrang saya niyong kasama dyan sa Technical Solutions! Ikaw na susunod ha! Antayin kita. HAHAHAHA"
  },
  menchie: {
    name: "The Ultimate Chef",
    audio: "menchie.wav",
    cover: "menchie.jpg",
    subtitle: "Mamimiss ko mga luto at dessert mo madam Menchie. Huhuhu. Pasensya na, lagi kitang binibigyan ng sakit sa ulo. HAHA. Pero maraming salamat sayo, kasi tinitiis mo kakulitan ko kahit minsan sobra na."
  },
  kriss: {
    name: "The next QA Lead sheesh",
    audio: "kriss.wav",
    cover: "kriss.jpg",
    subtitle: "Kaya mo to Kriss, sobrang bilib ako sayo! Deserve mo tong promotion haha. Maraming salamat Kriss, wala akong masabi sa work ethic mo. Sobrang sipag mo, at sana di 'to magbago kapag lead ka na. Ang masasabi ko lang talaga is sobrang swerte ng ALPS sayo. Walang kaya pumantay sa ginagawa mong trabaho as QA, at dedication mo matuto at mag deep dive sa QA Automation. Wag ka magbabago ha! Maraming salamat sayo! Love lots!"
  },
  joemar: {
    name: "SHS Hunter",
    audio: "joemar.wav",
    cover: "joemar.jpg",
    subtitle: "Tol tigil mo na paghunting ng senior high. HAHAHA. Maraming salamat men, sobrang nalulungkot ako na kailangan ko na kayo iwan nila JJ at Ken sa ALPS, pero sana magkita pa tayo muli. Kapag nakadali ka ng SHS, sabihan mo agad kami ha. Di ka namin ijujudge."
  },
  april: {
    name: "Hallue Madam!",
    audio: "april.wav",
    cover: "april.jpg",
    subtitle: "Di tayo nakakapag-usap masyado, pero kung hindi dahil sainyo sa sales, wala din ALPS. Maraming salamat sa dedikasyon niyo sa trabaho, at kahit minsan feeling ko ayaw mo na, pinupush mo pa din para di kami mawalan ng trabaho. Salamat!"
  },
  ann: {
    name: "Wazap Madam Ann!",
    audio: "ann.wav",
    cover: "ann.jpg",
    subtitle: "Maraming salamat sainyo ni ma'am Kim, kahit minsan nakakaistorbo ako sainyo tuwing working hours, never niyo ko sinumbatan. HAHAHAHA. I wish you and you family good health and a prosperous lifestyle tsaka healthy marriage, yun lang!"
  },
  kim: {
    name: "Pakape ka naman madam Kim!",
    audio: "kim.wav",
    cover: "kim.jpg",
    subtitle: "Tim Hortons? G? HAHAHA. Madam Kim maraming salamat sainyo ni ma'am Ann, lagi niyo ko dyan pinag iinterview kahit alam kong nakakaistorbo ako. HAHAHA. Pagdadasal ko na sana umunti na ung workload mo para less stress sa'yo, tsaka stay healthy!"
  },
  shane: {
    name: "Kailan ka mag-aapply? HA?",
    audio: "shane.wav",
    cover: "shane.jpg",
    subtitle: "Apply ka na kaya? HAHAHAHA. Miss na kita dito sa office Shane, feeling ko isa din sa mga rason kaya gusto ko na umalis agad kasi di ako sanay na hindi kayo magkasama ni Kriss dito. Malungkot ako na umalis ka, pero at the same time masaya ako na nakalaya ka na sa ALPS HAHAHA. Sana makawork ko pa kayo ulit ni Kriss, lalo ka na. Sobrang galing mo sa QA eh. Maraming salamat sa pagtitiis sakin, alam ko di ako ganun kagaling na lead pero sana marami akong naitulong sainyo during my time as your lead and sana marami ka din natutunan. Yun lang! Love lots <3 <3"
  },
  novel: {
    name: "Sorry nauna ako",
    audio: "novel.wav",
    cover: "novel.jpg",
    subtitle: "Di mo ba inexpect? HAHAHAHAHAHA. Sorry na, may dumating na offer eh. Miss ko na kayo makasama nila Carlo at Kurt, sana maulit. Maraming salamat sayo, alam ko tinitiis niyo lang ugali ko HAHAHAHA. Pero ayun nga, ang saya niyo kasama. Best wishes to you and sana maging masaya ka sa work, para di ka laging stressed. HAHAHA"
  },
  nica: {
    name: "HALAAAAAAAAA",
    audio: "nica.wav",
    cover: "nica.jpg",
    subtitle: "Sorry nauna ako magresign, di ko naman inexpect na magkakaroon ako ng magandang offer. Hahaha. Maraming salamat Nica! Sobrang saya niyong kasama kahit panandalian lang no, I think less than 6 months lang? Tsaka salamat din sa pagtitiis sa ugali ko. HAHAHA. Sana mabawasan ka na ng trabaho! Dami mo ginagawa lagi eh."
  },
  mela: {
    name: "The Last Dance",
    audio: "mela.wav",
    cover: "mela.jpg",
    subtitle: "Dzai, tama yan, bat mo papayagan jowa mo mag last dance sa ibang babae diba?!?!?!?! HAHAHA. Maraming salamat Mela! Kahit saglit lang tayo naging magkawork, saya mo kasama at kausap, sobrang bait mo din, buti nalang di ka nahawa kay JJ. HAHAHAHA"
  },
  james: {
    name: "ANO DOI? ANO ANO ANO DOI?",
    audio: "james.wav",
    cover: "james.jpg",
    subtitle: "GAGI KA MEN, TANGINA KUNG KAILAN CLOSE NA TAYO, AALIS NA KO BIGLA. HAHAHAHA. Sana maging magkawork tayo ulit, sobrang saya mong katrabaho, tapos nagkakaintindihan pa tayo. HAHAHAHA. Maraming salamat James, pag nabasa mo to, naprint mo na yung QR panigurado HAHAHAHAHAHA"
  },
  marin: {
    name: "Sup Marin",
    audio: "marin.wav",
    cover: "marin.jpg",
    subtitle: "Sup sup sup, saglit ko lang ikaw nakasama pero masaya ka naman kausap, tsaka g na g ka anywhere HAHAHA. Keep up the good work!"
  },
  ken: {
    name: "ULOL WALANG MOUSE",
    audio: "ken.wav",
    cover: "ken.jpg",
    subtitle: "Sayo nalang riser ko, yung mouse bawal. HAHAHAHA. Salamat boi! Saglit lang kita nakasama pero naging masaya naman, kahit sobrang busy niyo na dyan. HAHAHAHA. Pagpatuloy mo lang men, basta wag ka magshashabu. Pero kung gusto mo talaga mouse ko, isubo mo nalang ti-"
  },
  railey: {
    name: "The Spotter",
    audio: "railey.wav",
    cover: "railey.jpg",
    subtitle: "Tigil mo kakaspot ng babae kung saan saan. HAHAHAHA. Maraming salamat Railey! Saglit lang kita nakasama, pero ang saya mo kakwentuhan, dami mong kagaguhan sa buhay. HAHAHAHAHAHA. Pagpatuloy mo lang yung ganyang pagtratrabaho, sobrang kailangan ka dito sa ALPS. Salamat salamat salamat!"
  },
  mj: {
    name: "The Braider",
    audio: "mj.wav",
    cover: "mj.jpg",
    subtitle: "Nudaw? HAHAHAHA. Imji salamat sa pagtitirintas sa buhok ko. HAHAHAHA. Salamat din kasi ikaw tigaabot ng Milo kapag andyan ka, wag ka na mag-aral, magwork ka nalang. Char. I wish you the best sa studies mo! Kaya mo yan!"
  },
  renz: {
    name: "The Loyalist",
    audio: "renz.wav",
    cover: "renz.jpg",
    subtitle: "Stay loyal sa imong asawa, wag ka papatinag. HAHAHA. Ikaw pangontra namin kay JJ. Si JJ kasi pokers eh. Maraming Salamat Renz! Saglit lang tayo nagsama pero enjoy ka naman kausap. Hahaha"
  },
  zedrick: {
    name: "Mommy Z",
    audio: "zedrick.wav",
    cover: "zedrick.jpg",
    subtitle: "Mamimiss ko duster mo. HAHAHAHA. Salamat boi! Pagbutihan mo lang pagtatrabaho. Sorry wala ako masyadong masabi, sobrang saglit natin nagsama eh. HAHAHAHAHAHA"
  },
  chelsea: {
    name: "1/3 ng Huntrix",
    audio: "chelsea.wav",
    cover: "chelsea.jpg",
    subtitle: "HAHAHAHAHAHA Di ko malilimutan costume niyo. Maraming Salamat at dumating kayo sa ALPS. Yun lang."
  },
  jona: {
    name: "1/3 din ng Huntrix",
    audio: "jona.wav",
    cover: "jona.jpg",
    subtitle: "HAHAHAHAHAHA ganun din di ko malilimutan costume niyo. Maraming Salamat at dumating kayo sa ALPS. Yun lang."
  },
  hannah: {
    name: "This is HAAAAAANZ!",
    audio: "hannah.wav",
    cover: "hannah.jpg",
    subtitle: "HAHAHAHA. Sorry 1 month mo lang ako naging TL, pero wag ka mag-alala andyan naman si Kriss. Salamat sayo dahil nakikinig ka sa mga tinuturo ko sayo, masipag ka magwork, magaling ka sa trabaho, at mabait. Pagpatuloy mo lang yan! Kapag dumating na yung time na makakawork ko ulit kayo, sana kayo ulit nasa team ko. Maraming salamat!"
  },
  adnil: {
    name: "Boss Adnil",
    audio: "adnil.wav",
    cover: "adnil.jpg",
    subtitle: "Hello boss Adnil, maraming salamat po sa pagtanggap sakin sa ALPS. Alam ko po na saglit lang din po ako sa kompanya, pero sana marami po akong naitulong sa QA. I wish the company the best, and I do hope na in the near future, magkaroon po ang ALPS ng sariling building."
  },
  dennison: {
    name: "Big Boss Dennison",
    audio: "dennison.wav",
    cover: "dennison.jpg",
    subtitle: "Boss Den! Maraming salamat sa iyong guidance, marami din po akong natutunan sainyo, di lang as a QA Lead but also as a person. I wish the company the best, and also inom tayo boss pag nasa manila na po kayo ulit. Hahaha. Puntahan ko po kayo sa office."
  },
  eric: {
    name: "The Joker",
    audio: "eric.wav",
    cover: "eric.jpg",
    subtitle: "Wassup Boss Eric! Maraming salamat po sainyo! Hahahaha. Hindi nagiging boring after hours ng work kapag may painom po kayo. Hahaha. Wish you all and the company the best po boss Eric! Thanks po ulit!"
  },
  cassie: {
    name: "To Cassie",
    audio: "cassie.wav",
    cover: "cassie.jpg",
    subtitle: "ALPS is an enterprise service management provider that empowers service organizations deliver extraordinary services and make clients happy through Revolutionary Technologies, Expert Implementation, Real Enablement, Client Success that truly cares. We Eat, Sleep & Breathe ESM"
  }
};

const person = people[audioId];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function setPlayButton() {
  playButton.textContent = "";
  playButton.classList.remove("is-playing");
  playButton.setAttribute("aria-label", "Play audio");
}

function setStopButton() {
  playButton.textContent = "";
  playButton.classList.add("is-playing");
  playButton.setAttribute("aria-label", "Stop audio");
}

function resetAudio() {
  audio.pause();
  audio.currentTime = 0;

  progress.value = 0;
  currentTime.textContent = "0:00";

  setPlayButton();
}

function showError(message) {
  audio.pause();

  playButton.disabled = true;
  progress.disabled = true;

  setPlayButton();

  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";

  status.textContent = message;
}

if (!person) {
  personName.textContent = "Audio unavailable";

  if (subtitle) {
    subtitle.textContent = "This audio message is unavailable.";
  }

  showError("Invalid audio link.");
} else {
  personName.textContent = person.name;

  if (subtitle) {
    subtitle.textContent = person.subtitle || "Your audio message";
  }

  document.title = `${person.name} - Audio Message`;

  audio.src = `audio/${person.audio}`;
  cover.src = `covers/${person.cover}`;
  cover.alt = `${person.name}'s audio cover`;

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    status.textContent = "Tap play to listen";

    playButton.disabled = false;
    progress.disabled = false;
  });

  audio.addEventListener("canplay", () => {
    playButton.disabled = false;
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progress.value) / 100) * audio.duration;
    }
  });

  playButton.addEventListener("click", async () => {
    if (!audio.paused) {
      resetAudio();
      status.textContent = "Audio stopped";
      return;
    }

    try {
      audio.currentTime = 0;

      status.textContent = "Starting audio...";
      await audio.play();
    } catch (error) {
      console.error("Playback error:", error);
      status.textContent = "Playback failed. Please try again.";
    }
  });

  audio.addEventListener("play", () => {
    setStopButton();
    status.textContent = "Playing your audio message";
  });

  audio.addEventListener("pause", () => {
    setPlayButton();
  });

  audio.addEventListener("ended", () => {
    resetAudio();
    status.textContent = "Audio finished";
  });

  audio.addEventListener("error", () => {
    const errorCode = audio.error?.code;

    console.error("Audio loading error:", audio.error);

    const messages = {
      1: "Audio loading was cancelled.",
      2: "Network error while loading audio.",
      3: "The audio file could not be decoded.",
      4: "Audio format or file URL is not supported."
    };

    showError(
      messages[errorCode] ||
      "Audio could not load. Check the filename and file path."
    );
  });

  cover.addEventListener("error", () => {
    cover.alt = "Cover image unavailable";
  });

  audio.load();
}
