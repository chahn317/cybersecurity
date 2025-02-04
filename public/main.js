new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    sectionsColor : ['#232191', '#232191', '#232191', 
                     '#232191','#232191','#232191',
                     '#232191', '#232191', '#232191',
                     '#232191', '#232191'],
    navigation: true,
    anchors:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    navigationTooltips: ['Title', 'Intro', 'Quiz', 'Public Knowledge', 'Cyberattacks', 'Phishing', 
                         'Malware', 'Best Practices', 'Passwords', 'Credits', 'About'],
});

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  }

document.getElementById("defaultOpen").click();

const quizData = [
    {
      question: 'What is phishing?',
      options: [
      'A type of software that allows hackers to access personal data',
      'A cyberattack involving impersonating a company to trick users into revealing personal data',
      'A method of encrypting sensitive data',
      'The practice of catching fish'],
      answer: 'A cyberattack involving impersonating a company to trick users into revealing personal data',
    },
    {
      question: 'If you fall for a phishing scam, what should you do to limit the damage?',
      options: ['Delete the email.', 'Unplug the computer.', 'Change compromised passwords.', 'Nothing.'],
      answer: 'Change compromised passwords.',
    },
    {
      question: 'Which of the following is the most secure password?',
      options: ['password', 'h3llo!@', 'noplacelikehome', 'aFu6#l9@!o4n$ewq'],
      answer: 'aFu6#l9@!o4n$ewq',
    },
    
    {
      question: 'Can your internet service provider monitor your online activity?',
      options: ['Yes, always', 'No, never', 'Yes, but not if you use a VPN', 'Yes, but not in incognito/private mode'],
      answer: 'Yes, but not if you use a VPN',
    },
    {
      question: 'Which of the following is NOT an example of multi-factor authentication?',
      options: [
        'Security questions to verify your identity after entering your password',
        'A code sent to your email after entering your password',
        'A push notification on your phone after entering your password',
        'A smart card you insert after entering your password'
      ],
      answer: 'Security questions to verify your identity after entering your password',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode("  " + shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `<p><b>You scored ${score} out of ${quizData.length}!</b><br></p>`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    if (incorrectAnswers.length === 0) {
        incorrectAnswersHtml += '<p><strong>You got all the questions right!</strong></p>';
    } else {
        incorrectAnswersHtml += `
          <table style="table-layout: fixed; width: 100%;">
            <thead>
              <tr>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
        `;
        
        for (let i = 0; i < incorrectAnswers.length; i++) {
            incorrectAnswersHtml += `
              <tr>
                <td>${incorrectAnswers[i].question}</td>
                <td>${incorrectAnswers[i].incorrectAnswer}</td>
                <td>${incorrectAnswers[i].correctAnswer}</td>
              </tr>
            `;
        }

        incorrectAnswersHtml += `
            </tbody>
          </table>
        `;
    }

    resultContainer.innerHTML = `
      ${incorrectAnswersHtml}
    `;
  }

  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();

