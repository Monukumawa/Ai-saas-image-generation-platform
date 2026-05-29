import historyModel from "../models/historyModel.js"; // <-- ADD THIS LINE

export const userHistory = async (req, res) => {
   try {
      const { userId } = req.body;
      const history = await historyModel.find({ userId }).sort({ createdAt: -1 });

      res.json({
         success: true,
         history
      });
   } catch (error) {
      res.json({
         success: false,
         message: error.message
      });
   }
};