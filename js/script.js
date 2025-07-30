const questions = [
    "1 - 10 ¿Alguna vez has traicionado la confianza de alguien cercano contando un secreto o chisme?",
    "2 - 10 ¿Has sentido enojo tan fuerte que quisiste romper algo o gritarle a alguien? ",
    "3 - 10 ¿Has sido testigo o cómplice de una infidelidad y no lo contaste? ",
    "4 - 10 ¿Has usado palabras vulgares con intención de ofender a alguien en una discusión? ",
    "5 - 10 ¿Has hablado mal de alguien a sus espaldas y luego fingido llevarte bien? ",
    "6 - 10 ¿Te has sentido celoso(a) sin razón, solo por ver a alguien hablar con la persona que te gusta? ",
    "7 - 10 ¿Alguna vez te han dado celos de una amistad muy cercana de tu pareja o ex? ",
    "8 - 10 ¿Has sido tan directo(a) o atrevido(a) con alguien que sentiste que te pasaste de descarado(a)? ",
    "9 - 10 ¿Has tenido una discusión tan intensa con alguien que mezcló enojo y atracción al mismo tiempo? ",
    "10 - 10 ¿Eres team frio? "
];

let currentQuestionIndex = [0, 0];  // Index for both persons
let answers = [[], []];  // Answers for both persons
let names = ['', ''];  // Names for both persons
let waitingInterval;

function startSurvey(person) {
    const name = document.getElementById(`name${person}`).value;
    if (!name) {
        alert(`Por favor, ingresa el nombre de la persona ${person}`);
        return;
    }

    names[person - 1] = name;
    document.getElementById(`title${person}`).innerText = name;
    document.querySelector('.image-container').style.display = 'none'; // Ocultar la imagen
    document.getElementById(`nameSection${person}`).style.display = 'none';
    document.getElementById(`questionSection${person}`).style.display = 'block';
    loadQuestion(person);
}

function loadQuestion(person) {
    const questionElement = document.getElementById(`question${person}`);
    const questionIndex = currentQuestionIndex[person - 1];
    questionElement.innerText = questions[questionIndex];
    const answer = answers[person - 1][questionIndex];
    document.querySelector(`input[name="answer${person}"][value="Sí"]`).checked = answer === "Sí";
    document.querySelector(`input[name="answer${person}"][value="No"]`).checked = answer === "No";
}

function nextQuestion(person) {
    const answer = document.querySelector(`input[name="answer${person}"]:checked`);
    if (!answer) {
        alert('Por favor selecciona una respuesta');
        return;
    }

    answers[person - 1][currentQuestionIndex[person - 1]] = answer.value;
    currentQuestionIndex[person - 1]++;

    if (currentQuestionIndex[person - 1] < questions.length) {
        loadQuestion(person);
    } else {
        localStorage.setItem(`answers${person}`, JSON.stringify(answers[person - 1]));
        localStorage.setItem(`name${person}`, names[person - 1]);
        document.getElementById(`questionSection${person}`).style.display = 'none';
        document.getElementById(`restartBtn${person}`).style.display = 'block';

        if (localStorage.getItem('answers1') && localStorage.getItem('answers2')) {
            showComparison();
            fillTable();
            showResults();
        } else {
            alert(`Encuesta completada por ${names[person - 1]}. Esperando a la otra persona...`);
            document.getElementById(`waiting${person}`).style.display = 'block';
            startWaitingTimer(person);
        }
    }
}

function prevQuestion(person) {
    if (currentQuestionIndex[person - 1] > 0) {
        currentQuestionIndex[person - 1]--;
        loadQuestion(person);
    }
}

