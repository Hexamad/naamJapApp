const User = require('../models/User');

exports.updateProgress = async (req, res) => {
  try {
    const { mantraName, count } = req.body;
    const user = await User.findById(req.user.id);
    
    await user.updateProgress(mantraName, count);

    res.json({
      message: 'Progress updated successfully',
      progress: user.progress.get(mantraName)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const progress = Object.fromEntries(user.progress);
    
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMantrasProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const allProgress = Array.from(user.progress.entries()).map(([mantra, data]) => ({
      mantra,
      count: data.count,
      lastUpdated: data.lastUpdated
    }));

    res.json({ progress: allProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};