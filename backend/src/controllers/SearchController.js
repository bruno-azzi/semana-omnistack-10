const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/ParseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    
    console.log(req.query)

    const techsArray = parseStringAsArray(techs);

    // const devs = await Dev.find({
    //   techs: {
    //     $in: techsArray,    // somente devs com essas tecnologias
    //   },
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: 'Point',
    //         coordinates: [longitude, latitude]
    //       },
    //       $maxDistance: 10000
    //     }
    //   }
    // });

    const nearDevs = await Dev.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    console.log(nearDevs);
    
    nearDevs.map(item => {
      item.techs.map(tech => {
        console.log(tech.toLowerCase());
        tech = tech.toLowerCase();
      });
      console.log('terminou', item.techs);
    })

    ///////////////////////// ARRUMAR ACIMA ///////////////////////

    return res.json({ nearDevs })
  }
}