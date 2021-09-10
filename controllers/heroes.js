const mongoose = require('mongoose');
const {
  addHero,
  getHeroById,
  listHeroes,
  removeHero,
  updateHero,
} = require('../model/heroes');
const HttpCode = require('../helpers/constatns');
const UploadImages = require('../services/upload-avatars-local');
require('dotenv').config();
const IMAGES_OF_HEROES = process.env.IMAGES_OF_HEROES;

const getAll = async (req, res, next) => {
  try {
    // const { total, limit, page, heroes } = await listHeroes(req.query);
    // const data = await listHeroes(req.query);
    const data = await listHeroes(req.query);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      // data: { total, limit, page, heroes },
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.heroId)) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({ message: 'invalid heroId value' });
    }

    const hero = await await getHeroById(req.params.heroId);

    if (hero) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { hero } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const hero = await addHero({ ...req.body, images: req.files });
    console.log(req.files);
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { hero } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.heroId)) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ message: 'invalid heroId value' });
  }
  try {
    const hero = await removeHero(req.params.heroId);
    if (hero) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { hero } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.heroId)) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ message: 'invalid heroId value' });
  }
  try {
    const hero = await updateHero(req.params.heroId, req.body);
    if (hero) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { hero } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, remove, update };
