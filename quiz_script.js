function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function randomString(length) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (var i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const quiz = document.getElementById("quiz_container");
const inlet_start = document.getElementById("quiz_inlet_start");
const inlet_answers = document.getElementById("quiz_inlet_answers");

const answer_go = document.getElementById("answer_go");

const inlet_result = document.getElementById("quiz_inlet_result");
const result_score = inlet_result.querySelector("#quiz_inlet_result_score");
const result_count = inlet_result.querySelector("#quiz_inlet_result_count");
var Y = randomString(20);

const q_title = quiz.querySelector("h2");
const q_subtitle = quiz.querySelector("p>b");
const ans = inlet_answers.querySelectorAll('label[for^="ans"]');
const ansi = inlet_answers.querySelectorAll('input[id^="ans"]');
const answer_boxes = document.querySelectorAll('.ans_box');
const answer_response = document.querySelector('#answer_response');

const soq = {
    "Was ist die KuKo für Metrosysteme?": [
        "Kundenkonfiguration für alle SIL4 Software Module eines Metrosystems",
        "'KuKo' ist die Abkürzung der Berliner für das japanische Restaurant 'Kumizke Konewama' ",
        "Wanderausstellung 'Kunst Kommt' der Siemens Mobility für die Einweihung neuer Metrosysteme weltweit."
    ],
    "Wer oder was ist MoMa ?": [
        "Beide Antworten sind richtig",
        "Das Museum of Modern Art(MoMA) beherbergt eine der weltweit bedeutendsten und einflussreichsten Sammlungen moderner und zeitgenössischer Kunst.",
        "Das Prozessautomatisierungstool für die Projektabwicklung von Metrosystemen"
    ],
    "Was ist eine Kuppelfahrstraße?": [
        "Fahrstraßen mit der Möglichkeit in ein besetztes Zielgleis zu fahren.",
        "Straßen, auf denen die Kupplung des Fahrzeugs betätigt werden muss.",
        "Eine Straße, auf der man Bekanntschaften schließen kann."
    ],
    "Wer sind Paul und Paula?": [
        "SW-Komponenten in Metrosystemen mit SicasECC",
        "Erklärungsvideos für Kinder auf siemens.tv/kinder",
        "Die Namen der Kinder der ADC Leitung"
    ],
    "Womit wird eine Fahrsperre gelöscht?": [
        "Durch Schließen des Stromkreises über den Magnet der Fahrsperre",
        "Eine Schaufel Sand",
        "Feuerlöscher für elektrische Geräte"
    ],
    "Was bedeutet Sicas?": [
        "Siemens Computer aided Signalling",
        "System intelligence for core application security",
        "Simatic can also Safety"
    ],
    "Wozu ist Paula auch in der Lage?": [
        "Zur Ansteuerung von Waschmaschinen von U-Bahnen",
        "Kinderhüten von Paul",
        "Zur zeitgerechten Steuerung  von Kafeemaschinen"
    ],
    "Wann ist das erste Sicas Stellwerk in Betrieb gegangen?": [
        "1995",
        "1960",
        "2004"
    ],
    "In wie vielen Ländern gibt es Metrosysteme mit Sicas Stellwerken?": [
        "20",
        "53",
        "7"
    ],
    "In wie vielen Städten gibt es Metrosysteme der SMO aus Braunschweig?": [
        "65",
        "45",
        "25"
    ],
    "Wieviele Neuigkeiten kann Vicos OC 100 mindestens pro Sekunde verarbeiten?": [
        "200",
        "20",
        "2000"
    ],
    "Was macht das Vicos OC 100 Gateway?": [
        "Framework für beliebige externe Schnittstellen",
        "Zutrittskontrolle für unser Labor",
        "Neueste ITSec-Komponente bei Vicos"
    ],
    "Wofür gibt es das Controlguide Restriction Management?": [
        "Verwaltung von Sperren im Bahnbetrieb",
        "Automatische Beantwortung von Anwendungsregeln",
        "Kindersicherung in der Leittechnik"
    ],
    "Was macht die Komponente ILSE in Vicos T&S?": [
        "Ist der Stellwerkssimulator",
        "Sorgt für gute Kommunikation",
        "Ist die Gruppenleitung"
    ],
    "Wie viele Trips/Züge pro Tag bedient Controlguide mit Vicos in Kopenhagen?": [
        "6000/150",
        "3000/100",
        "Keine Rauschzustände im Bahnverkehr!"
    ],
    "Welcher Speicher steht ARCS in Braunschweig für Datenanalysen zur Verfügung?": [
        "1 PetaByte (1.000.000.000.000.000)",
        "10 TerraByte (10.000.000.000.000)",
        "1,44 MegaByte (1.440.000)"
    ],
    "Was ist OPC UA?": [
        "Standard für den Datenaustausch in S&D",
        "Kampfschrei eines Oviraptors",
        "Unterabteilungsleiter für offene Presse-Kommunikation"
    ]
};
const q_count = Object.keys(soq).length;
const QUESTIONS_PER_GAME = 5;

var progress = 0;
var score = 0;
var used_questions = [];

var test = null;

/* Events */
for (var i = 0; i < ans.length; i++) {
    ans[i].addEventListener("click", function () {
        console.log(i);
    });
}
answer_go.addEventListener("click", show_correct);

/* */

function show_result() {
    q_title.innerText = "Quiz Beendet!";
    q_subtitle.style.display = "block";
    q_subtitle.innerText = "Schauen Sie sich Ihr Ergebnis an.";
    inlet_answers.style.display = "none";
    inlet_result.style.display = "block";

    let percent = (100.0 * score) / QUESTIONS_PER_GAME;
    result_score.innerText = score;
    result_count.innerText = QUESTIONS_PER_GAME + " (" + percent.toFixed(1) + "%)";
}

function show_question(number) {
    progress++;

    //console.log("Showing question " + number + " of " + q_count);

    if (number < 0) {
        q_title.innerText = "Diese Frage konnte leider nicht gefunden werden!";
    }
    else if (progress > QUESTIONS_PER_GAME) {
        show_result();
        used_questions = [];
    }
    else {
        used_questions.push(number);
        let key = Object.keys(soq)[number];
        q_title.innerText = key;
        let order = shuffle([1, 2, 0]);
        //console.log("Shuffled answers: ", order);

        Y = randomString(20);
        //String of truth
        for (var i = 0; i < 3; i++) {
            ans[order[i]].innerText = soq[key][i];
            if (i == 0) {
                ans[order[i]].setAttribute("data", Y);
            }
            else {
                ans[order[i]].setAttribute("data", randomString(20));
            }

        }
    }
}

function show_correct() {
    let chosen_answer = document.querySelector('input[name="answer"]:checked');
    let correct_answer_box = document.querySelector('div.ans_box>label[data="' + Y + '"]').parentElement;
    let correct_answer_selected = correct_answer_box.querySelector("input").checked;

    if (chosen_answer != null) {
        for (var i = 0; i < answer_boxes.length; i++) {
            if (answer_boxes[i] == correct_answer_box) {

                answer_boxes[i].classList = "ans_box correct";
            }
            else {
                answer_boxes[i].classList = "ans_box incorrect";
            }
            ansi[i].setAttribute("disabled", "disabled");
        }

        if (correct_answer_selected) {
            answer_response.innerText = "Richtig geraten!";
        }
        else {
            answer_response.innerText = "Leider falsch geraten :(";
        }

        answer_go.removeEventListener("click", show_correct);
        answer_go.addEventListener("click", next);
        answer_go.innerText = "Weiter";
    }
    else {
        alert("Bitte wählen Sie eine Antwort aus!");
    }
}

function next() {
    let answer = document.querySelector('input[name="answer"]:checked');

    
    answer_go.removeEventListener("click", next);
    answer_go.addEventListener("click", show_correct);
    answer_go.innerText = "Antworten";
    answer_response.innerText = "";

    for (var i = 0; i < answer_boxes.length; i++) {
        answer_boxes[i].classList = "ans_box";
        ansi[i].removeAttribute("disabled");
    }

    if (answer == null) {
        alert("Bitte wählen Sie eine Antwort aus!");
    }
    else {
        let answer_value = answer.value;
        let is_right = document.querySelector('input[value="' + answer_value + '"]').labels[0].getAttribute("data") == Y;

        if (is_right) {
            //console.log("Correct answer!");
            score++;

        }
        else {
            //console.log("Wrong answer!");
        }
        //console.log("Score: " + score);
        answer.checked = false;

        let next_question = randomInt(0, q_count - 1);
        while (used_questions.includes(next_question)) {
            next_question = randomInt(0, q_count - 1);
        }

        //console.log("Jumping to Question #" + next_question);
        show_question(next_question);
    }
}

function start_quiz() {
    score = 0;
    used_questions = [];
    progress = 0;
    show_question(randomInt(0, q_count - 1));
    inlet_start.style.display = "none";
    inlet_answers.style.display = "block";
    inlet_result.style.display = "none";
    q_subtitle.style.display = "none";
}