const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tour data from collection
  const tours = await Tour.find();
  // bild template

  // render that template using tour data
  res.status(200).render('overview', {
    title: 'All Tours',
    tours: tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'review rating user',
    })
    .populate('guides', ['name', 'guide', 'email', 'role', 'photo']);
  // build templaye

  // render template using data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour: tour,
  });
});
