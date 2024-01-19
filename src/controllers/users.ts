import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";
import { json } from "body-parser";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    // Is a Status no a sendStatus
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extract parameters
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username } = req.body;
    const { id } = req.params;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();


  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
