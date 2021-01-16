import dbConnect from '../../utils/dbConnect'
import AdminEntry from '../../models/AdminEntry'
import Tournament from '../../models/Tournament'
import { getSession } from 'next-auth/client'

/* FOR ADMINS ONLY */
export default async(req, res) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session) {
            res.status(400).json({error: "Please login!"});
            return;
        }
        
        await dbConnect();
        var isAdmin = await AdminEntry.findOne({id: session.user.email});
        if (!isAdmin) {
            res.status(400).json({error: "You're not an admin!"});
            return;
        }

        if (session) {
            var body = JSON.parse(req.body);

            if (!body.tournamentId || !body.authorId) {
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
    } else {
        res.status(400).json({success: false});
    }
}