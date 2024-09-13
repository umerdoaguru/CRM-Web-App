const { db } = require("../db");

const getEmployeeInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM invoices WHERE employeeId = ?";
    
        const result = await new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(results); // Resolve the promise with the results
                }
            });
        });
        
        // Send the result as a response
        res.status(200).json(result);
    } catch (err) {
        console.error('Database query error:', err); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getEmployeeLeads = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM leads WHERE employeeId = ?";
    
        const result = await new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(results); // Resolve the promise with the results
                }
            });
        });
        
        // Send the result as a response
        res.status(200).json(result);
    } catch (err) {
        console.error('Database query error:', err); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error"});
    } 
}
const updateLeadStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { lead_status, quotation_status, invoice_status, deal_status, reason, lead_working_status, follow_up_status } = req.body;

      console.log(lead_status, quotation_status, invoice_status, deal_status, reason, lead_working_status, follow_up_status, id);
  
      const sql = `UPDATE leads SET 
                    lead_status = ?, 
                    quotation_status = ?, 
                    invoice_status = ?, 
                    deal_status = ?, 
                    reason = ?, 
                    lead_working_status = ?, 
                    follow_up_status = ? 
                    WHERE lead_no = ?`;
  
      await new Promise((resolve, reject) => {
        db.query(sql, [lead_status, quotation_status, invoice_status, deal_status, reason, lead_working_status, follow_up_status, id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      res.status(200).json({ message: "Lead updated successfully" });
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


module.exports = {
    getEmployeeInvoice,
    getEmployeeLeads,
    updateLeadStatus,
};
  