import express from "express";

// import functions
import { createUser, getUserByEmail } from "db/users";
import { random, authentication } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    // check to see if a field is missing
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    //if email exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    //Create Autentification
    const salt = random();
    const user = await createUser({
      username,
      email,
      password,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
