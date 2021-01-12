import dbConnect from '../../../utils/dbConnect'
import Tournament from '../../../models/Tournament'

export default async(req, res) => {
    const {
        query: { id }
    } = req

    await dbConnect();

    try {
        const yourTournaments = await Tournament.find({authorId: id});

        if (yourTournaments.authorId)
            delete yourTournaments.authorId;

        res.status(201).json({success: true, data: yourTournaments});
    } catch(error) {
        res.status(400).json({success: false});
    }
}