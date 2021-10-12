const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/user");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Такого юзера не існує" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Не правильний логін або пароль" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Такий користувач вже зареєстрований" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Паролі не співпадають" });
    
      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

      const token = jwt.sign(
        { email: result.email, id: result._id },
        "test",
        { expiresIn: "1h" }
      );
    res.status(200).json({result, token});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
