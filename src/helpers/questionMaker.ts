import { shuffle } from "./shuffle"

export const questionMaker = (
  countries: any[],
  wrongAnswerCountries: any[]
) => {
  interface Question {
    image: string | null
    question: string
    type: string
    answer: string
    answers: string[]
  }

  const questionGenerator = (
    image: string | null,
    question: string,
    type: string,
    answer: string,
    answers: string[]
  ): Question => ({
    image,
    question,
    type,
    answer,
    answers,
  })

  const generateChoices = (answer: string, arr: any[]): string[] => {
    let choices: string[] = []

    // Generate wrong answers
    for (let i = 0; i < 3; i++) {
      let index: number
      index = Math.floor(Math.random() * 19) + 1
      choices.push(arr[index].name)
    }

    choices.push(answer)
    shuffle(choices)

    return choices
  }

  let questions = [] as any

  for (let i = 0; i < countries.length; i++) {
    if (i % 2 === 0) {
      questions.push(
        questionGenerator(
          countries[i].flag,
          "Which country does this flag belong to?",
          "flag",
          countries[i].name,
          generateChoices(countries[i].name, wrongAnswerCountries)
        )
      )
    } else {
      questions.push(
        questionGenerator(
          null,
          `${countries[i].capital} is the capital of`,
          "capital",
          countries[i].name,
          generateChoices(countries[i].name, wrongAnswerCountries)
        )
      )
    }
  }

  return questions
}
