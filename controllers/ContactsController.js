const express = require("express");
const { Contact } = require("../models");

exports.contactExists = async (id) => {
  const contact = await Contact.findByPk(id);

  try {
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    return res.status(500).Send("Server Error");
  }
};

exports.create = async (req, res) => {
  // Destructure fields from request body
  const { name, email, phone, designation, availability } = req.body;

  try {
    // check if contact exists
    let contact = await Contact.findOne({
      where: { email },
    });

    if (contact) {
      return res.status(400).json({ msg: "Contact already exist" });
    }

    // create and save contact in db
    contact = await Contact.create({
      name,
      email,
      phone,
      designation,
      availability,
    });
    return res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.findAll = async (req, res) => {
  try {
    // fetch all contacts from db
    const contacts = await Contact.findAll();

    // return response
    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // check if contact exists
    let contact = await Contact.findByPk(id);

    if (!contact) {
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // check if contact exist
    let contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    await Contact.update(req.body, {
      where: { id },
    });
    updatedContact = await Contact.findByPk(id);
    return res.status(200).json(updatedContact);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    // check if contact exists
    let contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // delete contact from db
    await Contact.destroy({
      where: { id },
    });
    return res.status(200).json({ msg: "Contact deleted..." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
