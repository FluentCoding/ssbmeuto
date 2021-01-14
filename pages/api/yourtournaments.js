import dbConnect from '../../utils/dbConnect'
import Tournament from '../../models/Tournament'
import { getSession } from 'next-auth/client'

export default async(req, res) => {
    const session = await getSession({ req });

    if (!session.user.email) {
        res.status(400).json({error: "Please re-login!"});
        return;
    }

    if (session) {
        await dbConnect();

        try {
            const yourTournaments = await Tournament.find({authorId: session.user.email});
    
            if (yourTournaments.authorId)
                delete yourTournaments.authorId;
    
            res.status(201).json({success: true, data: yourTournaments});
        } catch(error) {
            res.status(400).json({success: false});
        }
    }
}