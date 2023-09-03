import asyncErrorHandler from 'express-async-handler';

class AppController {
  static getHome = asyncErrorHandler(async (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to VerdeHarvestLink!'
    })
  });
}

export default AppController;
