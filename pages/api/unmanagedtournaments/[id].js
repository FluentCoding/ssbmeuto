import dbConnect from '../../../utils/dbConnect'
import Tournament from '../../../models/Tournament'
import { acp } from '../../../global/Global'

export default async(req, res) => {
    const {
        query: { id }
    } = req

    if (id !== acp) {
        res.status(400).json({success: false});
        return;
    }

    if (req.method === 'POST') {
        var body = JSON.parse(req.body);

        if (!body.authorId || !body.tournamentId || !body.action) {
            res.status(400).json({success: false});
            return;
        }

        await dbConnect();
        if (body.action === "ACCEPT") {
            try {
                await Tournament.findOneAndUpdate({authorId: body.authorId, _id: body.tournamentId}, {state: 2});
                res.status(201).json({success: true});
            } catch(error) {
                res.status(400).json({success: false});
            }
        } else {
            try {
                await Tournament.findOneAndUpdate({authorId: body.authorId, _id: body.tournamentId}, {state: 1});
                res.status(201).json({success: true});
            } catch(error) {
                res.status(400).json({success: false});
            }
        }
    }
    else {
        await dbConnect();

        try {
            const yourTournaments = await Tournament.find({state: 0});

            if (yourTournaments.authorId)
                delete yourTournaments.authorId;

            res.status(201).json({success: true, data: yourTournaments});
        } catch(error) {
            res.status(400).json({success: false});
        }
    }
}