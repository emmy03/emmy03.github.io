// Attache un gestionnaire d'événement à la soumission du formulaire
document.getElementById('quiz-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    checkAnswers(); // Appelle la fonction pour vérifier les réponses
});

// Fonction pour vérifier les réponses du quiz
function checkAnswers() {
    // Tableau pour stocker les bonnes réponses
    const correctAnswers = ["true", "true", "true"];

    // Récupère tous les éléments des questions
    const questionItems = document.querySelectorAll('.question-item');

    // Initialise le score
    let score = 0;

    // Vérifie chaque question
    questionItems.forEach((question, index) => {
        const answerElements = question.querySelectorAll('.answer');
        let isQuestionCorrect = false;

        // Vérifie chaque réponse pour la question
        answerElements.forEach((answer, answerIndex) => {
            const isChecked = answer.checked;
            const isCorrectAnswer = answer.value === correctAnswers[index];

            if (isChecked && isCorrectAnswer) {
                isQuestionCorrect = true;
            } else if (isChecked && !isCorrectAnswer) {
                isQuestionCorrect = false;
            }
        });

        // Change la couleur du texte de la question en fonction de la correction globale
        if (isQuestionCorrect) {
            question.style.color = 'green';  // Change la couleur du texte de la question entière si la bonne réponse est cochée
            score++;
        } else {
            question.style.color = 'red';  // Change la couleur du texte de la question entière si une mauvaise réponse est cochée
        }
    });

    // Affiche le résultat dans une boîte d'alerte
    const alertElement = document.getElementById('alert');
    const alertMessage = document.getElementById('alert-message');
    const alertTitle = document.querySelector('.alert-title');

    // Évalue le score et affiche le message approprié dans l'alerte
    if (score === correctAnswers.length) {
        alertTitle.style.display = 'block';
        alertMessage.textContent = `You got them all right!`;
        alertElement.style.display = 'block';
        alertElement.className = 'success';
    } else if (score > 0) {
        alertTitle.style.display = 'none';
        alertMessage.textContent = `You got ${score} out of ${correctAnswers.length} right!`;
        alertElement.style.display = 'block';
        alertElement.className = 'partial';
    } else {
        alertTitle.style.display = 'none';
        alertMessage.textContent = `You got none right. Better luck next time!`;
        alertElement.style.display = 'block';
        alertElement.className = 'failure';
    }

    // Masque l'alerte après 5 secondes
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}
