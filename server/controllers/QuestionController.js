const fs = require('fs')

class QuestionController{

    static show(req, res){
        fs.readFile('./data/questions.json', 'utf-8', (err, data) => {
            if(err){
                res.status(500).json({ message: err.message || 'Internal Server Error'});
            } else {
                data = JSON.parse(data);
                res.status(200).json(data);
            }
        });
    }
}

module.exports = QuestionController;