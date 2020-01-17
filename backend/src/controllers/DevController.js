const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/ParseStringAsArray');

// METODOS: index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      console.log(dev);
      
    }
    
    return response.json(dev);
  },

  async destroy(req, res) {
    const { github_username } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      Dev.deleteOne({ github_username: github_username }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${github_username} foi deletado!`);
        }
      })
    }

    const devs = await Dev.find();

    return res.json(devs);
  }
}