import dbConnect from '../../utils/dbConnect'
import Tournament from '../../models/Tournament'

export default async(req, res) => {
    if (req.method === 'POST') {
        var body = JSON.parse(req.body);

        if (!body.authorId || !body.tournamentId) {
            res.status(400).json({success: false});
            return;
        }

        await dbConnect();

        try {
            await Tournament.findOneAndRemove({authorId: body.authorId, _id: body.tournamentId});
            res.status(201).json({success: true});
        }
        catch(error) {
            console.log(error)
            res.status(400).json({success: false});
        }
    } else {
        res.status(400).json({success: false});
    }
}