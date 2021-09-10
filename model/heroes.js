const Hero = require('./schemas/hero');

const listHeroes = async query => {
  const { limit = 5, page, favorite = null } = query;
  const optionsSearch = {};
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }

  const results = await Hero.find({});

  return results;
};

const getHeroById = async heroId => {
  const result = await Hero.findOne({
    _id: heroId,
  });
  return result;
};

const addHero = async (body, files) => {
  const result = await Hero.create(body, files);
  return result;
};

const removeHero = async heroId => {
  const result = await Hero.findByIdAndRemove({
    _id: heroId,
  });
  return result;
};

const updateHero = async (heroId, body) => {
  const result = await Hero.findOneAndUpdate(
    { _id: heroId },
    { ...body },
    {
      new: true,
    },
  );
  return result;
};

module.exports = {
  listHeroes,
  getHeroById,
  addHero,
  removeHero,
  updateHero,
};
