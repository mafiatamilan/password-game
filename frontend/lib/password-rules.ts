export const passwordRules = [
  {
    description: "Must be at least 5 characters long",
    validator: (password: string) => password.length >= 5,
  },
  {
    description: "Must contain at least one number",
    validator: (password: string) => /\d/.test(password),
  },
  {
    description: "Must have at least one uppercase letter",
    validator: (password: string) => /[A-Z]/.test(password),
  },
  {
    description: "Must include at least one special character (!@#$%^&*)",
    validator: (password: string) => /[!@#$%^&*]/.test(password),
  },
  {
    description: "Digits in the password must sum to 25",
    validator: (password: string) => {
      const digits = password.match(/\d/g) || []
      const sum = digits.reduce((acc, digit) => acc + Number.parseInt(digit, 10), 0)
      return sum === 25
    },
  },
  {
    description: "Must contain a month name (January, Feb, etc.)",
    validator: (password: string) => {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
        "jan",
        "feb",
        "mar",
        "apr",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ]
      return months.some((month) => password.toLowerCase().includes(month.toLowerCase()))
    },
  },
  {
    description: "Must include a Roman numeral (I, II, III, IV, V, X, etc.)",
    validator: (password: string) => {
      const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
      return romanNumerals.some((numeral) => password.includes(numeral))
    },
  },
  {
    description: "Must contain a periodic table element symbol (He, Li, Be, etc.)",
    validator: (password: string) => {
      const elements = [
        "H",
        "He",
        "Li",
        "Be",
        "B",
        "C",
        "N",
        "O",
        "F",
        "Ne",
        "Na",
        "Mg",
        "Al",
        "Si",
        "P",
        "S",
        "Cl",
        "Ar",
        "K",
        "Ca",
        "Sc",
        "Ti",
        "V",
        "Cr",
        "Mn",
        "Fe",
        "Co",
        "Ni",
        "Cu",
        "Zn",
        "Ga",
        "Ge",
        "As",
        "Se",
        "Br",
        "Kr",
        "Rb",
        "Sr",
        "Y",
        "Zr",
      ]
      return elements.some((element) => new RegExp(`${element}`, "i").test(password))
    },
  },
  {
    description: "Must include at least one emoji",
    validator: (password: string) => {
      const emojiRegex = /[\p{Emoji}]/u
      return emojiRegex.test(password)
    },
  },
  {
    description: "Must contain a leap year (e.g., 2020, 2024, 2000, etc.)",
    validator: (password: string) => {
      // Find all 4-digit numbers in the password
      const yearMatches = password.match(/\b\d{4}\b/g)
      if (!yearMatches) return false

      // Check if any of them is a leap year
      return yearMatches.some((yearStr) => {
        const year = Number.parseInt(yearStr, 10)
        // Leap year logic: divisible by 4, but not by 100 unless also divisible by 400
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      })
    },
  },
  {
    description: "Must have at least one prime number (2, 3, 5, 7, 11, 13, 17, 19, etc.)",
    validator: (password: string) => {
      const primes = ["2", "3", "5", "7", "11", "13", "17", "19", "23", "29", "31", "37", "41", "43", "47"]
      return primes.some((prime) => password.includes(prime))
    },
  },
  {
    description: "Must include a punctuation mark (.,;:'\")",
    validator: (password: string) => /[.,;:'"()]/.test(password),
  },
  {
    description: "Must be exactly 20 characters long",
    validator: (password: string) => password.length === 20,
  },
  {
    description: "Must contain at least one mirrored letter (A, H, I, M, O, T, U, V, W, X, Y)",
    validator: (password: string) => {
      const mirroredLetters = ["A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y"]
      return mirroredLetters.some((letter) => password.toUpperCase().includes(letter))
    },
  },
  {
    description: "Must have an even number of characters",
    validator: (password: string) => password.length % 2 === 0,
  },
]

