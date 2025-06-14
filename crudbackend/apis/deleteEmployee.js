const { toast } = require('react-toastify')
const { connectDb } = require('../db/connectDb')

const deleteEmployee = async (req, res) => {
     const email = req.params.email;
    try {
        const db = await connectDb()
        const collection = db.collection("Employee")
           
        const existing = await collection.findOne({ email })
        if (!existing) {
            return res.status(400).json({
                success: false,
                error: "Invalid request parameters.",
                message: "Employee does not exist."
            });
        }
        if (existing) {
            const result = await collection.deleteOne({email})
            
            if (result.deletedCount===1) {
            
                return res.status(200).json({
                  success: true,
                  message: "Data deleted successfully."
                });
                
            }else{
                res.status(400).json({
                  success: false,
                  error: "Invalid request parameters.",
                  message: "Deleting Employee failed"
                });
            }

        }   


    } catch (error) {
        console.log("Error Occured while deleting Employee", error);
        res.status(500).json({
          success: false,
          error: "An unexpected error occurred on the server.",
          message: "Internal Server Error. Please try again later."
        });

    }
}

module.exports = {deleteEmployee}