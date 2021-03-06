import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';
import NextCors from 'nextjs-cors';

const handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    const {
        method,
        query : {id}
    } = req;
    
    switch(method){
        case 'GET':
            try {
                const book = await Book.findById(id);
                if(!book){
                    res.status(400).json({success :false});
                }
                
                res.status(200).json({success :true , data :book});
            } catch (error) {
                res.status(400).json({success :false});
            }
            break;
        case 'PUT':
            try {
                const book = await Book.findByIdAndUpdate(id,req.body,{
                    new : true,
                    runValidators : true
                });
                if(!book){
                    res.status(400).json({success :false});
                }

                res.status(200).json({success :true , data :book});
            } catch (error) {
                res.status(400).json({success :false});
            }
            break;
        case 'DELETE':
            try {
                const deletedBook = await Book.deleteOne({ _id : id});
                if(!deletedBook){
                    res.status(400).json({success :false});
                }
                res.status(200).json({success :true , data : {}});

            } catch (error) {
                res.status(400).json({success :false});
            }
            break;
        default :
            res.status(400).json({success :false});
            break;
          
    }
   

        

}

export default connectDB(handler)