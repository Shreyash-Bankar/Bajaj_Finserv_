
import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "shreyash_bankar";
const DOB = "22032004"; // ddmmyyyy
const EMAIL = "shreyash@example.com";
const ROLL_NUMBER = "22BCI0046";


function alternatingCaps(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Input must contain 'data' as an array",
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      // Check if item is a number (pure digit string)
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      }
      // Check if item is purely alphabetic (multi-letter also allowed)
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      }
      // Otherwise → special character
      else {
        special_characters.push(item);
      }
    });

    // Concatenation logic
    let concatenated = alphabets
      .map((a) => a.toLowerCase())
      .reverse()
      .join("");
    let concat_string = alternatingCaps(concatenated);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