function restartSurvey(person) {
    currentQuestionIndex[person - 1] = 0;
    answers[person - 1] = [];
    names[person - 1] = '';
    document.getElementById(`title${person}`).innerText = `Ingresa tu nombre para empezar:`;
    document.getElementById(`name${person}`).value = '';
    document.getElementById(`nameSection${person}`).style.display = 'block';
    document.getElementById(`questionSection${person}`).style.display = 'none';
    document.getElementById(`restartBtn${person}`).style.display = 'none';
    document.getElementById('comparison').innerText = ''; // Limpiar el contenido del porcentaje
    document.querySelector('.image-container').style.display = 'block'; // Mostrar la imagen
    document.getElementById(`waiting${person}`).style.display = 'none'; // Ocultar mensaje de espera
    localStorage.removeItem(`answers${person}`);
    localStorage.removeItem(`name${person}`);
    clearTable();
    hideResults();
    clearInterval(waitingInterval);
}
/*
function showComparison() {
    const answers1 = JSON.parse(localStorage.getItem('answers1'));
    const answers2 = JSON.parse(localStorage.getItem('answers2'));
    const name1 = localStorage.getItem('name1');
    const name2 = localStorage.getItem('name2');
    let correctCount = 0;

    answers1.forEach((answer, index) => {
        if (answer === answers2[index]) {
            correctCount++;
        }
    });

    const percentage = (correctCount / questions.length) * 100;
    document.getElementById('comparison').innerText = `${name1} y ${name2} son compatibles en un ${percentage}% (${correctCount} de ${questions.length})`;
}
*/
function showComparison() {
    const answers1 = JSON.parse(localStorage.getItem('answers1'));
    const answers2 = JSON.parse(localStorage.getItem('answers2'));
    const name1 = localStorage.getItem('name1');
    const name2 = localStorage.getItem('name2');
    let correctCount = 0;

    answers1.forEach((answer, index) => {
        if (answer === answers2[index]) {
            correctCount++;
        }
    });

    const percentage = (correctCount / questions.length) * 100;
    const formattedPercentage = percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1);
    document.getElementById('comparison').innerText = `${name1} y ${name2} son compatibles en un ${formattedPercentage}% (${correctCount} de ${questions.length})`;
}
function fillTable() {
    const table = document.getElementById('answersTable');
    const answers1 = JSON.parse(localStorage.getItem('answers1'));
    const answers2 = JSON.parse(localStorage.getItem('answers2'));

    // Limpiar tabla antes de llenarla
    clearTable();

    questions.forEach((question, index) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerText = question;
        cell2.innerText = answers1[index];
        cell3.innerText = answers2[index];

        if (answers1[index] === answers2[index]) {
            row.classList.add('compatible');
        } else {
            row.classList.add('incompatible');
        }
    });
}

function clearTable() {
    const table = document.getElementById('answersTable');
    table.innerHTML = '<tr><th>Pregunta</th><th>Persona 1</th><th>Persona 2</th></tr>';
}

function updateData() {
    if (localStorage.getItem('answers1') && localStorage.getItem('answers2')) {
        fillTable();
        showComparison();
        hideWaiting();
        showResults();
    } else {
        alert('Esperando a que ambas personas completen la encuesta.');
    }
}
/*
function compareData() {
    showComparison();
}*/

function hideWaiting() {
    document.getElementById('waiting1').style.display = 'none';
    document.getElementById('waiting2').style.display = 'none';
}

function showResults() {
    document.getElementById('results').style.display = 'block';
}

function hideResults() {
    document.getElementById('results').style.display = 'none';
}

function startWaitingTimer(person) {
    let timeLeft = 15;
    const waitingElement = document.getElementById(`waiting${person}`);
    waitingInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(waitingInterval);
            updateData(); // Actualizar automáticamente al finalizar el temporizador
        } else {
            waitingElement.innerText = `Esperando a que la otra persona termine la encuesta... (${timeLeft}s)`;
        }
    }, 1000);
}

window.onload = () => {
    const person = document.getElementById('name1') ? 1 : 2;
    currentQuestionIndex[person - 1] = 0;
    answers[person - 1] = [];
    hideResults();
};


function printResults() {
    const name1 = localStorage.getItem('name1');
    const name2 = localStorage.getItem('name2');
    const percentage = document.getElementById('comparison').innerText;

    const content = `
        <h2>Resultados de la Encuesta</h2>
        <p>${name1} y ${name2} ${percentage}</p>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.body.innerHTML = content;
    newWindow.print();
}
function compareData() {
    showComparison();
    const name1 = localStorage.getItem('name1');
    const name2 = localStorage.getItem('name2');
    const percentage = document.getElementById('comparison').innerText;

    const url = `ticket.html?name1=${name1}&name2=${name2}&percentage=${percentage}`;
    window.open(url, '_blank');
}