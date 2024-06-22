import { QuizQuestion } from '../../question/models/question.model';
import { Quiz } from './quiz.model';

const scienceQuiz: Quiz = new Quiz(
  'Science',
  'https://tehut-1c712.web.app/assets/science.jpg'
);
scienceQuiz.questionCount = 8;
scienceQuiz.questions = [
  new QuizQuestion(
    'Which of these planets is the largest?',
    'Earth',
    'Jupiter',
    'Venus',
    'Mars',
    2
  ),
  new QuizQuestion(
    'Which career focuses on understanding the functioning of the human body?',
    'Chemist',
    'Astronomer',
    'Physicist',
    'Physiologist',
    4
  ),
  new QuizQuestion(
    'What does DNA stand for?',
    'Dehydrogenated Acid',
    'Deoxyribonucleic Acid',
    'Dinitraamylose',
    'Denaturedamylase',
    2
  ),
  new QuizQuestion(
    'What was Charles Darwin known for?',
    'He was the Prince of Wales',
    'He was the scientist who uncovered the Theory of Evolution',
    'He contributed to cell theory',
    'He discovered the workings of DNA',
    2
  ),
  new QuizQuestion(
    "Which profession studies the Earth's structure and processes?",
    'Zoologist',
    'Meterologist',
    'Geologist',
    'Oceanographer',
    3
  ),
  new QuizQuestion(
    'What is the coldest planet in our solar system?',
    'Uranus',
    'Neptune',
    'Venus',
    'Earth',
    1
  ),
  new QuizQuestion(
    'Which of the following answers describe the process of photosynthesis the best?',
    'It uses CO2 to produce sugar for producers and O2 as waste',
    'It uses O2 to produce sugar and CO2 as waste.',
    'It helps synthesize proteins',
    'None of the above',
    1
  ),
  new QuizQuestion(
    'Who first proposed that the galaxy was expanding?',
    'Einstein',
    'Kepler',
    'Hubble',
    'Maxwell',
    3
  ),
];

const aviationQuiz: Quiz = new Quiz(
  'Aviation',
  'https://tehut-1c712.web.app/assets/aviation.jpg'
);
aviationQuiz.questionCount = 7;
aviationQuiz.questions = [
  new QuizQuestion(
    'The Madeira Airport is also named after which famous Portuguese footballer?',
    'Luis Figo',
    'Eusebio da Silve Ferreira',
    'Cristiano Ronaldo',
    'Bernado Silve',
    3
  ),
  new QuizQuestion(
    'In which Russian city can you find the Yuri Gagarin Airport?',
    'Kaluga',
    'Orenburg',
    'St. Petersburg',
    'Moscow',
    2
  ),
  new QuizQuestion(
    'What is the IATA code for Emirates?',
    'EK',
    'ES',
    'EA',
    'EM',
    1
  ),
  new QuizQuestion(
    'To which contry does the aircraft manufacturer Bombardier belong to?',
    'United Kingdom',
    'France',
    'USA',
    'Canada',
    4
  ),
  new QuizQuestion(
    "What is the world's largest airline by aircraft fleet size?",
    'United Airlines',
    'American Airlines',
    'Delta Air Lines',
    'Southwest Airlines',
    2
  ),
  new QuizQuestion(
    'Of the US major low-cost carriers, which has the largest fleet?',
    'Allegiant Air',
    'JetBlue Airways',
    'Southwest Airlines',
    'SkyWest Airlines',
    3
  ),
  new QuizQuestion(
    'In what year was the US-based aerospace manufacturer Boeing first founded?',
    '1916',
    '1922',
    '1945',
    '1953',
    1
  ),
];

export const precompiledQuizzes: Quiz[] = [scienceQuiz, aviationQuiz];
